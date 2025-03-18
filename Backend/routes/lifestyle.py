from flask import Blueprint, request, jsonify
from datetime import datetime
from Database.db import get_collection

bp = Blueprint("lifestyle", __name__, url_prefix="/lifestyle")

@bp.route("/add", methods=["POST"])
def add_lifestyle_data():
    try:
        data = request.json
        data["created_at"] = datetime.utcnow()
        lifestyle_collection = get_collection("lifestyle")
        lifestyle_collection.insert_one(data)
        return jsonify({"message": "Lifestyle data saved successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@bp.route("/get/<user_id>", methods=["GET"])
def get_lifestyle_data(user_id):
    try:
        lifestyle_collection = get_collection("lifestyle")
        user_data = lifestyle_collection.find_one({"user_id": user_id}, {"_id": 0})
        if user_data:
            return jsonify(user_data), 200
        return jsonify({"message": "No data found for this user"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
