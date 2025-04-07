import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { Activity, Heart, Coffee } from 'lucide-react';

const ReportPdfPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const report = state?.report;
  const pdfRef = useRef();

  if (!report) {
    navigate('/report');
    return null;
  }

  const handleDownload = () => {
    const element = pdfRef.current;
    const opt = {
      margin: [0.5, 0.5, 1, 0.5], // top, left, bottom, right
      filename: 'Health_Report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 3, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="p-12 text-black bg-white max-w-[850px] mx-auto text-sm min-h-screen relative">
      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
      >
        Download PDF
      </button>

      {/* Report Content */}
      <div ref={pdfRef}>
        {/* Header */}
        <div className="border-b-2 border-gray-200 pb-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800">Health Risk Report</h1>
            <div className="text-right">
              <p className="text-sm text-gray-500">Generated on</p>
              <p className="font-medium">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Risk Level Display */}
          <p className="text-xl font-bold text-gray-800 mt-2">
            Risk Level:{' '}
            <span className={`${report.riskLevel === 'high' ? 'text-red-600' : 'text-green-600'}`}>
              {report.riskLevel?.toUpperCase()}
            </span>
          </p>
        </div>

        {/* Medical Metrics Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">Medical Metrics</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(report.medicalMetrics || {}).map(([key, value]) => (
              <div key={key} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">{key}</p>
                <p className="font-semibold text-lg">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lifestyle Metrics Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="text-red-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">Lifestyle Summary</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(report.lifestyleMetrics || {}).map(([key, value]) => (
              <div key={key} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">{key}</p>
                <p className="font-semibold text-lg">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Observations Section - Force Page Break if needed */}
        <div style={{ breakBefore: 'page', pageBreakBefore: 'always' }} className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Coffee className="text-amber-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">Key Observations</h2>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <ul className="space-y-3">
              {report.observations?.map((obs, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="inline-block w-2 h-2 mt-2 rounded-full bg-amber-600"></span>
                  <span className="text-gray-700">{obs}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>This report is generated automatically by Arogya Jyoti's report generation system</p>
          <p>© AROGYA JYOTI</p>
        </div>
      </div>
    </div>
  );
};

export default ReportPdfPage;
