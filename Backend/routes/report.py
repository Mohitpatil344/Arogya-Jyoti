from flask import Blueprint, request, jsonify
from datetime import datetime
from bson import ObjectId
from Database.db import get_collection

# Create a Blueprint for the report routes
bp = Blueprint("report", __name__, url_prefix="/report")

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