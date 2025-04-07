from flask import Blueprint, request, jsonify
from models.gemini_chat import get_diabetes_chat_response
from models.chat import save_chat, get_user_chat_history
from models.schema import ChatHistoryResponseSchema
from utils.auth import token_required  # Moved from here to utils.auth
import os

chat_bp = Blueprint("chat", __name__)

# ============================
# POST: Get Gemini Response & Save Chat
# ============================

@chat_bp.route("/api/chat", methods=["POST"])
@token_required
def chat(user_id):
    data = request.get_json()
    user_message = data.get("message", "")
    
    if not user_message.strip():
        return jsonify({"error": "Empty message"}), 400

    # Get Gemini response
    bot_response = get_diabetes_chat_response(user_message)

    # Save chat to DB
    save_chat(user_id, user_message, bot_response)

    return jsonify({"response": bot_response})


# ============================
# GET: Chat History
# ============================

@chat_bp.route("/api/chat/history", methods=["GET"])
@token_required
def chat_history(user_id):
    chats = get_user_chat_history(user_id)
    response = ChatHistoryResponseSchema(chats=chats)
    return jsonify(response.dict())
