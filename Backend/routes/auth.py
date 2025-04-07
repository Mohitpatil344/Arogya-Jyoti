import jwt
import datetime
from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from Database.models import get_user_collection
from models.schema import UserRegisterSchema, UserLoginSchema

bp = Blueprint('auth', __name__, url_prefix='/auth')

# Secret key for JWT (store securely, e.g., in environment variables)
SECRET_KEY = "your_jwt_secret_key_here"  # Replace with a secure key or fetch from env

def generate_jwt(user_id):
    payload = {
        "user_id": str(user_id),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }
    return jwt.encode(payload, current_app.config['JWT_SECRET'], algorithm="HS256")

# --------------------------
# Register Endpoint (POST)
# --------------------------
@bp.route('/register', methods=['POST'])
def register():
    try:
        data = UserRegisterSchema(**request.json)
        users_collection = get_user_collection()

        if users_collection.find_one({"email": data.email}):
            return jsonify({"success": False, "message": "Email already registered."}), 409

        password_hash = generate_password_hash(data.password)
        new_user = {
            "username": data.username,
            "email": data.email,
            "password_hash": password_hash,
            "created_at": datetime.datetime.utcnow()
        }

        result = users_collection.insert_one(new_user)
        token = generate_jwt(result.inserted_id)

        return jsonify({
            "success": True,
            "message": "Registration successful.",
            "token": token
        }), 201

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

# --------------------------
# Login Endpoint (POST)
# --------------------------
@bp.route('/login', methods=['POST'])
def login():
    try:
        data = UserLoginSchema(**request.json)
        users_collection = get_user_collection()
        user = users_collection.find_one({"email": data.email})

        if user and check_password_hash(user["password_hash"], data.password):
            token = generate_jwt(user["_id"])

            return jsonify({
                "success": True,
                "message": "Login successful",
                "token": token
            }), 200

        return jsonify({"success": False, "message": "Invalid email or password"}), 401

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400
