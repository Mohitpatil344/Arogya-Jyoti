from flask import Blueprint, request, jsonify
import numpy as np
from models.model import load_model  
from models.schema import PredictionInputSchema, PredictionOutputSchema  # Import schemas

bp = Blueprint("prediction", __name__)
model = load_model()

@bp.route("/predict", methods=["POST"])
def predict():
    try:
        # Validate input data
        data = PredictionInputSchema(**request.json)

        # Convert to NumPy array and reshape
        features = np.array(data.features).reshape(1, -1)

        # Predict
        prediction = model.predict(features)
        result = "Diabetic" if prediction[0] == 1 else "Non-Diabetic"

        # Return response using schema
        return jsonify(PredictionOutputSchema(prediction=result).dict())

    except Exception as e:
        return jsonify({"error": str(e)})
