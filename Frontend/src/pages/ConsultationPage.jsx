import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, Mail, Star, Heart, Activity, Apple, Coffee, Users } from 'lucide-react';

function App() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Endocrinologist",
      experience: "15+ years",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300",
      rating: 4.9,
      hospital: "Diabetes Care Center"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Diabetologist",
      experience: "12+ years",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
      rating: 4.8,
      hospital: "Metropolitan Medical Center"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Endocrinologist",
      experience: "10+ years",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
      rating: 4.7,
      hospital: "Wellness Institute"
    }
  ];

  const hospitals = [
    {
      name: "Diabetes Care Center",
      location: "123 Health Avenue",
      specialties: ["Endocrinology", "Diabetic Care", "Nutritional Counseling"],
      contact: "+1 (555) 123-4567"
    },
    {
      name: "Metropolitan Medical Center",
      location: "456 Medical Plaza",
      specialties: ["Diabetes Management", "Preventive Care", "Wellness Programs"],
      contact: "+1 (555) 987-6543"
    },
    {
      name: "Wellness Institute",
      location: "789 Care Boulevard",
      specialties: ["Holistic Diabetes Care", "Research", "Education"],
      contact: "+1 (555) 456-7890"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Diabetes Care Consultation</h1>
          <p className="text-xl opacity-90">Expert care for your diabetes management journey</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Users, label: "2000+ Patients Treated", color: "bg-green-100 text-green-600" },
            { icon: Activity, label: "24/7 Care Available", color: "bg-blue-100 text-blue-600" },
            { icon: Heart, label: "98% Success Rate", color: "bg-red-100 text-red-600" },
            { icon: Star, label: "Top Rated Doctors", color: "bg-yellow-100 text-yellow-600" }
          ].map((stat, index) => (
            <div key={index} className={`${stat.color} p-6 rounded-lg flex items-center space-x-4`}>
              <stat.icon className="w-8 h-8" />
              <span className="font-semibold">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Doctors Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Our Specialist Doctors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
                <img src={doctor.image} alt={doctor.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{doctor.name}</h3>
                  <p className="text-gray-600 mb-2">{doctor.specialty}</p>
                  <p className="text-gray-600 mb-4">{doctor.experience}</p>
                  <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-2">{doctor.rating}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedDoctor(doctor)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Book Consultation
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hospitals Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Featured Hospitals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hospitals.map((hospital, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">{hospital.name}</h3>
                <div className="flex items-center mb-3">
                  <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                  <span>{hospital.location}</span>
                </div>
                <div className="flex items-center mb-3">
                  <Phone className="w-5 h-5 text-gray-500 mr-2" />
                  <span>{hospital.contact}</span>
                </div>
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-semibold mb-2">Specialties:</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {hospital.specialties.map((specialty, idx) => (
                      <li key={idx}>{specialty}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Diabetes Management Tips */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-8">Daily Management Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <Activity className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="font-bold mb-2">Regular Monitoring</h3>
                <p className="text-gray-600">Keep track of your blood sugar levels and maintain a daily log for better management.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Apple className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-bold mb-2">Healthy Diet</h3>
                <p className="text-gray-600">Follow a balanced diet rich in whole grains, lean proteins, and vegetables.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Coffee className="w-8 h-8 text-brown-600" />
              <div>
                <h3 className="font-bold mb-2">Lifestyle Changes</h3>
                <p className="text-gray-600">Maintain regular exercise routine and manage stress through relaxation techniques.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Emergency Contact</h3>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>24/7 Helpline: +1 (555) 999-8888</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Location</h3>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Medical District, Healthcare City</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Email</h3>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>care@diabetescenter.com</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;