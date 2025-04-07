import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.error || error.message || 'An unexpected error occurred';
    throw new Error(message);
  }
);

// 🔍 Predict diabetes risk using the ML model
export const predictDiabetes = async (formValues) => {
  try {
    const features = [
      Number(formValues.pregnancies),
      Number(formValues.glucose),
      Number(formValues.bloodPressure),
      Number(formValues.skinThickness),
      Number(formValues.insulin),
      Number(formValues.bmi),
      Number(formValues.diabetesPedigree),
      Number(formValues.age),
    ];

    return await api.post('/predict', { features });
  } catch (error) {
    console.error('Prediction error:', error);
    throw new Error('Failed to get prediction');
  }
};

// 📥 Submit lifestyle data to the backend
export const submitLifestyle = async (lifestyleData) => {
  try {
    return await api.post('/lifestyle/add', lifestyleData);
  } catch (error) {
    console.error('Lifestyle submission error:', error);
    throw new Error('Failed to submit lifestyle data');
  }
};

// 📊 Get lifestyle + medical report
export const getReport = async (userId) => {
  try {
    return await api.get(`/lifestyle/get/${userId}`);
  } catch (error) {
    console.error('Report fetch error:', error);
    throw new Error('Failed to fetch report');
  }
};

// 🧠 Generate health plan (locally, or can be server-based)
export const getHealthPlan = async () => {
  try {
    const risk = localStorage.getItem('diabetesRisk') || 'low';
    const lifestyleData = JSON.parse(localStorage.getItem('lifestyleData') || '{}');

    return {
      exercise: [
        lifestyleData.exerciseFrequency === 'rarely'
          ? 'Start with 15 minutes of walking daily'
          : 'Maintain your current exercise routine',
        'Include strength training twice a week',
        'Practice yoga for flexibility',
      ],
      diet: [
        'Increase fiber intake through whole grains',
        Number(lifestyleData.sugarIntake) > 30
          ? 'Reduce sugar consumption significantly'
          : 'Maintain current sugar intake levels',
        'Eat more leafy greens',
      ],
      lifestyle: [
        Number(lifestyleData.sleepHours) < 7
          ? 'Improve sleep schedule to get at least 7 hours'
          : 'Maintain regular sleep schedule',
        Number(lifestyleData.screenTime) > 8
          ? 'Reduce screen time and take regular breaks'
          : 'Continue maintaining healthy screen time habits',
        lifestyleData.stressLevel === 'high'
          ? 'Priority: Practice stress management techniques'
          : 'Practice regular relaxation exercises',
      ],
      goals: [
        risk === 'high'
          ? 'Priority: Reduce blood glucose levels'
          : 'Maintain healthy blood glucose levels',
        'Achieve 150 minutes of exercise weekly',
        'Stay well hydrated with 2-3L water daily',
      ],
      nextSteps: [
        risk === 'high'
          ? 'Schedule a follow-up with your healthcare provider immediately'
          : 'Schedule a routine health check-up',
        'Start a food and exercise journal',
        'Join a local fitness class or group',
      ],
    };
  } catch (error) {
    console.error('Health plan fetch error:', error);
    throw new Error('Failed to fetch health plan');
  }
};

export default api;
