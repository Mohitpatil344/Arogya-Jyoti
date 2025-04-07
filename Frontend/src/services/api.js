import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000', // Adjust if using different port
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to simplify responses and handle errors globally
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
    console.log('Form Values:', formValues); // Debugging

    const {
      pregnancies,
      glucose,
      bloodPressure,
      skinThickness,
      insulin,
      bmi,
      diabetesPedigree,
      age,
    } = formValues;

    // Match Flask expected key format
    const payload = {
      Pregnancies: Number(pregnancies),
      Glucose: Number(glucose),
      BloodPressure: Number(bloodPressure),
      SkinThickness: Number(skinThickness),
      Insulin: Number(insulin),
      BMI: Number(bmi),
      DiabetesPedigreeFunction: Number(diabetesPedigree),
      Age: Number(age),
    };

    // Send to Flask backend
    return await api.post('/predict', payload);
  } catch (error) {
    console.error('Prediction error:', error);
    throw new Error('Failed to get prediction');
  }
};

export default api;
