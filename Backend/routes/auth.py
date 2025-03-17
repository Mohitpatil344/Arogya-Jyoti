from flask import Blueprint, render_template, redirect, url_for, request, flash
from werkzeug.security import generate_password_hash, check_password_hash  # For hashing passwords
from Backend.database.models import get_user_collection  # Import the model
import datetime

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        if not username:
            flash('Username is required')
        elif not email:
            flash('Email is required')
        elif not password:
            flash('Password is required')
        else:
            # Hash the password
            password_hash = generate_password_hash(password)

            # Get the users collection
            users_collection = get_user_collection()

            # Create a new user document
            new_user = {
                "username": username,
                "email": email,
                "password_hash": password_hash,
                "created_at": datetime.datetime.utcnow()
            }

            # Insert the user into the database
            users_collection.insert_one(new_user)

            flash('Registration successful!')
            return redirect(url_for('auth.login'))

    return render_template('auth/register.html')


@bp.route('/login', methods=('GET', 'POST'))
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Get the users collection
        users_collection = get_user_collection()

        # Find the user by username
        user = users_collection.find_one({"username": username})

        if user and check_password_hash(user['password_hash'], password):
            flash('Login successful!')
            return redirect(url_for('dashboard.index'))  # Redirect to dashboard
        else:
            flash('Invalid username or password')

    return render_template('auth/login.html')


@bp.route('/logout')
def logout():
    # Implement logout logic (e.g., clear session)
    flash('Logged out successfully!')
    return redirect(url_for('index'))  # Redirect to home page
