import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

import {
  Heart,
  Activity,
  Stethoscope,
  Star,
  ArrowRight,
  CheckCircle,
  MessageCircle,
  Brain,
  Utensils,
  BarChart as ChartBar,
  Coffee,
  Pizza,
  Apple,
  Users,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import Button from "../components/Shared/Button";
import MealLogger from "../components/MealLogger";

// Blood Sugar Data
const bloodSugarData = [
  {
    time: "Fasting (6:00 AM)",
    level: 95,
    recommendation: { min: 70, max: 99 },
  },
  {
    time: "After Breakfast (8:00 AM)",
    level: 135,
    recommendation: { min: 70, max: 140 },
  },
  {
    time: "After Lunch (1:00 PM)",
    level: 130,
    recommendation: { min: 70, max: 140 },
  },
  {
    time: "After Dinner (7:00 PM)",
    level: 125,
    recommendation: { min: 70, max: 140 },
  },
  {
    time: "Bedtime (10:00 PM)",
    level: 110,
    recommendation: { min: 70, max: 120 },
  },
];

const sugarConsumptionData = [
  {
    category: "Added Sugars",
    current: 12, // global average
    recommended: 10, // WHO recommends <10% of daily energy, ideally <5%
    description: "Sugars added during manufacturing, cooking, or at the table.",
  },
  {
    category: "Natural Sugars",
    current: 18, // typical in fruit-rich diets
    recommended: 15,
    description: "Present naturally in whole fruits, vegetables, and milk.",
  },
  {
    category: "Carbohydrates",
    current: 50,
    recommended: 55, // WHO recommends 55-75% of total energy intake
    description: "Primary energy source – includes grains, legumes, etc.",
  },
];
const globalGrowthData = [
  { year: 2000, cases: 151 }, // millions
  { year: 2010, cases: 285 },
  { year: 2021, cases: 537 },
  { year: 2030, cases: 643 }, // projection
  { year: 2045, cases: 783 }, // projection
];
const genderRisk = [
  { name: "Male", value: 52 },
  { name: "Female", value: 48 },
];

const mealImpactData = [
  { meal: "High GI Breakfast", impact: 70, recommendation: 55 },
  { meal: "Low GI Breakfast", impact: 45, recommendation: 55 },
  { meal: "High GI Lunch", impact: 75, recommendation: 55 },
  { meal: "Low GI Lunch", impact: 50, recommendation: 55 },
  { meal: "High GI Dinner", impact: 65, recommendation: 55 },
  { meal: "Low GI Dinner", impact: 40, recommendation: 55 },
];

const foodCategories = [
  {
    name: "Low GI Foods (≤55)",
    value: 40,
    description: "Most fruits, vegetables, legumes",
  },
  {
    name: "Medium GI Foods (56-69)",
    value: 35,
    description: "Whole wheat products, sweet potato",
  },
  {
    name: "High GI Foods (≥70)",
    value: 25,
    description: "White bread, processed foods",
  },
];

// Age-related diabetes data
const diabetesData = [
  { age: "20-29", prevalence: 3.8 },
  { age: "30-39", prevalence: 6.3 },
  { age: "40-49", prevalence: 10.5 },
  { age: "50-59", prevalence: 16.0 },
  { age: "60-69", prevalence: 22.5 },
  { age: "70-79", prevalence: 24.7 },
];

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [currentQuote, setCurrentQuote] = useState(0);

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

    // Auto rotate quotes
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % inspirationalQuotes.length);
    }, 5000);

    return () => clearInterval(interval);
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
  const COLORS = ["#3B82F6", "#EC4899"];
  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="flex flex-col min-h-screen bg-gray-50"
    >
      {/* Marquee Section */}
      <div className="bg-blue-600 text-white py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex">
          {healthStats.map((stat, index) => (
            <span key={index} className="mx-8 inline-flex items-center">
              <span className="font-semibold mr-2">{stat.label}:</span>
              {stat.value}
            </span>
          ))}
        </div>
      </div>

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
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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

      {/* Analytics Dashboard Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Blood Sugar Analytics Dashboard
        </h2>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Daily Blood Sugar Levels */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Activity className="w-6 h-6 mr-2 text-blue-600" />
              Daily Blood Sugar Levels
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bloodSugarData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="level"
                    stroke="#3B82F6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sugar Consumption Analysis */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Coffee className="w-6 h-6 mr-2 text-blue-600" />
              Sugar Consumption Analysis
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sugarConsumptionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#3B82F6" name="Current" />
                  <Bar
                    dataKey="recommended"
                    fill="#10B981"
                    name="Recommended"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-purple-600" />
              Global Diabetes Growth (in millions)
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={globalGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis
                    label={{
                      value: "Cases (millions)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="cases" fill="#6366F1" name="Diabetes Cases" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Activity className="w-6 h-6 mr-2 text-rose-500" />
              Age-wise Diabetes Prevalence (%)
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={diabetesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis
                    label={{
                      value: "Prevalence (%)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="prevalence"
                    fill="#F43F5E"
                    name="Prevalence %"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Users className="w-6 h-6 mr-2 text-indigo-500" />
              Gender-based Diabetes Risk
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderRisk}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {genderRisk.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Secondary Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Meal Impact on Blood Sugar */}
          <div className="bg-white p-6 rounded-xl shadow-lg lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Utensils className="w-6 h-6 mr-2 text-blue-600" />
              Meal Impact on Blood Sugar
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mealImpactData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="meal" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="impact"
                    fill="#93C5FD"
                    stroke="#3B82F6"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Food Categories Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Pizza className="w-6 h-6 mr-2 text-blue-600" />
              Food Categories
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={foodCategories}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#3B82F6"
                    dataKey="value"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            Healthy Sugar Consumption Guidelines
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <Apple className="w-5 h-5 mr-2 text-blue-600" />
                Natural Sugars
              </h3>
              <p className="text-gray-700">
                Aim for 25-30g from fruits and vegetables daily. These provide
                essential nutrients and fiber.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <Coffee className="w-5 h-5 mr-2 text-blue-600" />
                Added Sugars
              </h3>
              <p className="text-gray-700">
                Limit to 25g or less per day. Check food labels and choose
                low-sugar alternatives.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-blue-600" />
                Smart Choices
              </h3>
              <p className="text-gray-700">
                Choose complex carbohydrates and foods with low glycemic index
                for better blood sugar control.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* App Features Section */}
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Health Management
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience a complete suite of tools designed to help you manage and
            improve your health
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>

      {/* WHO Guidelines Section */}
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            WHO Guidelines
          </h2>
          <p className="text-xl text-gray-600">
            Essential recommendations for diabetes prevention
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whoGuidelines.map((guideline, index) => (
            <GuidelineCard key={index} {...guideline} />
          ))}
        </div>
      </div>
          <MealLogger />
      {/* Meal Plan Preview Section */}
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Personalized Meal Plans
          </h2>
          <p className="text-xl text-gray-600">
            Tailored nutrition recommendations for your health goals
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mealPlans.map((meal, index) => (
            <MealCard key={index} {...meal} />
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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

      {/* Sticky Footer CTA */}
      <motion.div
        className="sticky bottom-0 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6 shadow-lg z-40"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
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
              className="text-lg px-8 py-4 bg-blue text-white hover:bg-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Component definitions
const FeatureCard = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
  >
    <div className="flex items-center justify-center mb-6 bg-blue-50 w-20 h-20 rounded-full mx-auto">
      <Icon className="w-10 h-10 text-blue-600" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
      {title}
    </h3>
    <p className="text-gray-600 text-center">{description}</p>
  </motion.div>
);

const GuidelineCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-xl shadow-lg"
  >
    <div className="flex items-center mb-4">
      <Icon className="w-8 h-8 text-blue-600" />
      <h3 className="ml-3 text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const MealCard = ({ image, title, calories, macros }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-xl shadow-lg overflow-hidden"
  >
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{calories} calories</p>
      <div className="flex justify-between text-sm">
        {Object.entries(macros).map(([key, value]) => (
          <span key={key} className="text-gray-500">
            {key}: {value}
          </span>
        ))}
      </div>
    </div>
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

// Data
const features = [
  {
    icon: Brain,
    title: "AI-Powered Prediction",
    description:
      "Advanced algorithms analyze your health data for accurate diabetes risk assessment",
  },
  {
    icon: MessageCircle,
    title: "24/7 Health Assistant",
    description:
      "Get instant answers to your health queries from our AI chatbot",
  },
  {
    icon: Utensils,
    title: "Meal Planning",
    description:
      "Personalized nutrition recommendations based on your health profile",
  },
  {
    icon: ChartBar,
    title: "Progress Tracking",
    description: "Monitor your health metrics and lifestyle changes over time",
  },
];

const whoGuidelines = [
  {
    icon: Activity,
    title: "Regular Exercise",
    description: "150 minutes of moderate-intensity physical activity per week",
  },
  {
    icon: Utensils,
    title: "Balanced Diet",
    description:
      "Increase fruits, vegetables, and whole grains; reduce processed foods",
  },
  {
    icon: Heart,
    title: "Weight Management",
    description: "Maintain a healthy BMI through diet and exercise",
  },
  {
    icon: Brain,
    title: "Regular Screening",
    description:
      "Get blood sugar levels checked regularly, especially if at risk",
  },
];

const mealPlans = [
  {
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    title: "Healthy Breakfast Bowl",
    calories: "420",
    macros: { Protein: "20g", Carbs: "55g", Fat: "12g" },
  },
  {
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    title: "Balanced Lunch Plate",
    calories: "550",
    macros: { Protein: "30g", Carbs: "65g", Fat: "15g" },
  },
  {
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    title: "Light Dinner Option",
    calories: "380",
    macros: { Protein: "25g", Carbs: "45g", Fat: "10g" },
  },
];

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

const inspirationalQuotes = [
  "Diabetes is not a choice, but we can choose to fight it.",
  "Your health is an investment, not an expense.",
  "Small steps lead to big changes.",
  "Prevention is better than cure.",
  "Take control of your health today for a better tomorrow.",
];

const healthStats = [
  { label: "Global Diabetes Cases", value: "537 million adults (20-79 years)" }, // IDF Diabetes Atlas 2021
  { label: "Annual Healthcare Cost", value: "$966 billion USD" }, // IDF Diabetes Atlas 2021
  {
    label: "Preventable Cases",
    value: "Type 2 diabetes - Up to 80% through lifestyle",
  }, // WHO data
  { label: "Risk Reduction", value: "58% with proper diet and exercise" }, // Diabetes Prevention Program study
  {
    label: "Early Detection Success",
    value: "Up to 70% complications preventable",
  }, // WHO guidelines
];

export default Home;
