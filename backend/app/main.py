import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import router as optimization_router, limiter
from dotenv import load_dotenv
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

load_dotenv()

app = FastAPI(
    title="Commoni API",
    description="API для розрахунку кінетичних параметрів термолюмінесценції",
    version="1.0.0"
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

allowed_origins_raw = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173")

origins = [origin.strip() for origin in allowed_origins_raw.split(",")]

# Налаштування CORS для підключення React
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Підключення маршруту
app.include_router(optimization_router)

# Запуск сервера: uvicorn main:app --reload