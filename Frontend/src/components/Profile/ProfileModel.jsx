import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Calendar, Activity, Clock, Phone, MapPin } from 'lucide-react';
import Button from '../Shared/Button';

const ProfileModal = ({ isOpen, onClose }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const medicalData = JSON.parse(localStorage.getItem('medicalData') || '{}');
  const lifestyleData = JSON.parse(localStorage.getItem('lifestyleData') || '{}');

  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
            className="bg-white rounded-2xl shadow-xl w-full max-w-2xl"
          >
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Profile Details</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                  <ProfileField icon={<User />} label="Name" value={user.name || 'Not provided'} />
                  <ProfileField icon={<Mail />} label="Email" value={user.email || 'Not provided'} />
                  <ProfileField icon={<Phone />} label="Phone" value={user.phone || 'Not provided'} />
                  <ProfileField icon={<MapPin />} label="Location" value={user.location || 'Not provided'} />
                </div>

                {/* Medical Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
                  <ProfileField icon={<Activity />} label="Blood Glucose" value={`${medicalData.glucose || 'N/A'} mg/dL`} />
                  <ProfileField icon={<Activity />} label="Blood Pressure" value={`${medicalData.bloodPressure || 'N/A'} mm Hg`} />
                  <ProfileField icon={<Activity />} label="BMI" value={medicalData.bmi || 'N/A'} />
                  <ProfileField icon={<Calendar />} label="Age" value={medicalData.age || 'N/A'} />
                </div>

                {/* Lifestyle Information */}
                <div className="space-y-4 md:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Lifestyle Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ProfileField icon={<Clock />} label="Sleep Hours" value={`${lifestyleData.sleepHours || 'N/A'} hours`} />
                    <ProfileField icon={<Activity />} label="Exercise Frequency" value={lifestyleData.exerciseFrequency || 'N/A'} />
                    <ProfileField icon={<Activity />} label="Stress Level" value={lifestyleData.stressLevel || 'N/A'} />
                    <ProfileField icon={<Activity />} label="Water Intake" value={`${lifestyleData.waterIntake || 'N/A'} L/day`} />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
             
                <Button
                  text="Close"
                  onClick={onClose}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ProfileField = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3">
    <div className="text-blue-600">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-gray-900">{value}</p>
    </div>
  </div>
);

export default ProfileModal;