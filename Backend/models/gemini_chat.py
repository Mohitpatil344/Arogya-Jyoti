import os
from google.generativeai import configure, GenerativeModel

# Configure Gemini API
configure(api_key=os.getenv("GEMINI_API_KEY"))

# Load the free Gemini model (flash is fast & enough for this use-case)
model = GenerativeModel("gemini-1.5-flash")

def get_diabetes_chat_response(user_message: str) -> str:
    try:
        response = model.generate_content(user_message)
        return response.text
    except Exception as e:
        print("Gemini Error:", e)
        return "Sorry, something went wrong while generating the response."
