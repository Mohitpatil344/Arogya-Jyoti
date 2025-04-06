import React from 'react';

const PhysicalActivity = ({ formData, onChange }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Physical Activity</h3>
      <div className="space-y-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Exercise Frequency
          </label>
          <select
            name="exerciseFrequency"
            value={formData.exerciseFrequency}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select frequency</option>
            <option value="daily">Daily</option>
            <option value="weekly">2-3 times per week</option>
            <option value="rarely">Rarely/Never</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Type of Exercise
          </label>
          <select
            name="exerciseType"
            value={formData.exerciseType}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select type</option>
            <option value="walking">Walking</option>
            <option value="gym">Gym/Weight Training</option>
            <option value="yoga">Yoga</option>
            <option value="sports">Sports</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Daily Screen Time (hours)
          </label>
          <input
            type="number"
            name="screenTime"
            value={formData.screenTime}
            onChange={onChange}
            min="0"
            max="24"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Sitting Hours per Day
          </label>
          <input
            type="number"
            name="sittingHours"
            value={formData.sittingHours}
            onChange={onChange}
            min="0"
            max="24"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PhysicalActivity;