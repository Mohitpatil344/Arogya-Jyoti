import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/Shared/InputField';
import Button from '../components/Shared/Button';
import { predictDiabetes } from '../services/api';

const FormPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    pregnancies: '',
    glucose: '',
    bloodPressure: '',
    skinThickness: '',
    insulin: '',
    bmi: '',
    diabetesPedigree: '',
    age: ''
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
      const result = await predictDiabetes(formData);
  
      const report = {
        riskLevel: result.prediction === 1 ? 'high' : 'low',
        medicalMetrics: formData,
        lifestyleMetrics: {}, // will be added later
        observations: [
          result.prediction === 1
            ? 'Your results indicate a high risk of diabetes.'
            : 'You are likely not diabetic.',
        ]
      };
      
  
      localStorage.setItem('report', JSON.stringify(report));
      localStorage.setItem('medicalData', JSON.stringify(formData));
      navigate('/lifestyle');
  
    } catch (error) {
      alert('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Medical Information</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm">
        <InputField label="Number of Pregnancies" type="number" name="pregnancies" value={formData.pregnancies} onChange={handleChange} min="0" required />
        <InputField label="Glucose Level (mg/dL)" type="number" name="glucose" value={formData.glucose} onChange={handleChange} min="0" required />
        <InputField label="Blood Pressure (mm Hg)" type="number" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} min="0" required />
        <InputField label="Skin Thickness (mm)" type="number" name="skinThickness" value={formData.skinThickness} onChange={handleChange} min="0" required />
        <InputField label="Insulin Level (mu U/ml)" type="number" name="insulin" value={formData.insulin} onChange={handleChange} min="0" required />
        <InputField label="BMI" type="number" name="bmi" value={formData.bmi} onChange={handleChange} step="0.1" min="0" required />
        <InputField label="Diabetes Pedigree Function" type="number" name="diabetesPedigree" value={formData.diabetesPedigree} onChange={handleChange} step="0.001" min="0" required />
        <InputField label="Age" type="number" name="age" value={formData.age} onChange={handleChange} min="0" required />
        <div className="flex justify-end mt-6">
          <Button text={loading ? 'Submitting...' : 'Continue to Lifestyle Assessment'} type="submit" disabled={loading} />
        </div>
      </form>
    </div>
  );
};

export default FormPage;
