import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Activity, Stethoscope } from 'lucide-react';
import Button from '../components/Shared/Button';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to ArogyaJyoti
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your personal diabetes risk assessment and health management platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <FeatureCard
          icon={<Heart className="w-8 h-8 text-blue-600" />}
          title="Personalized Assessment"
          description="Get a detailed analysis of your diabetes risk based on medical and lifestyle factors"
        />
        <FeatureCard
          icon={<Activity className="w-8 h-8 text-blue-600" />}
          title="Lifestyle Analysis"
          description="Understand how your daily habits impact your health and risk factors"
        />
        <FeatureCard
          icon={<Stethoscope className="w-8 h-8 text-blue-600" />}
          title="Expert Recommendations"
          description="Receive tailored health plans and tips from medical professionals"
        />
      </div>

      <Button
        text="Begin Assessment"
        onClick={() => navigate('/form')}
        className="text-lg px-8 py-3"
      />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-center justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

export default Home;