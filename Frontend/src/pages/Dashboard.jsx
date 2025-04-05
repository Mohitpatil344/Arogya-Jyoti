import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Health Assessment Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Health Assessment</h2>
          <p className="text-gray-600 mb-4">Complete your health assessment to get personalized recommendations.</p>
          <Link 
            to="/health-form" 
            className="inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
          >
            Start Assessment
          </Link>
        </div>

        {/* Lifestyle Tracking Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Lifestyle Tracking</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Daily Steps</span>
              <span className="font-medium">Not tracked yet</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Water Intake</span>
              <span className="font-medium">Not tracked yet</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Sleep Hours</span>
              <span className="font-medium">Not tracked yet</span>
            </div>
          </div>
        </div>

        {/* Health Reports Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Health Reports</h2>
          <p className="text-gray-600 mb-4">View your health reports and track your progress.</p>
          <Link 
            to="/report" 
            className="inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
          >
            View Reports
          </Link>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              Update Profile
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              Log Daily Activity
            </button>
            <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              Set Reminders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;