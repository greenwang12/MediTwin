from google import genai

# ===============================
# 🔑 API KEY
# ===============================
client = genai.Client(api_key="YOUR_API_KEY_HERE")


# ===============================
# MAIN FUNCTION
# ===============================
def generate_explanation(results, symptoms, lang="en"):
    output = []

    for r in results:
        condition = r.get("condition", "Unknown")
        confidence = r.get("confidence", 0)

        # 👨‍⚕️ DOCTOR (FROM JSON)
        doctor_text = r.get("doctor_explanation", "")

        # ===============================
        # 👶 PATIENT (AI → fallback)
        # ===============================
        ai_text = generate_ai_explanation(condition, symptoms)

        if ai_text and len(ai_text.strip()) > 20:
            patient_text = ai_text
        else:
            patient_text = fallback_explanation(condition, symptoms)

        # 🌍 TRANSLATION
        if lang != "en":
            patient_text = translate_text(patient_text, lang)

        output.append({
            "condition": condition,
            "confidence": confidence,
            "risk": r.get("risk", ""),

            "doctor_explanation": doctor_text,
            "patient_explanation": patient_text,
            "future_if_untreated": r.get("future_if_untreated", []) or [],
            "how_to_improve": r.get("how_to_improve", []) or []
        })

    return output


# ===============================
# 🔥 GENERATIVE AI
# ===============================
def generate_ai_explanation(condition, symptoms):
    try:
        prompt = f"""
You are a friendly doctor.

Explain {condition} in simple words for a normal person.
Symptoms: {", ".join(symptoms)}

Use real-life examples.
Keep it 3–5 lines.
Be reassuring.
"""

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )

        if response and response.text:
            return response.text.strip()

    except Exception as e:
        print("❌ AI ERROR:", e)

    return None


# ===============================
# 🔁 SMART FALLBACK (DETAILED)
# ===============================
def fallback_explanation(condition, symptoms):
    c = str(condition).lower()
    symptom_text = ", ".join(symptoms)

    if "heart" in c:
        return (
            "Your heart works like a pump that circulates blood throughout your body. "
            "When it is not working properly, you may feel chest pain, tiredness, or shortness of breath. "
            "This usually happens when blood flow is reduced due to blockages or strain. "
            "If not treated, it can become serious over time. "
            "With proper care, lifestyle changes, and medication, it can be managed effectively."
        )

    elif "liver" in c:
        return (
            "Your liver acts like a filter that cleans harmful substances from your body. "
            "If it is damaged or not functioning well, you may feel tired, weak, or notice digestion issues. "
            "Sometimes symptoms like yellowing of the skin may appear. "
            "If ignored, it can lead to more serious complications. "
            "With proper diet, avoiding alcohol, and medical care, the liver can improve."
        )

    elif "lung" in c or "asthma" in c:
        return (
            "Your lungs help you breathe by supplying oxygen to your body. "
            "If they are affected, you may experience coughing, wheezing, or difficulty breathing. "
            "This can happen due to inflammation or narrowing of airways. "
            "If not managed, breathing problems may worsen. "
            "With proper treatment and care, symptoms can be controlled and improved."
        )

    elif "kidney" in c:
        return (
            "Your kidneys work like natural filters that remove waste from your blood. "
            "If they are not functioning properly, waste can build up in your body, causing fatigue and swelling. "
            "You may also notice changes in urination. "
            "If untreated, it can affect overall health seriously. "
            "With proper medical care, diet, and hydration, kidney function can be supported."
        )

    elif "food poisoning" in c:
        return (
            "Food poisoning happens when you eat contaminated or spoiled food. "
            "It can irritate your stomach and intestines, leading to symptoms like vomiting, diarrhea, and stomach pain. "
            "You may also feel weak or dehydrated. "
            "Most cases improve with rest, fluids, and light food. "
            "However, if symptoms are severe or persistent, medical attention may be needed."
        )

    elif "gastritis" in c:
        return (
            "Gastritis occurs when the lining of your stomach becomes irritated or inflamed. "
            "This can cause burning pain, bloating, nausea, or discomfort after eating. "
            "It is often triggered by spicy food, stress, or infection. "
            "If left untreated, it may worsen over time. "
            "Eating simple food, avoiding irritants, and taking proper medication can help recovery."
        )

    elif "migraine" in c:
        return (
            "A migraine is a type of severe headache that can cause throbbing pain on one side of the head. "
            "It is often accompanied by nausea, vomiting, and sensitivity to light or sound. "
            "Triggers may include stress, lack of sleep, or certain foods. "
            "If not managed, it can interfere with daily activities. "
            "Resting in a quiet, dark place and taking medication can help reduce symptoms."
        )

    return (
        f"{condition} can affect your body and cause symptoms like {symptom_text}. "
        "It may lead to discomfort or weakness if not addressed in time. "
        "The condition can vary depending on severity and individual health. "
        "Taking early care, proper treatment, and maintaining a healthy lifestyle can help manage it. "
        "If symptoms persist, it is always better to consult a medical professional."
    )


# ===============================
# 🌍 TRANSLATION
# ===============================
def translate_text(text, lang):
    try:
        prompt = f"Translate to {lang}:\n{text}"

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )

        if response and response.text:
            return response.text.strip()

    except Exception as e:
        print("❌ Translation error:", e)

    return text