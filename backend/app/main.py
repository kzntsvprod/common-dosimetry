from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router as optimization_router

app = FastAPI(
    title="Commoni API",
    description="API для розрахунку кінетичних параметрів термолюмінесценції",
    version="1.0.0"
)

# Налаштування CORS для підключення React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Підключення маршруту
app.include_router(optimization_router)

# Запуск сервера: uvicorn main:app --reload