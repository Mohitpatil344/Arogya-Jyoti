from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from Database.models import get_user_collection
from models.schema import UserRegisterSchema, UserLoginSchema
import datetime

bp = Blueprint('auth', __name__, url_prefix='/auth')

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

        users_collection.insert_one(new_user)

        return jsonify({"success": True, "message": "Registration successful."}), 201

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

# --------------------------
# Login Endpoint (POST)
# --------------------------@bp.route('/login', methods=['POST'])
def login():
    try:
        data = UserLoginSchema(**request.json)
        users_collection = get_user_collection()
        user = users_collection.find_one({"email": data.email})

        if user and check_password_hash(user["password_hash"], data.password):
            return jsonify({
                "success": True,
                "message": "Login successful"
            }), 200

        return jsonify({"success": False, "message": "Invalid email or password"}), 401

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400
