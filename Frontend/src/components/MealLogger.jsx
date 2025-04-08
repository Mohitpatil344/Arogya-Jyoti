import React, { useState, useRef } from 'react';
import { Camera, Upload, Loader2, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';

const foodCategories = [
  {
    name: 'healthy-meal',
    calories: { min: 300, max: 500 },
    protein: { min: 20, max: 30 },
    carbs: { min: 30, max: 45 },
    fat: { min: 10, max: 20 }
  },
  {
    name: 'fast-food',
    calories: { min: 600, max: 1200 },
    protein: { min: 15, max: 25 },
    carbs: { min: 60, max: 90 },
    fat: { min: 25, max: 45 }
  },
  {
    name: 'dessert',
    calories: { min: 250, max: 450 },
    protein: { min: 3, max: 8 },
    carbs: { min: 40, max: 60 },
    fat: { min: 12, max: 25 }
  },
  {
    name: 'salad',
    calories: { min: 150, max: 300 },
    protein: { min: 8, max: 15 },
    carbs: { min: 15, max: 25 },
    fat: { min: 8, max: 15 }
  },
  {
    name: 'protein-rich',
    calories: { min: 400, max: 600 },
    protein: { min: 35, max: 50 },
    carbs: { min: 20, max: 35 },
    fat: { min: 15, max: 25 }
  }
];

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const MealLogger = () => {
  const [images, setImages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const analyzeFoodImage = () => {
    const category = foodCategories[Math.floor(Math.random() * foodCategories.length)];

    return {
      category: category.name,
      calories: getRandomNumber(category.calories.min, category.calories.max),
      protein: getRandomNumber(category.protein.min, category.protein.max),
      carbs: getRandomNumber(category.carbs.min, category.carbs.max),
      fat: getRandomNumber(category.fat.min, category.fat.max)
    };
  };

  const processImages = async (files) => {
    setIsProcessing(true);
    try {
      const newImages = await Promise.all(
        Array.from(files).map(
          (file) =>
            new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                resolve({
                  url: reader.result,
                  analysis: analyzeFoodImage()
                });
              };
              reader.readAsDataURL(file);
            })
        )
      );

      setImages([...images, ...newImages]);
    } catch (error) {
      console.error('Error processing images:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      processImages(files);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto my-8"
    >
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-blue-50 rounded-full mb-4">
          <Utensils className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Smart Meal Logger</h2>
        <p className="text-gray-600">Upload multiple meal photos for instant nutrition analysis</p>
      </div>

      <div className="space-y-6">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          multiple
          className="hidden"
        />

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="space-y-4">
            <div className="flex justify-center gap-4">
              <button
                onClick={triggerFileInput}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Upload className="w-5 h-5" />
                Upload Photos
              </button>
              <button
                onClick={triggerFileInput}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Camera className="w-5 h-5" />
                Take Photos
              </button>
            </div>
            <p className="text-sm text-gray-500">
              Supported formats: JPG, PNG (max 10MB) - Upload multiple images at once!
            </p>
          </div>
        </div>

        {isProcessing && (
          <div className="flex items-center justify-center gap-2 p-4">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Analyzing your meals...</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-50 rounded-lg overflow-hidden"
            >
              <div className="relative">
                <img
                  src={image.url}
                  alt={`Meal ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-3">
                  Meal {index + 1} -{' '}
                  {image.analysis.category
                    .replace('-', ' ')
                    .split(' ')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-lg shadow">
                    <p className="text-gray-600">Calories</p>
                    <p className="text-xl font-bold text-blue-600">{image.analysis.calories}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow">
                    <p className="text-gray-600">Protein (g)</p>
                    <p className="text-xl font-bold text-blue-600">{image.analysis.protein}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow">
                    <p className="text-gray-600">Carbs (g)</p>
                    <p className="text-xl font-bold text-blue-600">{image.analysis.carbs}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow">
                    <p className="text-gray-600">Fat (g)</p>
                    <p className="text-xl font-bold text-blue-600">{image.analysis.fat}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MealLogger;
