import os
from typing import Optional
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends, Security, status, Request
from fastapi.security import APIKeyHeader
from models.schemas import OptimizationResponse
from services.kinetic_order import process_optimization
from slowapi import Limiter
from slowapi.util import get_remote_address

# Ініціалізація лімітеру
limiter = Limiter(key_func=get_remote_address)

# Налаштування безпеки
API_KEY_NAME = "X-API-Key"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

# API-ключ (опціонально)
async def get_api_key(api_key: Optional[str] = Security(api_key_header)):
    expected_api_key = os.getenv("API_KEY")

    if not expected_api_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Критична помилка сервера: API_KEY не налаштовано."
        )

    # Запит з React-сайту (без ключа)
    if api_key is None:
        return "public_user"

    # Запит від стороннього скрипта (з правильним ключем)
    if api_key == expected_api_key:
        return "vip_developer"

    # Запит із вгадуванням ключа
    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Відмовлено в доступі. Неправильний API ключ."
    )

router = APIRouter(prefix="/api/optimization", tags=["Optimization"])

@router.post("/process", response_model=OptimizationResponse)
@limiter.limit("5/minute")
async def optimize_glow_curve(
        request: Request,
        user_type: str = Depends(get_api_key),
        file: UploadFile = File(...),
        beta: float = Form(1.0, description="Швидкість нагрівання (К/с)"),
        eps_min: float = Form(0.1, description="Мінімальна енергія активації (eV)"),
        eps_max: float = Form(2.0, description="Максимальна енергія активації (eV)"),
        s_exp_min: float = Form(1.0, description="Мінімальний степінь частотного фактору (log10(s))"),
        s_exp_max: float = Form(20.5, description="Максимальний степінь частотного фактору (log10(s))"),
        method: str = Form("fast", description="Метод генерації (fast або simpson)")
):
    # Вивід типу користувача який надсилає запит
    print(f"Запит надійшов від: {user_type}")

    if not file.filename.endswith(('.txt', '.csv')):
        raise HTTPException(status_code=400, detail="Дозволені лише файли .txt або .csv")

    # Валідація меж
    if eps_min >= eps_max:
        raise HTTPException(status_code=400, detail="eps_min має бути меншим за eps_max")
    if s_exp_min >= s_exp_max:
        raise HTTPException(status_code=400, detail="Мінімальний степінь має бути меншим за максимальний")

    try:
        content = await file.read()
        text_content = content.decode('utf-8')

        result = process_optimization(
            text_content,
            beta=beta,
            eps_min=eps_min,
            eps_max=eps_max,
            s_exp_min=s_exp_min,
            s_exp_max=s_exp_max,
            method=method
        )
        return result

    except ValueError as e:
        # Помилки валідації даних (з сервісу)
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        # Непередбачені помилки
        raise HTTPException(status_code=500, detail=f"Внутрішня помилка сервера: {str(e)}")