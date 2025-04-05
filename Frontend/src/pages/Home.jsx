function Home() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Welcome to ArogyaJyoti
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Your personal health companion for diabetes prediction and lifestyle management
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Predict Risk</h2>
          <p className="text-gray-600">
            Get personalized diabetes risk assessment based on your health parameters
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Track Lifestyle</h2>
          <p className="text-gray-600">
            Monitor your daily routine, diet, and physical activities
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Receive Guidance</h2>
          <p className="text-gray-600">
            Get personalized recommendations for a healthier lifestyle
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;