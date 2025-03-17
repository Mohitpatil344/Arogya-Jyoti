from flask import Flask
from pymongo import MongoClient  # Or use MongoEngine

# Configuration (you might want to move this to a config file)
MONGO_URI = "mongodb://localhost:27017/arogya_jyoti"  # Replace with your connection string
DB_NAME = "arogya_jyoti"

db = None  # Initialize db outside the function


def get_db():
    global db
    if db is None:
        client = MongoClient(MONGO_URI)
        db = client[DB_NAME]
    return db


def init_app(app: Flask):
    # Initialize the database when the app starts
    get_db()
    app.teardown_appcontext(close_db_connection)


def close_db_connection(exception=None):
    global db
    if db is not None:
        db.client.close()
        db = None
