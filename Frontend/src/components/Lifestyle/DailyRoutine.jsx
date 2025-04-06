import React from 'react';
import InputField from '../Shared/InputField';

const DailyRoutine = ({ formData, onChange }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Daily Routine</h3>
      <div className="space-y-4">
        <InputField
          label="Sleep Hours (per day)"
          type="number"
          name="sleepHours"
          value={formData.sleepHours}
          onChange={onChange}
          min="0"
          max="24"
          required
        />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Work/Study Schedule
          </label>
          <select
            name="workSchedule"
            value={formData.workSchedule}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select schedule</option>
            <option value="regular">Regular (9-5)</option>
            <option value="flexible">Flexible Hours</option>
            <option value="shifts">Shift Work</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Stress Level
          </label>
          <select
            name="stressLevel"
            value={formData.stressLevel}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select stress level</option>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DailyRoutine;