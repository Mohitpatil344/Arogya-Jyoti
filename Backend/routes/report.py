from flask import Blueprint, request, jsonify
from datetime import datetime
from bson import ObjectId
from Database.db import get_collection
import os 
import google.generativeai as genai
from Database.db import get_collection
import requests
import json
import re

# Create a Blueprint for the report routes
bp = Blueprint("report", __name__, url_prefix="/report")

genai.configure(api_key=os.getenv("GEMINI_API_KEY2"))
GEMINI_API_KEY2 = os.getenv("GEMINI_API_KEY2")
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY2}"


@bp.route("/generate", methods=["POST"])
def generate_report():
    """
    Generate a health report based on prediction results.
    """
    try:
        # Get JSON data from the request
        data = request.json
        prediction_id = data.get("prediction_id")
        user_id = data.get("user_id")
        prediction_result = data.get("prediction_result")

        # Determine risk level based on prediction result
        risk_level = "High" if prediction_result == "Diabetic" else "Low"

        # Define basic health recommendations
        recommendations = ["Eat a balanced diet", "Exercise regularly"]
        if risk_level == "High":
            recommendations.append("Consult a doctor for personalized guidance")

        # Create report data
        report_data = {
            "user_id": user_id,
            "prediction_id": prediction_id,
            "risk_level": risk_level,
            "recommendations": recommendations,
            "created_at": datetime.utcnow(),
        }

        # Insert the report into the MongoDB collection
        report_collection = get_collection("reports")
        result = report_collection.insert_one(report_data)

        # Convert the MongoDB ObjectId to a string for the response
        report_data["_id"] = str(result.inserted_id)

        # Return success response
        return jsonify({
            "message": "Report generated successfully!",
            "report": report_data
        }), 201

    except Exception as e:
        # Handle errors and return an error response
        return jsonify({"error": str(e)}), 500

@bp.route("/get/<user_id>", methods=["GET"])
def get_reports(user_id):
    """
    Retrieve all reports for a specific user.
    """
    try:
        # Get the reports collection
        report_collection = get_collection("reports")

        # Query reports for the given user_id
        reports = list(report_collection.find({"user_id": user_id}))

        # Convert MongoDB ObjectId to string for each report
        for report in reports:
            report["_id"] = str(report["_id"])

        # Return the reports if found
        if reports:
            return jsonify(reports), 200
        else:
            return jsonify({"message": "No reports found for this user"}), 404

    except Exception as e:
        # Handle errors and return an error response
        return jsonify({"error": str(e)}), 500

@bp.route("/ai-generate", methods=["POST"])
def ai_generate_report():
    try:
        data = request.json
        lifestyle_data = data.get("lifestyle_data")

        if not lifestyle_data:
            return jsonify({"error": "Missing lifestyle_data"}), 400

        # Prompt Gemini
        prompt = f"""
        Based on the following lifestyle metrics, generate a structured personalized health report in JSON format with keys:
        - overview
        - exercise_plan
        - diet_recommendations
        - lifestyle
        - goals
        - next_steps
        - disclaimer

        Here is the input:
        {lifestyle_data}
        """

        payload = {
            "contents": [{"parts": [{"text": prompt}]}]
        }

        headers = {
            "Content-Type": "application/json"
        }

        response = requests.post(GEMINI_URL, json=payload, headers=headers)
        if response.status_code != 200:
            return jsonify({"error": f"Gemini API error: {response.text}"}), 500

        result = response.json()
        raw_text = result["candidates"][0]["content"]["parts"][0]["text"]

        # Clean up code block markdown if present
        cleaned_json_text = re.sub(r"^```json\s*|\s*```$", "", raw_text.strip())

        # Parse the cleaned JSON
        try:
            full_report = json.loads(cleaned_json_text)
        except json.JSONDecodeError:
            return jsonify({
                "error": "Failed to parse structured JSON from Gemini response.",
                "raw_response": raw_text
            }), 500

        # Filter only required 5 keys
        keys_to_keep = [
            "exercise_plan",
            "diet_recommendations",
            "lifestyle",
            "goals",
            "next_steps"
        ]
        filtered_report = {key: full_report.get(key) for key in keys_to_keep}

        return jsonify({
            "message": "AI-based health report generated successfully!",
            "generated_report": filtered_report
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


