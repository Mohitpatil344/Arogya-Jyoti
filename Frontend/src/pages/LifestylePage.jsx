import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DailyRoutine from '../components/Lifestyle/DailyRoutine';
import Diet from '../components/Lifestyle/Diet';
import PhysicalActivity from '../components/Lifestyle/PhysicalActivity';
import Button from '../components/Shared/Button';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  
    const localReport = JSON.parse(localStorage.getItem('report')) || {};
  
    const updatedReport = {
      ...localReport,
      lifestyleMetrics: {
        'Exercise Frequency': formData.exerciseFrequency,
        'Exercise Type': formData.exerciseType,
        'Screen Time': formData.screenTime,
        'Sitting Hours': formData.sittingHours
      },
      medicalMetrics: {
        ...localReport.medicalMetrics,
        'Sleep Hours': formData.sleepHours,
        'Sugar Intake': formData.sugarIntake,
        'Calorie Intake': formData.calorieIntake,
        'Water Intake': formData.waterIntake
      },
      observations: [
        ...localReport.observations || [],
        parseInt(formData.sleepHours) < 5
          ? 'You are not getting enough sleep.'
          : 'Your sleep pattern looks good.',
        parseInt(formData.sugarIntake) > 100
          ? 'High sugar intake observed.'
          : 'Sugar intake is within healthy range.',
        formData.exerciseFrequency === 'none'
          ? 'Consider adding physical activity to your routine.'
          : 'Great job staying active!'
      ]
    };
  
    localStorage.setItem('report', JSON.stringify(updatedReport));
    navigate('/report');
    setLoading(false);
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
