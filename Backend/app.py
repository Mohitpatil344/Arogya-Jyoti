from flask import Flask, jsonify
from Backend.routes import prediction, auth, dashboard, admin
from Backend.database import db  # Import the database setup

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'  # Change this in production!

# Initialize the MongoDB connection
db.init_app(app)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to the Diabetes Prediction API!"})

# Register blueprints (route modules)
app.register_blueprint(prediction.bp)
app.register_blueprint(auth.bp)
app.register_blueprint(dashboard.bp)
app.register_blueprint(admin.bp)

if __name__ == "__main__":
    app.run(debug=True)
