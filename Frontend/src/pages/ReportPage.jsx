import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, CheckCircle } from "lucide-react";
import Button from "../components/Shared/Button";

const ReportPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  const handleGeneratePDF = () => {
    navigate("/report-pdf", { state: { report } });
  };

  useEffect(() => {
    const localReport = localStorage.getItem("report");
    if (!localReport) {
      setError("Report not found. Please complete the assessment first.");
      setLoading(false);
      return;
    }

    try {
      const parsedReport = JSON.parse(localReport);
      setReport(parsedReport);
    } catch (err) {
      setError("Invalid report data.");
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <Button text="Try Again" onClick={() => window.location.reload()} />
      </div>
    );
  }

  const isHighRisk = report?.riskLevel === "high";

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className={`p-6 ${isHighRisk ? "bg-red-50" : "bg-green-50"}`}>
          <div className="flex items-center">
            {isHighRisk ? (
              <AlertTriangle className="h-8 w-8 text-red-600" />
            ) : (
              <CheckCircle className="h-8 w-8 text-green-600" />
            )}
            <h2 className="ml-3 text-2xl font-bold">
              {isHighRisk ? "High Risk of Diabetes" : "Low Risk of Diabetes"}
            </h2>
          </div>
          <div className="mt-6 text-center">
            <h1 className="text-4xl font-bold tracking-tight">
              {isHighRisk ? (
                <span className="text-red-700">Diabetes Predicted</span>
              ) : (
                <span className="text-green-700">No Diabetes</span>
              )}
            </h1>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Medical Metrics</h3>
              <ul className="space-y-2">
                {Object.entries(report?.medicalMetrics || {}).map(
                  ([key, value]) => (
                    <li key={key} className="flex justify-between">
                      <span className="text-gray-600">{key}</span>
                      <span className="font-medium">{value}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Lifestyle Summary</h3>
              <ul className="space-y-2">
                {Object.entries(report?.lifestyleMetrics || {}).map(
                  ([key, value]) => (
                    <li key={key} className="flex justify-between">
                      <span className="text-gray-600">{key}</span>
                      <span className="font-medium">{value}</span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Key Observations</h3>
            <ul className="list-disc pl-5 space-y-2">
              {report?.observations?.map((observation, index) => (
                <li key={index} className="text-gray-700">
                  {observation}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Doctor’s Suggestion</h3>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md text-blue-800">
                <p>
                  {report?.observations?.slice(-1)[0] ||
                    (isHighRisk
                      ? "Based on your metrics, it is recommended to consult a healthcare provider immediately. Maintain a balanced diet, increase physical activity, and monitor your glucose levels regularly."
                      : "Your health indicators look good. Continue maintaining a healthy lifestyle with regular exercise and a balanced diet. Routine checkups are still recommended to stay on track.")}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row md:justify-end gap-4">
            <Button
              text="View Health Plan"
              onClick={() =>
                navigate("/plan", {
                  state: { condition: isHighRisk ? "diabetic" : "non-diabetic" },
                })
              }
            />
            <Button text="Generate Report" onClick={handleGeneratePDF} />
            <Button text="Consultation" onClick={() => navigate("/consultation")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
