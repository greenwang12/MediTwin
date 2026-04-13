import json
import os


def load_diseases():
    try:
        file_path = os.path.join("data", "diseases.json")

        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)

            # ✅ Ensure it's always a list
            if isinstance(data, list):
                return data
            else:
                print("⚠️ Invalid JSON format")
                return []

    except FileNotFoundError:
        print("❌ diseases.json not found")
        return []

    except json.JSONDecodeError:
        print("❌ JSON format error in diseases.json")
        return []

    except Exception as e:
        print("❌ Unexpected error:", e)
        return []