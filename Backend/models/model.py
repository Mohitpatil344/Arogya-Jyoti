import os
import joblib

# Correct relative path
model_path = os.path.join(os.path.dirname(__file__), "diabetes_model.pkl")

def load_model():
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found: {model_path}")
    with open(model_path, "rb") as file:
        model = joblib.load(file)
    return model

model = load_model()
print("Model loaded successfully!")
