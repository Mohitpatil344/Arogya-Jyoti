// src/services/gemini.js
export const getLifestyleSuggestion = async (lifestyleData) => {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Use VITE_ prefix if you're using Vite
  
    const prompt = `Give a short (3-4 lines) doctor-style lifestyle suggestion based on the following inputs:\n\n${JSON.stringify(
      lifestyleData,
      null,
      2
    )}\n\nRespond in a clear, human-readable way.`;
  
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: prompt }]
              }
            ]
          })
        }
      );
  
      const data = await response.json();
      console.log('🧠 Gemini API Raw Response:', data);
  
      const suggestion =
        data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
        'No suggestion available.';
  
      console.log('✅ Parsed Suggestion:', suggestion);
  
      return suggestion;
    } catch (error) {
      console.error('❌ Gemini API Error:', error);
      return 'No suggestion available.';
    }
  };
  