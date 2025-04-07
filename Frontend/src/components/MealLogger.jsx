import React, { useState, useRef } from 'react';
import { createWorker } from 'tesseract.js';
import { Camera, Upload, Loader2, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';

const MealLogger = () => {
  const [image, setImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [nutritionInfo, setNutritionInfo] = useState(null);
  const fileInputRef = useRef(null);

  const processImage = async (file) => {
    setIsProcessing(true);
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);

      const worker = await createWorker('eng');
      const { data: { text } } = await worker.recognize(file);
      await worker.terminate();

      const mockAnalysis = analyzeFoodText(text);
      setNutritionInfo(mockAnalysis);
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const analyzeFoodText = (text) => {
    const lowerText = text.toLowerCase();
    const hasHighCalorie = lowerText.includes('burger') || lowerText.includes('pizza');
    const hasHighSugar = lowerText.includes('cake') || lowerText.includes('soda');

    return {
      calories: hasHighCalorie ? 500 : 300,
      sugar: hasHighSugar ? 25 : 10,
      category: hasHighCalorie ? 'high-carb' : 'balanced',
    };
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto my-8"
    >
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-blue-50 rounded-full mb-4">
          <Utensils className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Smart Meal Logger</h2>
        <p className="text-gray-600">Upload a photo of your meal for instant nutrition analysis</p>
      </div>

      <div className="space-y-6">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
        />

        {!image && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="space-y-4">
              <div className="flex justify-center gap-4">
                <button
                  onClick={triggerFileInput}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Upload className="w-5 h-5" />
                  Upload Photo
                </button>
                <button
                  onClick={triggerFileInput}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Camera className="w-5 h-5" />
                  Take Photo
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Supported formats: JPG, PNG (max 10MB)
              </p>
            </div>
          </div>
        )}

        {image && (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={image}
                alt="Uploaded meal"
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                onClick={() => {
                  setImage(null);
                  setNutritionInfo(null);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>

            {isProcessing ? (
              <div className="flex items-center justify-center gap-2 p-4">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Analyzing your meal...</span>
              </div>
            ) : nutritionInfo && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <h3 className="text-xl font-semibold mb-4">Nutrition Analysis</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg shadow">
                    <p className="text-gray-600">Calories</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {nutritionInfo.calories}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow">
                    <p className="text-gray-600">Sugar (g)</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {nutritionInfo.sugar}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow">
                    <p className="text-gray-600">Category</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {nutritionInfo.category}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MealLogger;
