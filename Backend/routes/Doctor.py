# routes/doctor.py
from flask import Blueprint, request, jsonify, current_app
from pymongo import MongoClient
import time

doctor_bp = Blueprint('doctor', __name__, url_prefix='/api/doctore')

# MongoDB connection (using current_app)
def get_doctor_collection():
    client = MongoClient(current_app.config['MONGO_URI'])
    db = client['clinic']
    return db['doctore']

# GET all doctors
@doctor_bp.route('/', methods=['GET'])
def get_all_doctors():
    collection = get_doctor_collection()
    doctors = list(collection.find({}, {'_id': 0}))
    return jsonify(doctors), 200

# POST a new doctor
@doctor_bp.route('/', methods=['POST'])
def add_doctor():
    data = request.json
    required_fields = ['name', 'available', 'specialty',  'timeSlots', 'expertise']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing fields'}), 400

    data['id'] = int(time.time() * 1000)
    if isinstance(data['timeSlots'], str):
        data['timeSlots'] = [slot.strip() for slot in data['timeSlots'].split(',')]

    collection = get_doctor_collection()
    collection.insert_one(data)
    return jsonify({'message': 'Doctor added successfully'}), 201
