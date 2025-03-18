from flask import Blueprint
from Database.db import get_user_collection  # Import the model

bp = Blueprint('admin', __name__, url_prefix='/admin')

@bp.route('/')
def admin_panel():
    return {"message": "Admin panel accessed"}

@bp.route('/users')
def manage_users():
    users_collection = get_user_collection()
    users = list(users_collection.find({}, {"_id": 0}))  # Exclude ObjectId for cleaner output
    return {"message": "User list retrieved", "users": users}
