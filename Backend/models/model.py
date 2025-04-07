import pickle
import os

# Load the ML model
model_path = os.path.join(os.path.dirname(__file__), 'random_forest_balanced.pkl')
with open(model_path, 'rb') as file:
    model = pickle.load(file)

def predict_diabetes(input_data):
    """Input: list of features, Output: 0 or 1 prediction"""
    return model.predict([input_data])[0]  # model returns [0] or [1]
