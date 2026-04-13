from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests

from models import PatientInput
from analyzer import analyze_patient
from explainer import generate_explanation

# ===============================
# 🔥 FASTAPI INIT
# ===============================
app = FastAPI(
    title="MediTwin Backend",
    description="AI-powered healthcare assistant with multilingual voice support",
    version="1.0.0",
    docs_url="/",
    redoc_url=None
)

# ===============================
# 🔥 CORS
# ===============================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===============================
# 🔥 MODELS
# ===============================
class TranslateRequest(BaseModel):
    text: str
    lang: str


# ===============================
# 🔥 ANALYZE API
# ===============================
@app.post("/analyze-patient", tags=["Analysis"])
def analyze(data: PatientInput):
    results = analyze_patient(data)

    explanation = generate_explanation(
        results,
        data.symptoms
    )

    return {
        "input_symptoms": data.symptoms,
        "analysis": explanation
    }


# ===============================
# 🔥 TRANSLATION API (FIXED)
# ===============================
@app.post("/translate", tags=["Translation"])
def translate(req: TranslateRequest):
    try:
        if not req.text.strip():
            return {"translated": ""}

        url = "https://translate.googleapis.com/translate_a/single"

        params = {
            "client": "gtx",
            "sl": "en",
            "tl": req.lang,
            "dt": "t",
            "q": req.text,
        }

        # ✅ timeout added
        response = requests.get(url, params=params, timeout=5)

        data = response.json()

        # ✅ handle multi-line translation
        translated_text = ""
        for item in data[0]:
            translated_text += item[0]

        return {"translated": translated_text.strip()}

    except Exception as e:
        print("❌ Translation error:", e)
        return {"translated": req.text}