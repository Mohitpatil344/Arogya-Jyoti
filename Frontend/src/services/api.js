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

export default api;
