import os
from flask import Flask, jsonify
from dotenv import load_dotenv
from flask_cors import CORS

# ✅ Load environment variables
load_dotenv()

# ✅ Import blueprints
from routes.gemini_chat_route import chat_bp
from routes.prediction import prediction_bp
from routes import auth, dashboard, admin, report, lifestyle, scanner, Doctor
from routes.Doctor import doctor_bp
from Database import db

# Create the Flask app
app = Flask(__name__, template_folder='templates')

# ✅ Load and set configs from .env
app.config['JWT_SECRET'] = os.getenv("JWT_SECRET")
app.config['MONGO_URI'] = os.getenv("MONGO_URI")
app.config['GEMINI_API_KEY'] = os.getenv("GEMINI_API_KEY")

# Allow CORS
CORS(app)

# Debug logs (remove in production)
print("JWT_SECRET:", app.config['JWT_SECRET'])
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

# ✅ Register blueprints (only once each)
app.register_blueprint(prediction_bp)
app.register_blueprint(auth.bp)
app.register_blueprint(dashboard.bp)
app.register_blueprint(admin.bp)
app.register_blueprint(report.bp)
app.register_blueprint(lifestyle.bp)
app.register_blueprint(scanner.bp)
app.register_blueprint(chat_bp)
app.register_blueprint(doctor_bp)  

# Run app
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
