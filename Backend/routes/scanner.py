from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
import pytesseract
from PIL import Image
import re
import fitz  # PyMuPDF

scanner_bp = Blueprint('scanner', __name__)

# Create 'uploads' folder if it doesn't exist
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@scanner_bp.route('/upload-report', methods=['POST'])
def upload_report():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'Empty filename'}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    try:
        extracted_data = extract_medical_data(filepath)
        return jsonify({'data': extracted_data})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def extract_medical_data(filepath):
    text = ""

    # Check if file is PDF
    if filepath.lower().endswith('.pdf'):
        doc = fitz.open(filepath)
        for page in doc:
            # Render page to image
            pix = page.get_pixmap()
            img_path = filepath + f"_page_{page.number}.png"
            pix.save(img_path)

            # OCR using pytesseract
            img = Image.open(img_path)
            text += pytesseract.image_to_string(img)
            os.remove(img_path)  # Cleanup temp image
    else:
        # Assume image
        img = Image.open(filepath)
        text = pytesseract.image_to_string(img)

    # Parse values
    glucose = re.search(r'glucose\s*[:\-]?\s*(\d+)', text, re.IGNORECASE)
    bp = re.search(r'(blood pressure|bp)\s*[:\-]?\s*(\d+\/\d+)', text, re.IGNORECASE)
    skin = re.search(r'skin thickness\s*[:\-]?\s*(\d+)', text, re.IGNORECASE)

    return {
        'glucose': int(glucose.group(1)) if glucose else None,
        'blood_pressure': bp.group(2) if bp else None,
        'skin_thickness': int(skin.group(1)) if skin else None,
        'raw_text': text  # For debugging or fallback display
    }

