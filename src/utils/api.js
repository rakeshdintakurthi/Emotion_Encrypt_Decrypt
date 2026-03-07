export async function detectEmotion(text, apiKey) {
    if (!apiKey) {
        throw new Error("Missing API Key");
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: `You are an emotion detection AI. Analyze the emotional tone of the given text. Respond ONLY in JSON: {"emotions": ["Joy", "Anxiety"], "confidence": {"Joy": 85, "Anxiety": 60}, "dominant": "Joy"}. Detect up to 3 emotions from: Joy, Sadness, Anger, Fear, Anxiety, Excitement, Disgust, Surprise, Love, Neutral.\n\nText to analyze: "${text}"`
                }]
            }],
            generationConfig: {
                responseMimeType: "application/json"
            }
        })
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error("API Error Details:", response.status, errorBody);

        let errorMessage = response.statusText;
        try {
            const parsed = JSON.parse(errorBody);
            if (parsed.error && parsed.error.message) {
                errorMessage = parsed.error.message;
            }
        } catch (e) {
            // ignore JSON parse error
        }

        throw new Error(errorMessage || "Bad Request");
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
        throw new Error("No content returned from Gemini API");
    }

    try {
        // Find the JSON part within the block if the model included extra text
        const jsonStart = content.indexOf('{');
        const jsonEnd = content.lastIndexOf('}');
        if (jsonStart === -1 || jsonEnd === -1) {
            throw new Error("Could not find JSON in response");
        }
        const jsonString = content.substring(jsonStart, jsonEnd + 1);
        return JSON.parse(jsonString);
    } catch (e) {
        console.error("Failed to parse JSON from Gemini:", content);
        throw new Error("Failed to parse emotion data from API");
    }
}
