from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime
import os

client = MongoClient(os.getenv("MONGO_URI"))
db = client["arogya_jyoti"]
chat_collection = db["chats"]

def save_chat(user_id: str, user_message: str, bot_response: str):
    chat_doc = {
        "user_id": ObjectId(user_id),
        "user_message": user_message,
        "bot_response": bot_response,
        "timestamp": datetime.utcnow()
    }
    chat_collection.insert_one(chat_doc)

def get_user_chat_history(user_id: str):
    chats = chat_collection.find({"user_id": ObjectId(user_id)}).sort("timestamp", -1)
    return [{
        "user_id": str(chat["user_id"]),
        "user_message": chat["user_message"],
        "bot_response": chat["bot_response"],
        "timestamp": chat["timestamp"].isoformat()
    } for chat in chats]
