import React from 'react';
import InputField from '../Shared/InputField';

const Diet = ({ formData, onChange }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Diet Information</h3>
      <div className="space-y-4">
        <InputField
          label="Daily Calorie Intake (kcal)"
          type="number"
          name="calorieIntake"
          value={formData.calorieIntake}
          onChange={onChange}
          min="0"
          required
        />
        <InputField
          label="Sugar Consumption (grams/day)"
          type="number"
          name="sugarIntake"
          value={formData.sugarIntake}
          onChange={onChange}
          min="0"
          required
        />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Fruit & Vegetable Intake
          </label>
          <select
            name="fruitVegIntake"
            value={formData.fruitVegIntake}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select intake level</option>
            <option value="low">Less than 2 servings/day</option>
            <option value="moderate">2-4 servings/day</option>
            <option value="high">5+ servings/day</option>
          </select>
        </div>
        <InputField
          label="Water Intake (liters/day)"
          type="number"
          name="waterIntake"
          value={formData.waterIntake}
          onChange={onChange}
          step="0.1"
          min="0"
          required
        />
      </div>
    </div>
  );
};

export default Diet;