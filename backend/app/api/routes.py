from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from models.schemas import OptimizationResponse
from services.kinetic_order import process_optimization

# Створення маршруту
router = APIRouter(prefix="/api/optimization", tags=["Optimization"])

@router.post("/process", response_model=OptimizationResponse)
async def optimize_glow_curve(
        file: UploadFile = File(...),
        beta: float = Form(1.0, description="Швидкість нагрівання (К/с)"),
        eps_min: float = Form(0.1, description="Мінімальна енергія активації (eV)"),
        eps_max: float = Form(2.0, description="Максимальна енергія активації (eV)"),
        s_exp_min: float = Form(1.0, description="Мінімальний степінь частотного фактору (log10(s))"),
        s_exp_max: float = Form(20.5, description="Максимальний степінь частотного фактору (log10(s))"),
        method: str = Form("fast", description="Метод генерації (fast або simpson)")
):
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