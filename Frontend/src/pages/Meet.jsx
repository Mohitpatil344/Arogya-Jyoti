import React, { useState } from 'react';
import { InlineWidget } from 'react-calendly';
import { Calendar, Clock, Users, Info, Check } from 'lucide-react';

const Meet = () => {
  const [selectedTab, setSelectedTab] = useState('schedule');
  
  return (
    <div className="flex-1 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-black text-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Calendar className="mr-2" />
                Meeting Options
              </h2>
              
              <div className="space-y-4">
                <button 
                  onClick={() => setSelectedTab('schedule')}
                  className={`w-full text-left py-2 px-3 rounded flex items-center ${selectedTab === 'schedule' ? 'bg-white text-black' : 'hover:bg-gray-800'}`}
                >
                  <Clock className="mr-2" size={18} />
                  Schedule Meeting
                </button>
                
                <button 
                  onClick={() => setSelectedTab('about')}
                  className={`w-full text-left py-2 px-3 rounded flex items-center ${selectedTab === 'about' ? 'bg-white text-black' : 'hover:bg-gray-800'}`}
                >
                  <Info className="mr-2" size={18} />
                  About Meetings
                </button>
                
  
              </div>
            </div>
            
            {/* Contact info */}
            <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3 text-black">Need Help?</h3>
              <p className="text-gray-700 mb-4">If you have any questions about scheduling, please contact our support team.</p>
              <a href="mailto:support@meetsync.com" className="text-black font-medium hover:underline">support@meetsync.com</a>
            </div>
          </div>
          
          {/* Main content */}
          <div className="w-full md:w-3/4">
            {selectedTab === 'schedule' && (
              <div>
                <h1 className="text-3xl font-bold text-black mb-6">Schedule a Meeting with expert doctors for instant diabatic care</h1>
                <p className="text-gray-700 mb-8">Select a time slot that works for you and book your meeting instantly.</p>
                
                <div className="bg-white border border-gray-200 rounded-lg shadow-md">
                  <InlineWidget 
                    url="https://calendly.com/mr-mohitpatil003" 
                    styles={{
                      height: '650px',
                      colorText: '#000000',
                    }}
                  />
                </div>
              </div>
            )}
            
            {selectedTab === 'about' && (
              <div>
                <h1 className="text-3xl font-bold text-black mb-6">About Our Meetings</h1>
                <div className="space-y-6 text-gray-700">
                  <p>Our meeting system is designed to make scheduling and attending meetings as seamless as possible. We use Calendly to manage our scheduling process, ensuring that you can find a time that works for both parties without the back-and-forth emails.</p>
                  
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-black mb-4">Meeting Types</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="text-black mt-1 mr-2 flex-shrink-0" size={18} />
                        <div>
                          <span className="font-medium text-black">Initial Consultation (30 min)</span>
                          <p className="text-sm text-gray-600 mt-1">A brief introduction to discuss your needs and how we can help.</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-black mt-1 mr-2 flex-shrink-0" size={18} />
                        <div>
                          <span className="font-medium text-black">Strategy Session (60 min)</span>
                          <p className="text-sm text-gray-600 mt-1">An in-depth discussion about your project and strategic planning.</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-black mt-1 mr-2 flex-shrink-0" size={18} />
                        <div>
                          <span className="font-medium text-black">Follow-up Meeting (45 min)</span>
                          <p className="text-sm text-gray-600 mt-1">Review progress and discuss next steps for ongoing projects.</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <p>All meetings are conducted via Zoom, and you'll receive a confirmation email with the meeting link after scheduling.</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Meet;