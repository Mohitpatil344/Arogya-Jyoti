import os
from flask import Flask, jsonify
from dotenv import load_dotenv

# ✅ Load environment variables first
load_dotenv()

from routes import prediction, auth, dashboard, admin, report, lifestyle, scanner
from Database import db

from flask_cors import CORS

# Create the Flask app
app = Flask(__name__, template_folder='templates')

# ✅ Load and set configs from .env
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY", "your_jwt_fallback_key")
app.config['MONGO_URI'] = os.getenv("MONGO_URI")
app.config['GEMINI_API_KEY'] = os.getenv("GEMINI_API_KEY")

# Allow CORS
CORS(app)

# ✅ Debug print (remove in prod)
print("JWT_SECRET_KEY:", app.config['JWT_SECRET_KEY'])
print("Mongo URI:", "Loaded" if app.config['MONGO_URI'] else "Not Found")
print("Gemini API Key:", "Loaded" if app.config['GEMINI_API_KEY'] else "Not Found")

# Initialize the MongoDB connection
try:
    db.init_app(app)
    print("✅ MongoDB initialized successfully!")
except Exception as e:
    print(f"❌ Database initialization error: {e}")

# Home route
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to the Diabetes Prediction API!"})

# Register route blueprints
app.register_blueprint(prediction.bp)
app.register_blueprint(auth.bp)
app.register_blueprint(dashboard.bp)
app.register_blueprint(admin.bp)
app.register_blueprint(report.bp)
app.register_blueprint(lifestyle.bp)
app.register_blueprint(scanner.bp)

# Run app
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
