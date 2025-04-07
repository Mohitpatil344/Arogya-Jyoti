import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, MinusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I\'m your diabetes care assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: input }]);

    // Simulate bot response based on keywords
    const response = generateResponse(input.toLowerCase());
    
    // Add bot response with a slight delay
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text: response }]);
    }, 1000);

    setInput('');
  };

  const generateResponse = (input) => {
    if (input.includes('sugar') || input.includes('glucose')) {
      return "Normal blood sugar levels are less than 100 mg/dL after not eating (fasting) for at least 8 hours. And they're less than 140 mg/dL 2 hours after eating. If you're concerned about your blood sugar levels, please consult a healthcare provider.";
    }
    if (input.includes('exercise') || input.includes('physical activity')) {
      return "Regular physical activity is important for managing diabetes. Aim for at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous activity per week. Always consult your doctor before starting a new exercise routine.";
    }
    if (input.includes('diet') || input.includes('food') || input.includes('eat')) {
      return "A diabetes-friendly diet should include: plenty of non-starchy vegetables, lean proteins, whole grains, and healthy fats. Limit refined carbs and sugary foods. Consider working with a dietitian for personalized advice.";
    }
    if (input.includes('symptoms')) {
      return "Common diabetes symptoms include: increased thirst, frequent urination, extreme hunger, unexplained weight loss, fatigue, blurred vision, and slow-healing sores. If you experience these symptoms, please consult a healthcare provider.";
    }
    return "I can help you with information about diabetes management, including diet, exercise, blood sugar levels, and symptoms. What would you like to know more about?";
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="bg-white rounded-lg shadow-xl w-80 mb-4"
          >
            <div className="p-4 border-b flex justify-between items-center bg-blue-600 text-white rounded-t-lg">
              <h3 className="font-semibold">Diabetes Care Assistant</h3>
              <div className="flex gap-2">
                <button onClick={() => setIsMinimized(true)} className="hover:text-gray-200">
                  <MinusCircle size={20} />
                </button>
                <button onClick={() => setIsOpen(false)} className="hover:text-gray-200">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="h-96 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.type === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSend}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isMinimized && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="bg-blue-600 text-white p-4 rounded-lg shadow-lg mb-4 cursor-pointer"
          onClick={() => setIsMinimized(false)}
        >
          <div className="flex items-center gap-2">
            <MessageCircle size={20} />
            <span>Chat with Diabetes Assistant</span>
          </div>
        </motion.div>
      )}

      {!isOpen && !isMinimized && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle size={24} />
        </motion.button>
      )}
    </div>
  );
};

export default ChatBot;