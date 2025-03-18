import logging
from flask import Blueprint, jsonify

# Configure logging
logging.basicConfig(level=logging.INFO)

bp = Blueprint('dashboard', __name__, url_prefix='/dashboard')

@bp.route('/')
def index():
    user = {'username': 'Test User'}  # Example user
    logging.info(f"User accessed dashboard: {user['username']}")  # Log username
    return jsonify({"message": "Dashboard accessed", "user": user['username']})
