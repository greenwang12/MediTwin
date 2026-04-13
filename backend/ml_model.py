import pickle

# load model + vectorizer
model = pickle.load(open("model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))


def predict_disease(symptoms):
    if not symptoms:
        return []

    # ✅ clean input
    cleaned = [s.strip().lower() for s in symptoms if s.strip()]
    if not cleaned:
        return []

    text = " ".join(cleaned)

    # vectorize
    X = vectorizer.transform([text])

    probs = model.predict_proba(X)[0]
    classes = model.classes_

    # ===============================
    # 🔥 SMART BOOST RULES
    # ===============================
    boost = {cls: 1.0 for cls in classes}

    s = set(cleaned)

    # 🍽 Food Poisoning
    if {"vomiting", "diarrhea"} <= s:
        boost["Food Poisoning"] *= 1.5

    # 🤕 Migraine
    if {"headache", "sensitivity to light"} <= s:
        boost["Migraine"] *= 1.5

    # 🫀 Heart Disease
    if {"chest pain", "shortness of breath"} <= s:
        boost["Heart Disease"] *= 1.6

    # 🫁 Lung Disease
    if {"cough", "breathing issue"} <= s:
        boost["Lung Disease"] *= 1.4

    # 🫘 Kidney Disease
    if {"frequent urination", "back pain"} <= s:
        boost["Kidney Disease"] *= 1.4

    # 🤧 Allergy
    if {"sneezing", "itching"} <= s:
        boost["Allergy"] *= 1.3

    # 🦠 Infection
    if {"fever", "swelling"} <= s:
        boost["Infection"] *= 1.4

    # 🍽 Gastritis
    if {"stomach pain", "acidity"} <= s:
        boost["Gastritis"] *= 1.5

    # ===============================
    # 🔥 APPLY BOOST
    # ===============================
    adjusted_probs = []

    for i, cls in enumerate(classes):
        adjusted = probs[i] * boost.get(cls, 1.0)
        adjusted_probs.append(adjusted)

    # normalize
    total = sum(adjusted_probs)
    if total == 0:
        return []

    adjusted_probs = [p / total for p in adjusted_probs]

    # ===============================
    # 🔥 TOP 3
    # ===============================
    indices = sorted(
        range(len(adjusted_probs)),
        key=lambda i: adjusted_probs[i],
        reverse=True
    )[:3]

    results = []

    for i in indices:
        confidence = round(adjusted_probs[i] * 100, 2)

        # filter weak predictions
        if confidence < 8:
            continue

        results.append({
            "condition": classes[i],
            "confidence": confidence
        })

    return results