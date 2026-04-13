from ml_model import predict_disease
from data_loader import load_diseases


def analyze_patient(data):
    predictions = predict_disease(data.symptoms)

    # ❌ No prediction case
    if not predictions:
        return [{
            "condition": "Unknown",
            "confidence": 0,
            "organ": "none",
            "risk": "Low",
            "doctor_explanation": "Symptoms not recognized",
            "patient_explanation": "Symptoms not recognized",
            "future_if_untreated": [],
            "how_to_improve": []
        }]

    disease_db = load_diseases()
    results = []

    for pred in predictions:
        name = pred["condition"]
        confidence = round(pred.get("confidence", 0), 1)

        # 🔍 Match disease from JSON
        match = next(
            (d for d in disease_db if d["name"].lower() == name.lower()),
            None
        )

        if match:
            results.append({
                "condition": name,
                "confidence": confidence,
                "organ": match.get("organ", "unknown"),
                "risk": "Predicted",

                # ✅ CORRECT KEYS FOR FRONTEND
                "doctor_explanation": match.get("description", ""),
                "patient_explanation": match.get("description", ""),
                "future_if_untreated": match.get("progression", []) or [],
                "how_to_improve": match.get("improvement", []) or [],
            })
        else:
            results.append({
                "condition": name,
                "confidence": confidence,
                "organ": "unknown",
                "risk": "Predicted",

                # ✅ SAFE FALLBACK
                "doctor_explanation": "Explanation not available",
                "patient_explanation": "Explanation not available",
                "future_if_untreated": [],
                "how_to_improve": [],
            })

    # 🔥 Sort by confidence
    results.sort(key=lambda x: x["confidence"], reverse=True)

    return results