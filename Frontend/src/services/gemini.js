export const getLifestyleSuggestion = async (lifestyleData) => {
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  
    const prompt = `Give a short (3-4 lines) doctor-style lifestyle suggestion based on the following inputs:\n\n${JSON.stringify(
      lifestyleData,
      null,
      2
    )}\n\nRespond in a clear, human-readable way.`;
  
    try {
      // 🟡 Debug: log prompt
      console.log("📤 Prompt being sent to Gemini:\n", prompt);
  
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=AIzaSyCXCmhDWZfmtm1RFxdZVtmmFawYf2HwiQY`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );
  
      // 🟡 Debug: raw HTTP response status
      console.log("📡 HTTP Response Status:", response.status);
  
      // 🔵 Parse JSON body
      const data = await response.json();
  
      // 🧠 Debug: full response
      console.log("🧠 Full Gemini Response:\n", JSON.stringify(data, null, 2));
  
      // 🟢 Safe extraction of suggestion text
      const suggestion = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  
      if (suggestion && typeof suggestion === "string") {
        const finalSuggestion = suggestion.trim();
        console.log("✅ Final Lifestyle Suggestion:", finalSuggestion);
  
        // Optional: also log to Node terminal if SSR
        if (typeof process !== "undefined" && process.stdout) {
          process.stdout.write(`📝 Gemini Suggestion: ${finalSuggestion}\n`);
        }
  
        return finalSuggestion;
      }
  
      // ⚠️ Handle empty/invalid response
      console.warn("⚠️ Suggestion not found in Gemini response structure.");
      return "No suggestion available.";
    } catch (error) {
      console.error("❌ Error calling Gemini API:", error);
      return "No suggestion available.";
    }
  };
  