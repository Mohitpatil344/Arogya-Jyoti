import os
from flask import Flask, jsonify

from routes import prediction, auth, dashboard, admin, report, lifestyle, scanner  # Import all route modules
from Database import db  # Import the database setup

app = Flask(__name__ ,template_folder='templates')

# Use an environment variable for better security (fallback to a default)
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY", "your_secret_key")

# Enable CORS for frontend interactions (e.g., Flutter, React)
# CORS(app)

# Initialize the MongoDB connection
try:
    db.init_app(app)
    print("✅ MongoDB initialized successfully!")
except Exception as e:
    print(f"❌ Database initialization error: {e}")

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to the Diabetes Prediction API!"})

# Register blueprints (route modules)
app.register_blueprint(prediction.bp)
app.register_blueprint(auth.bp)
app.register_blueprint(dashboard.bp)
app.register_blueprint(admin.bp)
app.register_blueprint(report.bp)
app.register_blueprint(lifestyle.bp)
app.register_blueprint(scanner.bp)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)  # Allows external access
