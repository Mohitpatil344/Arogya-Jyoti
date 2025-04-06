import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
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
    // For development, return mock data
    // Remove this when backend is ready
    return {
      riskLevel: localStorage.getItem('diabetesRisk') || 'low',
      medicalMetrics: {
        'Blood Glucose': '120 mg/dL',
        'BMI': '24.5',
        'Blood Pressure': '120/80 mmHg',
      },
      lifestyleMetrics: {
        'Sleep': '7 hours/day',
        'Exercise': 'Moderate',
        'Diet Quality': 'Good',
      },
      observations: [
        'Blood glucose levels are within normal range',
        'Regular exercise routine is beneficial',
        'Consider increasing water intake',
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
    // For development, return mock data
    // Remove this when backend is ready
    return {
      exercise: [
        'Start with 30 minutes of walking daily',
        'Include strength training twice a week',
        'Practice yoga for flexibility',
      ],
      diet: [
        'Increase fiber intake through whole grains',
        'Limit processed sugar consumption',
        'Eat more leafy greens',
      ],
      lifestyle: [
        'Maintain regular sleep schedule',
        'Take breaks during work hours',
        'Practice stress management techniques',
      ],
      goals: [
        'Reduce BMI by 2 points in 3 months',
        'Achieve 150 minutes of exercise weekly',
        'Keep blood glucose under 140 mg/dL',
      ],
      nextSteps: [
        'Schedule a follow-up with your healthcare provider',
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