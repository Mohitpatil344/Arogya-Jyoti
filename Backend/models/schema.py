from pydantic import BaseModel, EmailStr, Field
from bson import ObjectId
from datetime import datetime
from typing import Optional, List

# ===========================
# Utility Functions
# ===========================

def object_id_str(value: str):
    """Validate MongoDB ObjectId as a string."""
    if not ObjectId.is_valid(value):
        raise ValueError("Invalid ObjectId format")
    return value

# ===========================
# Authentication Schemas
# ===========================

class UserRegisterSchema(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)

class UserLoginSchema(BaseModel):
    email: EmailStr  
    password: str

class UserSchema(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")  # MongoDB ObjectId
    username: str
    email: EmailStr
    created_at: Optional[str] = Field(default_factory=lambda: datetime.utcnow().isoformat())

    class Config:
        orm_mode = True
        json_encoders = {ObjectId: str}

# ===========================
# Admin Schemas
# ===========================

class AdminUserSchema(BaseModel):
    username: str
    email: EmailStr
    created_at: Optional[str]

class AdminUsersResponseSchema(BaseModel):
    users: List[AdminUserSchema]

# ===========================
# Prediction Schemas
# ===========================

class PredictionInputSchema(BaseModel):
    features: List[float] = Field(..., min_items=8, max_items=8, example=[2, 138, 62, 35, 75, 33.6, 0.127, 47])

class PredictionOutputSchema(BaseModel):
    prediction: str

# ===========================
# Lifestyle Schemas
# ===========================

class DailyRoutineSchema(BaseModel):
    sleep_schedule: str
    work_study_routine: str
    stress_levels: str

class DietSchema(BaseModel):
    daily_calorie_intake: int
    sugar_consumption: str
    fruit_vegetable_intake: str
    water_intake: str

class PhysicalActivitySchema(BaseModel):
    frequency: str  # Daily, Weekly, Rarely
    exercise_type: str  # Walking, Gym, Yoga, Sports
    sedentary_behavior: str  # Screen time, Sitting hours

class LifestyleSchema(BaseModel):
    daily_routine: DailyRoutineSchema
    diet: DietSchema
    physical_activity: PhysicalActivitySchema

# ===========================
# Risk & Report Schemas
# ===========================

class RiskAssessmentSchema(BaseModel):
    risk_level: str  # Low, High
    health_tips: Optional[List[str]]

class HealthPlanSchema(BaseModel):
    personalized_plan: Optional[str]

class ReportSchema(BaseModel):
    user_id: str = Field(..., min_length=24, max_length=24)  # MongoDB ObjectId
    lifestyle: LifestyleSchema
    risk_assessment: RiskAssessmentSchema
    health_plan: Optional[HealthPlanSchema]
    generated_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())

