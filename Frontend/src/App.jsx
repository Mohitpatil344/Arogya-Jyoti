import React, { useState } from 'react';
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
import ProfileModal from './components/Profile/ProfileModel';
import ChatBot from './components/Chat/ChatBot';
import Navbar from './components/Shared/Navbar';
import DoctorAvailability from './pages/DoctorAvailability';

// Layout component
const Layout = ({ children, isProfileOpen, setIsProfileOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const noNavRoutes = ['/login', '/register'];
  const isAuthPage = noNavRoutes.includes(location.pathname);
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAuthPage && (
        <Navbar
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          setIsProfileOpen={setIsProfileOpen}
        />
      )}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

// Wrapper to use hooks in Layout with Routes
const LayoutWithProps = (props) => {
  const { isProfileOpen, setIsProfileOpen, children } = props;
  return (
    <Layout isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen}>
      {children}
    </Layout>
  );
};

function App() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<LayoutWithProps isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen}><Home /></LayoutWithProps>} />
          <Route path="/form" element={<LayoutWithProps isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen}><FormPage /></LayoutWithProps>} />
          <Route path="/lifestyle" element={<LayoutWithProps isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen}><LifestylePage /></LayoutWithProps>} />
          <Route path="/report" element={<LayoutWithProps isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen}><ReportPage /></LayoutWithProps>} />
          <Route path="/plan" element={<LayoutWithProps isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen}><PlanPage /></LayoutWithProps>} />
          <Route path="/report-pdf" element={<LayoutWithProps isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen}><Reportpdfpage /></LayoutWithProps>} />
          <Route path="/consultation" element={<LayoutWithProps isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen}><ConsultationPage /></LayoutWithProps>} />
          <Route path="/meet" element={<LayoutWithProps isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen}><Meet /></LayoutWithProps>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<LayoutWithProps isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen}><ProfileModal /></LayoutWithProps>} />
          <Route path="/doctor-availability" element={<LayoutWithProps isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen}><DoctorAvailability /></LayoutWithProps>} />
        
        </Routes>
        <ChatBot />
        <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      </div>
    </Router>
  );
}

export default App;
