from flask import Blueprint, request, jsonify
import numpy as np
from models.model import load_model  # Ensure model is loaded correctly


prediction_blueprint = Blueprint("prediction", __name__)
model=load_model()

@prediction_blueprint.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        features = np.array(data["features"]).reshape(1, -1)  # Convert to NumPy array
        prediction = model.predict(features)  # Ensure model is used here
        result = "Diabetic" if prediction[0] == 1 else "Non-Diabetic"
        return jsonify({"prediction": result})
    except Exception as e:
        return jsonify({"error": str(e)})
