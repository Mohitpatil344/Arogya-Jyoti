import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // <-- your Flask backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || 'An unexpected error occurred';
    throw new Error(message);
  }
);

export const predictDiabetes = async (medicalData) => {
  try {
    // For development, return mock data
    // Remove this when backend is ready
    return {
      risk: Math.random() > 0.5 ? 'high' : 'low',
    };
    
    // Uncomment when backend is ready
    // return await api.post('/predict', medicalData);
  } catch (error) {
    console.error('Prediction error:', error);
    throw new Error('Failed to get prediction');
  }
};

export const submitLifestyle = async (lifestyleData) => {
  try {
    // For development, return mock success
    // Remove this when backend is ready
    return { success: true };
    
    // Uncomment when backend is ready
    // return await api.post('/lifestyle', lifestyleData);
  } catch (error) {
    console.error('Lifestyle submission error:', error);
    throw new Error('Failed to submit lifestyle data');
  }
};

export const getReport = async () => {
  try {
    // For development, return mock data based on stored information
    const risk = localStorage.getItem('diabetesRisk') || 'low';
    const medicalData = JSON.parse(localStorage.getItem('medicalData') || '{}');
    const lifestyleData = JSON.parse(localStorage.getItem('lifestyleData') || '{}');

    return {
      riskLevel: risk,
      medicalMetrics: {
        'Blood Glucose': `${medicalData.glucose || 120} mg/dL`,
        'BMI': medicalData.bmi || '24.5',
        'Blood Pressure': `${medicalData.bloodPressure || 120}/80 mmHg`,
        'Age': medicalData.age || '35',
        'Insulin Level': `${medicalData.insulin || 80} mu U/ml`,
      },
      lifestyleMetrics: {
        'Sleep': `${lifestyleData.sleepHours || 7} hours/day`,
        'Exercise': lifestyleData.exerciseFrequency || 'Moderate',
        'Diet Quality': lifestyleData.fruitVegIntake || 'Good',
        'Water Intake': `${lifestyleData.waterIntake || 2} L/day`,
        'Stress Level': lifestyleData.stressLevel || 'Moderate',
      },
      observations: [
        risk === 'high' 
          ? 'Your blood glucose levels indicate increased risk'
          : 'Blood glucose levels are within normal range',
        lifestyleData.exerciseFrequency === 'daily'
          ? 'Excellent exercise routine, keep it up!'
          : 'Consider increasing physical activity',
        Number(lifestyleData.waterIntake) >= 3
          ? 'Good hydration habits'
          : 'Consider increasing water intake',
        Number(lifestyleData.sleepHours) >= 7
          ? 'Healthy sleep pattern'
          : 'Try to get more sleep for better health',
      ],
    };
    
    // Uncomment when backend is ready
    // return await api.get('/report');
  } catch (error) {
    console.error('Report fetch error:', error);
    throw new Error('Failed to fetch report');
  }
};

export const getHealthPlan = async () => {
  try {
    const risk = localStorage.getItem('diabetesRisk') || 'low';
    const lifestyleData = JSON.parse(localStorage.getItem('lifestyleData') || '{}');
    
    // Customize plan based on stored data
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
    
    // Uncomment when backend is ready
    // return await api.get('/plan');
  } catch (error) {
    console.error('Health plan fetch error:', error);
    throw new Error('Failed to fetch health plan');
  }
};

export default api;
