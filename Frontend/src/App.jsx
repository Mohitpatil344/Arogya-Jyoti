import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { Activity } from 'lucide-react';
import Home from './pages/Home';
import FormPage from './pages/FormPage';
import LifestylePage from './pages/LifestylePage';
import ReportPage from './pages/ReportPage';
import PlanPage from './pages/PlanPage';
import Reportpdfpage from './pages/Reportpdfpage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ConsultationPage from "./pages/ConsultationPage";
import Meet from "./pages/Meet"
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

  if (isAuthPage) return children;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ArogyaJyoti</span>
            </div>
            <div className="flex items-center space-x-10">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-600 hover:underline"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/form" element={<Layout><FormPage /></Layout>} />
        <Route path="/lifestyle" element={<Layout><LifestylePage /></Layout>} />
        <Route path="/report" element={<Layout><ReportPage /></Layout>} />
        <Route path="/plan" element={<Layout><PlanPage /></Layout>} />
        <Route path="/report-pdf" element={<Layout><Reportpdfpage /></Layout>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/consultation" element={<Layout><ConsultationPage /></Layout>} />
        <Route path="/meet" element={<Layout><Meet /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
