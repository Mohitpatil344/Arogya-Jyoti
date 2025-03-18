from flask import Flask
from pymongo import MongoClient  

# Configuration
MONGO_URI = "mongodb+srv://mohitpatil:zT8nzBXmIsgQGDPP@mohit-personal.ghcwf.mongodb.net/arogya_jyoti"
DB_NAME = "arogya_jyoti"

db = None  # Initialize db outside the function

def get_db():
    """Initialize and return the database instance."""
    global db
    if db is None:
        client = MongoClient(MONGO_URI)
        db = client[DB_NAME]
    return db

def get_user_collection():
    """Return the 'users' collection."""
    return get_db()["users"]

def get_collection(collection_name):
    """Return a specific collection."""
    return get_db()[collection_name]

def init_app(app: Flask):
    """Initialize the database with the Flask app."""
    get_db()
    app.teardown_appcontext(close_db_connection)

def close_db_connection(exception=None):
    """Close the database connection when the app context ends."""
    global db
    if db is not None:
        db.client.close()
        db = None
