from pydantic import BaseModel, Field, field_validator
from typing import List


class PatientInput(BaseModel):
    age: int = Field(..., ge=0, le=120)
    gender: str
    symptoms: List[str]

    # ✅ normalize gender
    @field_validator("gender")
    @classmethod
    def validate_gender(cls, v):
        v = v.lower().strip()
        if v not in ["male", "female", "other"]:
            raise ValueError("Gender must be male, female, or other")
        return v

    # ✅ clean symptoms
    @field_validator("symptoms")
    @classmethod
    def validate_symptoms(cls, v):
        if not v:
            raise ValueError("Symptoms list cannot be empty")

        cleaned = [s.strip().lower() for s in v if s.strip()]

        if not cleaned:
            raise ValueError("Invalid symptoms")

        return cleaned