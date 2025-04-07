import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import Home from './pages/Home';
import FormPage from './pages/FormPage';
import LifestylePage from './pages/LifestylePage';
import ReportPage from './pages/ReportPage';
import PlanPage from './pages/PlanPage';
import Reportpdfpage from './pages/Reportpdfpage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ConsultationPage from './pages/ConsultationPage';
import Meet from './pages/Meet';

import ChatBot from './components/Chat/ChatBot';
import Navbar from './components/Shared/Navbar';

import { Activity } from 'lucide-react'; // ✅ Icon import

// Layout component with conditional Navbar and logout handling
const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const noNavRoutes = ['/login', '/register'];
  const isAuthPage = noNavRoutes.includes(location.pathname);
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAuthPage && (
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      )}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

// Main App component with routing
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* App-level static header (optional) */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Activity className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">ArogyaJyoti</span>
              </div>
            </div>
          </div>
        </nav>

        {/* App routes */}
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/form" element={<Layout><FormPage /></Layout>} />
          <Route path="/lifestyle" element={<Layout><LifestylePage /></Layout>} />
          <Route path="/report" element={<Layout><ReportPage /></Layout>} />
          <Route path="/plan" element={<Layout><PlanPage /></Layout>} />
          <Route path="/report-pdf" element={<Layout><Reportpdfpage /></Layout>} />
          <Route path="/consultation" element={<Layout><ConsultationPage /></Layout>} />
          <Route path="/meet" element={<Layout><Meet /></Layout>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>

        {/* Persistent ChatBot */}
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;
