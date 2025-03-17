from Backend.database.db import get_db

def get_user_collection():
    db = get_db()
    return db["users"]  # Returns a MongoDB collection object

def get_prediction_collection():
    db = get_db()
    return db["predictions"]  # Returns a MongoDB collection object
