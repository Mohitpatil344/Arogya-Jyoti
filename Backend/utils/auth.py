from flask import request, jsonify, current_app
from functools import wraps
import jwt
import os

SECRET_KEY = os.getenv("JWT_SECRET")

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Token missing"}), 401
        try:
            token = token.split(" ")[1]
            data = jwt.decode(token, current_app.config['JWT_SECRET'], algorithms=["HS256"])
            user_id = data['user_id']
        except Exception:
            return jsonify({"error": "Token invalid"}), 401
        return f(user_id, *args, **kwargs)
    return decorated