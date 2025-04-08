import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Activity, Apple, Moon, Heart, ClipboardList } from "lucide-react";
import axios from "axios";

const PlanPage = () => {
  const { state } = useLocation();
  const condition = state?.condition || "non-diabetic";

  const [plans, setPlans] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/report/ai-generate",
          {
            lifestyle_data:
              "Age: 28, Height: 170cm, Weight: 68kg, Sleep: 7 hours, Exercise: 3 times a week, Diet: Non-Vegetarian, Smoking: No, Alcohol: Occasionally, Medical Conditions: None",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const structured = response.data.generated_report;

        const dietList = [];

        if (structured.diet_recommendations) {
          const { general, hydration, micronutrients, macronutrients, recommendations } =
            structured.diet_recommendations;

          if (general) dietList.push(general);
          if (hydration) dietList.push(hydration);
          if (micronutrients) dietList.push(micronutrients);

          if (macronutrients) {
            dietList.push(...Object.values(macronutrients));
          }

          if (Array.isArray(recommendations)) {
            recommendations.forEach((rec) => {
              if (typeof rec === "string") {
                dietList.push(rec);
              } else if (rec.notes || rec.category) {
                const title = rec.category ? `${rec.category}:` : "";
                const notes = rec.notes || "";
                const sources = Array.isArray(rec.sources)
                  ? rec.sources.join(", ")
                  : "";
                dietList.push(`${title} ${notes} ${sources && "- " + sources}`);
              }
            });
          }
        }

        const goalList = [];
        if (structured.goals) {
          if (Array.isArray(structured.goals.short_term))
            goalList.push(...structured.goals.short_term);
          if (Array.isArray(structured.goals.long_term))
            goalList.push(...structured.goals.long_term);
          if (Array.isArray(structured.goals.example_goals))
            goalList.push(...structured.goals.example_goals);
          if (structured.goals.personalize)
            goalList.push(structured.goals.personalize);
        }

        setPlans((prev) => ({
          ...prev,
          [condition]: {
            exercise: structured.exercise_plan?.recommendations || [],
            diet: dietList,
            lifestyle: Object.values(structured.lifestyle?.recommendations || structured.lifestyle || {}),
            goals: goalList,
            nextSteps: Array.isArray(structured.next_steps)
              ? structured.next_steps
              : [],
            overview: structured.overview || {},
            disclaimer: structured.disclaimer || {},
          },
        }));
      } catch (error) {
        console.error("Failed to fetch plan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [condition]);

  const plan = plans[condition];

  const categories = [
    { icon: Activity, title: "Exercise Plan", key: "exercise" },
    { icon: Apple, title: "Diet Recommendations", key: "diet" },
    { icon: Moon, title: "Lifestyle Changes", key: "lifestyle" },
    { icon: Heart, title: "Health Goals", key: "goals" },
  ];

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Loading your health plan...
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="text-center mt-10 text-red-500">
        No plan found for this condition.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Your {condition === "diabetic" ? "Diabetic" : "Personalized"} Health Plan
      </h2>

      {plan.overview?.title && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-2">{plan.overview.title}</h3>
          <p className="text-gray-700 mb-2">{plan.overview.introduction}</p>
          <p className="text-gray-600 italic">{plan.overview.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(({ icon: Icon, title, key }) => (
          <div key={key} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center mb-4">
              <Icon className="h-6 w-6 text-blue-600" />
              <h3 className="ml-2 text-xl font-semibold">{title}</h3>
            </div>

            {Array.isArray(plan[key]) && plan[key].length > 0 ? (
              <ul className="space-y-3">
                {plan[key].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-gray-700">
                      {typeof item === "string"
                        ? item
                        : JSON.stringify(item, null, 2)}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No data available.</p>
            )}
          </div>
        ))}
      </div>

      {plan.nextSteps && plan.nextSteps.length > 0 && (
        <div className="mt-8 bg-blue-100 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <ClipboardList className="w-5 h-5 mr-2" />
            Next Steps
          </h3> 
          <ul className="space-y-3">
            {plan.nextSteps.map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="font-bold mr-2">{index + 1}.</span>
                <span className="text-gray-700">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {plan.disclaimer?.text && (
        <div className="mt-8 p-4 border-l-4 border-yellow-400 bg-yellow-50 rounded">
          <strong className="block text-yellow-800 mb-1">
            {plan.disclaimer.title || "Disclaimer"}
          </strong>
          <p className="text-yellow-700 text-sm">{plan.disclaimer.text}</p>
        </div>
      )}
    </div>
  );
};

export default PlanPage;
