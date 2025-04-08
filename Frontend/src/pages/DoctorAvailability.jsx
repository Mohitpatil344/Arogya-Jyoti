import React, { useState, useEffect } from 'react';
import { UserRound, Clock, CheckCircle, XCircle, Calendar } from 'lucide-react';

function App() {
  const hardcodedDoctors = [
    {
      id: 1,
      name: 'Dr. John Doe',
      available: true,
      specialty: 'Endocrinologist',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=80',
      timeSlots: ['9:00 AM - 5:00 PM'],
      expertise: 'Type 1 Diabetes Management'
    },
    {
      id: 2,
      name: 'Dr. Jane Smith',
      available: false,
      specialty: 'Diabetologist',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&auto=format&fit=crop&q=80',
      timeSlots: ['11:00 AM - 5:00 PM'],
      expertise: 'Gestational Diabetes Care'
    },
    {
      id: 3,
      name: 'Dr. Emily Johnson',
      available: false,
      specialty: 'Endocrinologist',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80',
      timeSlots: ['10:00 AM - 5:00 PM'],
      expertise: 'Pediatric Diabetes'
    },
    {
      id: 4,
      name: 'Dr. Michael Chen',
      available: true,
      specialty: 'Diabetologist',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80',
      timeSlots: ['10:00 AM - 5:00 AM'],
      expertise: 'Type 2 Diabetes Management'
    },
    {
      id: 5,
      name: 'Dr. Sarah Williams',
      available: true,
      specialty: 'Endocrinologist',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80',
      timeSlots: ['9:30 AM - 5:00 PM'],
      expertise: 'Diabetes & Thyroid Disorders'
    },
    {
      id: 6,
      name: 'Dr. Robert Martinez',
      available: false,
      specialty: 'Diabetologist',
      image: 'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=400&auto=format&fit=crop&q=80',
      timeSlots: ['10:30 AM - 4:30 PM'],
      expertise: 'Complex Diabetes Cases'
    }
  ];

  const [doctors, setDoctors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    image: '',
    timeSlots: '',
    expertise: '',
    available: true,
  });

  useEffect(() => {
    const storedDoctors = JSON.parse(localStorage.getItem('customDoctors')) || [];
    setDoctors([...hardcodedDoctors, ...storedDoctors]);
  }, []);

  const handleAddDoctor = (e) => {
    e.preventDefault();
    const newDoctor = {
      id: Date.now(),
      ...formData,
      timeSlots: formData.timeSlots.split(',').map(slot => slot.trim()),
      available: formData.available === 'true' || formData.available === true,
    };

    const updatedCustomDoctors = [...(JSON.parse(localStorage.getItem('customDoctors')) || []), newDoctor];
    localStorage.setItem('customDoctors', JSON.stringify(updatedCustomDoctors));
    setDoctors(prev => [...prev, newDoctor]);

    setFormData({
      name: '',
      specialty: '',
      image: '',
      timeSlots: '',
      expertise: '',
      available: true,
    });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <UserRound className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-800">Diabetes Specialists Availability</h1>
        </div>

        {/* Toggle Button */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => setShowForm(prev => !prev)}
            className="mb-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
          >
            {showForm ? 'Hide Add Doctor Form' : 'Add New Doctor'}
          </button>

          {showForm && (
            <form
              onSubmit={handleAddDoctor}
              className="bg-white p-6 rounded-lg shadow grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input type="text" required placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="p-2 border rounded" />
              <input type="text" required placeholder="Specialty" value={formData.specialty} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} className="p-2 border rounded" />
              <input type="text" required placeholder="Image URL" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="p-2 border rounded" />
              <input type="text" required placeholder="Time Slots (comma separated)" value={formData.timeSlots} onChange={(e) => setFormData({ ...formData, timeSlots: e.target.value })} className="p-2 border rounded" />
              <input type="text" required placeholder="Expertise" value={formData.expertise} onChange={(e) => setFormData({ ...formData, expertise: e.target.value })} className="p-2 border rounded" />
              <select value={formData.available} onChange={(e) => setFormData({ ...formData, available: e.target.value })} className="p-2 border rounded">
                <option value="true">Available</option>
                <option value="false">Not Available</option>
              </select>
              <button type="submit" className="col-span-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded">Add Doctor</button>
            </form>
          )}
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
            >
              <div className="h-48 overflow-hidden">
                <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
              </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">{doctor.name}</h2>
                <p className="text-gray-600 mb-2">{doctor.specialty}</p>
                <p className="text-sm text-indigo-600 mb-4">{doctor.expertise}</p>

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Available Time Slots:</span>
                  </div>
                  <ul className="text-sm text-gray-600 ml-7">
                    {doctor.timeSlots.map((slot, index) => (
                      <li key={index} className="mb-1">• {slot}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">Status</span>
                  </div>

                  <div className={`flex items-center gap-2 ${doctor.available ? 'text-green-600' : 'text-red-600'}`}>
                    {doctor.available ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Available</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5" />
                        <span className="font-medium">Not Available</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
