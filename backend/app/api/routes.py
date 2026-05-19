from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from models.schemas import OptimizationResponse
from services.kinetic_order import process_optimization

# Створення маршруту
router = APIRouter(prefix="/api/optimization", tags=["Optimization"])


@router.post("/process", response_model=OptimizationResponse)
async def optimize_glow_curve(
        file: UploadFile = File(...),
        beta: float = Form(1.0, description="Швидкість нагрівання (°C/с)")
):
    if not file.filename.endswith(('.txt', '.csv')):
        raise HTTPException(status_code=400, detail="Дозволені лише файли .txt або .csv")

    try:
        content = await file.read()
        text_content = content.decode('utf-8')

        result = process_optimization(text_content, beta=beta)
        return result

    except ValueError as e:
        # Помилки валідації даних (з сервісу)
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        # Непередбачені помилки
        raise HTTPException(status_code=500, detail=f"Внутрішня помилка сервера: {str(e)}")