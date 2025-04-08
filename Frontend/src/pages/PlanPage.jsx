import React from 'react';
import { useLocation } from 'react-router-dom';
import { Activity, Apple, Moon, Heart } from 'lucide-react';

const PlanPage = () => {
  const { state } = useLocation();
  const condition = state?.condition || 'non-diabetic';

  const plans = {
    diabetic: {
      exercise: [
        '30 minutes of moderate-intensity walking daily',
        'Light strength training 2-3 times a week',
        'Try low-impact cardio like cycling or swimming',
        'Yoga or tai chi for flexibility and stress relief',
        '5-10 minutes of stretching morning and night',
      ],
      diet: [
        'Focus on low-glycemic foods (like legumes, leafy greens)',
        'Avoid sugary drinks and processed snacks',
        'Eat smaller meals more frequently',
        'Consume high-fiber foods like oats and flaxseeds',
        'Drink at least 2.5 liters of water daily',
        'Limit red meat and opt for lean protein like tofu or chicken',
      ],
      lifestyle: [
        'Monitor blood sugar regularly (fasting + post-meal)',
        'Sleep at least 7-8 hours per night',
        'Reduce stress through meditation or yoga',
        'Quit smoking and limit alcohol',
        'Take 5-minute movement breaks during long sitting periods',
      ],
      goals: [
        'Maintain stable blood glucose levels',
        'Lose 3-5 kg over 3 months',
        'Improve insulin sensitivity',
        'Lower HbA1c levels below 7%',
        'Increase daily energy and reduce fatigue',
      ],
      nextSteps: [
        'Consult a dietitian for a personalized meal plan',
        'Track sugar levels using a glucose monitor',
        'Schedule a follow-up check-up in 1 month',
        'Download a diabetes management app',
        'Join a local diabetes support group or online community',
      ],
    },
    'non-diabetic': {
      exercise: [
        '30 minutes of brisk walking every day',
        'Stretching exercises in the morning',
        'Do bodyweight training 2x per week',
        'Take stairs instead of the elevator',
        'Weekend cycling or hiking for fun + fitness',
      ],
      diet: [
        'Eat more vegetables and whole grains',
        'Reduce sugar and processed food intake',
        'Include healthy fats (nuts, seeds, olive oil)',
        'Practice portion control during meals',
        'Stay hydrated—aim for 8-10 glasses daily',
      ],
      lifestyle: [
        'Sleep at least 7 hours a night',
        'Reduce screen time before bed',
        'Avoid unnecessary stress through journaling or mindfulness',
        'Limit caffeine intake in the evening',
        'Incorporate daily habits like gratitude practice',
      ],
      goals: [
        'Lose 5 kg in 3 months',
        'Improve cardiovascular health',
        'Build a consistent morning routine',
        'Increase overall stamina and flexibility',
        'Prevent future metabolic or lifestyle diseases',
      ],
      nextSteps: [
        'Start tracking your meals using a health app',
        'Join a local gym or online fitness program',
        'Schedule a health check-up in a month',
        'Create a weekly meal-prep plan',
        'Find a fitness accountability partner or coach',
      ],
    },
  };
  

  const plan = plans[condition];

  const categories = [
    { icon: Activity, title: 'Exercise Plan', key: 'exercise' },
    { icon: Apple, title: 'Diet Recommendations', key: 'diet' },
    { icon: Moon, title: 'Lifestyle Changes', key: 'lifestyle' },
    { icon: Heart, title: 'Health Goals', key: 'goals' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Your {condition === 'diabetic' ? 'Diabetic' : 'Personalized'} Health Plan
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
