from flask import Blueprint, render_template, redirect, url_for, request, flash
from werkzeug.security import generate_password_hash, check_password_hash
from Database.models import get_user_collection  # Use relative import

from models.schema import UserRegisterSchema, UserLoginSchema  # Import schemas

import datetime

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        try:
            data = UserRegisterSchema(**request.form)  # Validate form data using Pydantic

            # Hash password
            password_hash = generate_password_hash(data.password)

            # Get user collection
            users_collection = get_user_collection()

            # Check if user already exists
            if users_collection.find_one({"email": data.email}):
                flash("Email already registered. Please log in.")
                return redirect(url_for('auth.login'))

            # Create user
            new_user = {
                "username": data.username,
                "email": data.email,
                "password_hash": password_hash,
                "created_at": datetime.datetime.utcnow()
            }

            users_collection.insert_one(new_user)

            flash('Registration successful! Please log in.')
            return redirect(url_for('auth.login'))

        except Exception as e:
            flash(f"Error: {str(e)}")

    return render_template('auth/register.html')


@bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        try:
            data = UserLoginSchema(**request.form)  # Validate form data using Pydantic

            users_collection = get_user_collection()
            user = users_collection.find_one({"email": data.email})

            if user and check_password_hash(user["password_hash"], data.password):
                flash('Login successful!')
                return redirect(url_for('dashboard'))  # Update this based on your app

            flash('Invalid email or password')

        except Exception as e:
            flash(f"Error: {str(e)}")

    return render_template('auth/login.html')

