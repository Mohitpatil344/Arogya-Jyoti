import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DailyRoutine from '../components/Lifestyle/DailyRoutine';
import Diet from '../components/Lifestyle/Diet';
import PhysicalActivity from '../components/Lifestyle/PhysicalActivity';
import Button from '../components/Shared/Button';
import { submitLifestyle } from '../services/api';

const LifestylePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Daily Routine
    sleepHours: '',
    workSchedule: '',
    stressLevel: '',
    // Diet
    calorieIntake: '',
    sugarIntake: '',
    fruitVegIntake: '',
    waterIntake: '',
    // Physical Activity
    exerciseFrequency: '',
    exerciseType: '',
    screenTime: '',
    sittingHours: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitLifestyle(formData);
      navigate('/report');
    } catch (error) {
      alert('Error submitting lifestyle data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Lifestyle Assessment</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm">
        <DailyRoutine formData={formData} onChange={handleChange} />
        <Diet formData={formData} onChange={handleChange} />
        <PhysicalActivity formData={formData} onChange={handleChange} />
        <div className="flex justify-end mt-6">
          <Button
            text={loading ? 'Submitting...' : 'View Report'}
            type="submit"
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default LifestylePage;