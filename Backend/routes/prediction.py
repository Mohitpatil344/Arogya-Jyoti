from flask import Blueprint, request, jsonify
from models.model import predict_diabetes  # adjust if model import path is different

prediction_bp = Blueprint('prediction', __name__)

@prediction_bp.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        features = [
            data['Pregnancies'],
            data['Glucose'],
            data['BloodPressure'],
            data['SkinThickness'],
            data['Insulin'],
            data['BMI'],
            data['DiabetesPedigreeFunction'],
            data['Age']
        ]
        result = predict_diabetes(features)
        return jsonify({'prediction': int(result)})
    except Exception as e:
        return jsonify({'error': str(e)}), 400
