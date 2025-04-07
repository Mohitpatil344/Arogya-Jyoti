import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Activity, Stethoscope, Star, ArrowRight } from 'lucide-react';
import Button from '../components/Shared/Button';
import Navbar from '../components/Shared/Navbar';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center ">
          <div className="md:w-1/2 text-left mb-8 md:mb-0">
            {user ? (
              <>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Welcome back, <span className="text-blue-600">{user?.email?.split("@")[0]}</span> 👋
                </h1>
                <p className="text-lg text-gray-700 mb-6">
                  Manage your health, view your past assessments, and stay informed.
                </p>
                <Button
                  text="Go to Dashboard"
                  onClick={() => navigate('/dashboard')}
                  className="text-lg px-8 py-3 bg-blue-600 hover:bg-blue-700 inline-flex items-center"
                  icon={<ArrowRight className="ml-2 w-5 h-5" />}
                />
              </>
            ) : (
              <>
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                  Welcome to <span className="text-blue-600">ArogyaJyoti</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Your personal diabetes risk assessment and health management platform. Take control of your health journey today.
                </p>
                <Button
                  text="Begin Your Assessment"
                  onClick={() => navigate('/form')}
                  className="text-lg px-8 py-3 bg-blue-600 hover:bg-blue-700 inline-flex items-center"
                  icon={<ArrowRight className="ml-2 w-5 h-5" />}
                />
              </>
            )}
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
              alt="Healthcare Professional"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose ArogyaJyoti?
        </h2>
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
      </div>

      {/* Testimonials Section */}
      <div className="w-full bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already taken the first step towards a healthier future.
          </p>
          <Button
            text="Start Your Assessment Now"
            onClick={() => navigate('/form')}
            className="text-lg px-8 py-3 bg-black text-black hover:bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

const TestimonialCard = ({ name, role, content, rating }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-center mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
      ))}
    </div>
    <p className="text-gray-600 mb-4 italic">"{content}"</p>
    <div>
      <p className="font-semibold text-gray-900">{name}</p>
      <p className="text-gray-500 text-sm">{role}</p>
    </div>
  </div>
);

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Healthcare Professional",
    content: "ArogyaJyoti provides accurate and comprehensive diabetes risk assessments. It's an invaluable tool for preventive healthcare.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "User",
    content: "The personalized recommendations helped me make meaningful changes to my lifestyle. My health has improved significantly.",
    rating: 5
  },
  {
    name: "Priya Patel",
    role: "Wellness Coach",
    content: "I recommend ArogyaJyoti to all my clients. It's user-friendly and provides actionable insights for better health.",
    rating: 5
  }
];

export default Home;
