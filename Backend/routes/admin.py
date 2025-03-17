from flask import Blueprint, render_template
from Backend.database.models import get_user_collection  # Import the model

bp = Blueprint('admin', __name__, url_prefix='/admin')

@bp.route('/')
def admin_panel():
    return render_template('admin/admin_panel.html')

@bp.route('/users')
def manage_users():
    # Logic to fetch and display users
    users_collection = get_user_collection()
    users = list(users_collection.find())  # Convert cursor to a list
    return render_template('admin/manage_users.html', users=users)
