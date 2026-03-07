# 🎭 EMOTION CIPHER

> "Where feelings stay readable, but words stay private"

## 🎥 Live Demo Video (Hackathon Submission)
**[Link to your Loom/Demo Video Here]** *(Mandatory: Replace this with the URL to your working project video)*

Emotion Cipher is an AI-powered emotion-aware encryption system. It allows users to encrypt private messages using AES while visually preserving the core emotional context (Joy, Sadness, Anger, Fear, Anxiety, Excitement, Love, Neutral) so the overall tone isn't lost in translation.

## ✨ Features

- 🧠 **AI Emotion Detection**: Powered by Gemini API to accurately extract the dominant emotions from written text.
- 🔐 **AES Encryption**: Secure military-grade encryption using crypto-js.
- 🎨 **Premium UI/UX**: Dark cyberpunk theme utilizing Tailwind CSS and Framer Motion for smooth micro-animations.
- 🏷️ **Emotion Tags**: Visible indicators (neon glow colors and icons) that stay intact even when the message is encrypted.
- 📊 **Session Stats**: Sidebar tracks the recent history and counts of encrypted emotions during your session.

## 🛠 Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS, Glassmorphism
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Cryptography**: crypto-js (AES)
- **AI**: Google Gemini API (gemini-2.5-flash)

## 🔏 How Encryption Works

The application uses the detected emotion(s) to generate an encryption key, meaning the cipher text holds the secret, but the tag is readable. 

```text
[ Input Message ] ➔ ( Gemini AI Analysis ) ➔ [ Detected Emotions: JOY+ANXIETY ]
                                                        │
                                                        ▼
                                       ( Generate Key: btoa('JOY+ANXIETY_EMOCIPHER_2025') )
                                                        │
                                                        ▼
[ Original Text ] ➔ ( CryptoJS.AES.encrypt ) ➔ [ Encrypted Cipher Text ]
                                                        │
                                                        ▼
                      [ Final Output: "[JOY+ANXIETY]::U2FsdGVkX1+..." ]
```

## 🚀 How to Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open the app in your browser (usually `http://localhost:5173`).
4. Click the **Settings (Gear) icon** in the top right to input your Google Gemini API key.

## 📝 Sample Inputs / Outputs

**Sample 1:**
- **Input:** "Feeling ecstatic about joining the new AI research team, though a bit anxious about the deadlines ahead."
- **Expected Emotion:** Joy + Anxiety

**Sample 2:**
- **Input:** "I can't believe I failed that test again. I'm so disappointed and frustrated right now."
- **Expected Emotion:** Sadness + Anger

**Sample 3:**
- **Input:** "Finally got the job offer! I'm thrilled and can't wait to start this new journey."
- **Expected Emotion:** Joy + Excitement

