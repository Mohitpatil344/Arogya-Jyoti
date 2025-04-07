import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Activity } from 'lucide-react';
import Home from './pages/Home';
import FormPage from './pages/FormPage';
import LifestylePage from './pages/LifestylePage';
import ReportPage from './pages/ReportPage';
import PlanPage from './pages/PlanPage';
import Reportpdfpage from './pages/Reportpdfpage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
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

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/lifestyle" element={<LifestylePage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/plan" element={<PlanPage />} />
            <Route path="/report-pdf" element={<Reportpdfpage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;