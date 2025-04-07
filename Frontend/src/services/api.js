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
export const predictDiabetes = async (formData) => {
  const payload = {
    Pregnancies: parseInt(formData.pregnancies),
    Glucose: parseFloat(formData.glucose),
    BloodPressure: parseFloat(formData.bloodPressure),
    SkinThickness: parseFloat(formData.skinThickness),
    Insulin: parseFloat(formData.insulin),
    BMI: parseFloat(formData.bmi),
    DiabetesPedigreeFunction: parseFloat(formData.diabetesPedigree),
    Age: parseInt(formData.age)
  };

  const response = await axios.post('http://localhost:5000/predict', payload);
  return response.data; // assuming { risk: "high" | "low" }
};

export default api;
