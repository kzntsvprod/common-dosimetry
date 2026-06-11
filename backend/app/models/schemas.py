from pydantic import BaseModel
from typing import List

class OptimizationParameters(BaseModel):
    s: float
    k1_effective: float
    beta: float
    epsilon: float
    b: float

class OptimizationMetrics(BaseModel):
    fom: float
    accuracy: float
    r_squared: float
    delta_s: float

class PeakInfo(BaseModel):
    temperature: float
    intensity: float

class ChartData(BaseModel):
    temperature: List[float]
    experimental_intensity: List[float]
    theoretical_intensity: List[float]

class OptimizationResponse(BaseModel):
    file_name: str
    parameters: OptimizationParameters
    metrics: OptimizationMetrics
    peak: PeakInfo
    chart_data: ChartData