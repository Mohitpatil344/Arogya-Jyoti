import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Activity,
  Stethoscope,
  Star,
  ArrowRight,
  CheckCircle,
  Utensils,
} from "lucide-react";
import { motion } from "framer-motion";
import Button from "../components/Shared/Button";
import MealLogger from "../components/MealLogger";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="flex flex-col min-h-screen"
    >
      <div className="flex-grow">
        {/* Hero Section */}
        <div className="w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
          <motion.div
            className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12"
            variants={staggerChildren}
          >
            <motion.div className="md:w-1/2 text-left" variants={fadeInUp}>
              {user ? (
                <>
                  <h1 className="text-5xl font-bold text-gray-900 mb-4">
                    Welcome back,{" "}
                    <span className="text-blue-600">
                      {user?.email?.split("@")[0]}
                    </span>{" "}
                    👋
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Continue your health journey with personalized insights and
                    recommendations.
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    Your Journey to{" "}
                    <span className="text-blue-600">Better Health</span> Starts
                    Here
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Take control of your health with our advanced diabetes risk
                    assessment and personalized wellness recommendations.
                  </p>
                </>
              )}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  text={user ? "Continue Assessment" : "Begin Your Journey"}
                  onClick={() => navigate("/form")}
                  className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 inline-flex items-center rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  icon={<ArrowRight className="ml-2 w-5 h-5" />}
                />
              </motion.div>
            </motion.div>
            <motion.div className="md:w-1/2" variants={fadeInUp}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
                  alt="Healthcare Professional"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500 w-6 h-6" />
                    <span className="font-semibold text-gray-800">
                      Trusted by Healthcare Professionals
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Meal Logger Section */}
        <div className="container mx-auto px-4 py-16">
          <MealLogger />
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-blue-600">ArogyaJyoti</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience a comprehensive approach to diabetes risk assessment
              and management
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <FeatureCard
              icon={<Heart className="w-12 h-12 text-blue-600" />}
              title="Personalized Assessment"
              description="Get a detailed analysis of your diabetes risk based on medical and lifestyle factors"
            />
            <FeatureCard
              icon={<Activity className="w-12 h-12 text-blue-600" />}
              title="Lifestyle Analysis"
              description="Understand how your daily habits impact your health and risk factors"
            />
            <FeatureCard
              icon={<Stethoscope className="w-12 h-12 text-blue-600" />}
              title="Expert Recommendations"
              description="Receive tailored health plans and tips from medical professionals"
            />
            <FeatureCard
              icon={<Utensils className="w-12 h-12 text-blue-600" />}
              title="Smart Meal Tracking"
              description="Track your meals with AI-powered nutrition analysis for better dietary control"
            />
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="w-full bg-gray-50 py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Trusted by Thousands
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                See what our users have to say about their experience with
                ArogyaJyoti
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer CTA */}
      <motion.div
        className="sticky bottom-0 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6 shadow-lg z-40"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="w-full px-4 flex flex-col md:flex-row items-center justify-between max-w-screen-2xl mx-auto">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-lg opacity-90">
              Join thousands who have already started their journey.
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              text="Start Your Assessment Now"
              onClick={() => navigate("/form")}
              className="text-lg px-8 py-4 bg-blue text-blue-600 hover:bg-gray-100 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
  >
    <div className="flex items-center justify-center mb-6 bg-blue-50 w-20 h-20 rounded-full mx-auto">
      {icon}
    </div>
    <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
      {title}
    </h3>
    <p className="text-gray-600 text-center text-lg">{description}</p>
  </motion.div>
);

const TestimonialCard = ({ name, role, content, rating, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <div className="flex items-center mb-6">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
      ))}
    </div>
    <p className="text-gray-600 mb-6 text-lg leading-relaxed italic">
      "{content}"
    </p>
    <div>
      <p className="font-semibold text-gray-900 text-lg">{name}</p>
      <p className="text-gray-500">{role}</p>
    </div>
  </motion.div>
);

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Healthcare Professional",
    content:
      "ArogyaJyoti provides accurate and comprehensive diabetes risk assessments. It's an invaluable tool for preventive healthcare.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "User",
    content:
      "The personalized recommendations helped me make meaningful changes to my lifestyle. My health has improved significantly.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Wellness Coach",
    content:
      "I recommend ArogyaJyoti to all my clients. It's user-friendly and provides actionable insights for better health.",
    rating: 5,
  },
];

export default Home;