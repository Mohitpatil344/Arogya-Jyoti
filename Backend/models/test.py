import pandas as pd
import pickle

# Load the trained model
model_path = "random_forest_balanced.pkl"  # Update with the correct filename if different
with open(model_path, "rb") as file:
    model = pickle.load(file)

# Load dataset for testing
file_path = "diabetes.csv"
df = pd.read_csv(file_path)

# Select a mix of diabetic and non-diabetic cases for testing
sample_mixed = df.groupby("Outcome", group_keys=False).apply(lambda x: x.sample(n=3, random_state=42)).reset_index(drop=True)

# Extract features for prediction
X_sample_mixed = sample_mixed.drop(columns=["Outcome"])

# Predict outcomes using the loaded model
predictions_mixed = model.predict(X_sample_mixed)

# Output predictions
print("Predictions:", predictions_mixed.tolist())
