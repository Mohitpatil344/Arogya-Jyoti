import React, { useEffect, useState } from 'react';
import { getHealthPlan } from '../services/api';
import { Activity, Apple, Moon, Heart } from 'lucide-react';

const PlanPage = () => {
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const data = await getHealthPlan();
        setPlan(data);
      } catch (err) {
        setError('Failed to load health plan. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  const categories = [
    { icon: Activity, title: 'Exercise Plan', key: 'exercise' },
    { icon: Apple, title: 'Diet Recommendations', key: 'diet' },
    { icon: Moon, title: 'Lifestyle Changes', key: 'lifestyle' },
    { icon: Heart, title: 'Health Goals', key: 'goals' }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Your Personalized Health Plan
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(({ icon: Icon, title, key }) => (
          <div key={key} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
              <Icon className="h-6 w-6 text-blue-600" />
              <h3 className="ml-2 text-xl font-semibold">{title}</h3>
            </div>
            <ul className="space-y-3">
              {plan?.[key]?.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
        <ul className="space-y-3">
          {plan?.nextSteps?.map((step, index) => (
            <li key={index} className="flex items-start">
              <span className="font-bold mr-2">{index + 1}.</span>
              <span className="text-gray-700">{step}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlanPage;