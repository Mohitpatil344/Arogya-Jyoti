import React from 'react';
import { Activity, Apple, Moon, Heart } from 'lucide-react';

const PlanPage = () => {
  const plan = {
    exercise: [
      '30 minutes of brisk walking every day',
      'Stretching exercises in the morning',
    ],
    diet: [
      'Eat more vegetables and whole grains',
      'Reduce sugar and processed food intake',
    ],
    lifestyle: [
      'Sleep at least 7 hours a night',
      'Reduce screen time before bed',
    ],
    goals: [
      'Lose 5 kg in 3 months',
      'Improve cardiovascular health',
    ],
    nextSteps: [
      'Start tracking your meals using a health app',
      'Join a local gym or online fitness program',
      'Schedule a health check-up in a month',
    ],
  };

  const categories = [
    { icon: Activity, title: 'Exercise Plan', key: 'exercise' },
    { icon: Apple, title: 'Diet Recommendations', key: 'diet' },
    { icon: Moon, title: 'Lifestyle Changes', key: 'lifestyle' },
    { icon: Heart, title: 'Health Goals', key: 'goals' },
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
