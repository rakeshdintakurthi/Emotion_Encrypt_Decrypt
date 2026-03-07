import React, { useState } from 'react';
import { Sparkles, Copy, CheckCircle, Shield } from 'lucide-react';
import { EmotionBadge, EMOTION_STYLES } from './EmotionBadge';
import { detectEmotion } from '../utils/api';
import { encryptText } from '../utils/encryption';
import { motion, AnimatePresence } from 'framer-motion';

export function EncryptPanel({ apiKey, onEncrypt }) {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const dominantEmotion = result?.dominant || 'Neutral';
  const glowColor = EMOTION_STYLES[dominantEmotion]?.color || '#888888';

  const handleEncrypt = async () => {
    if (!inputText.trim()) {
      setError("Please enter a message to encrypt.");
      return;
    }

    if (!apiKey) {
      setError("Please add your Claude API key in the settings first.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const emotionData = await detectEmotion(inputText, apiKey);
      const encryptedStr = encryptText(inputText, emotionData.emotions || ['Neutral']);

      const newResult = {
        originalText: inputText,
        ...emotionData,
        cipherText: encryptedStr
      };

      setResult(newResult);
      onEncrypt({ id: Date.now(), ...newResult });
    } catch (err) {
      console.error("Encryption Process Error:", err);
      setError(err?.message || "An unknown error occurred during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = () => {
    if (result?.cipherText) {
      navigator.clipboard.writeText(result.cipherText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-card p-6 flex flex-col gap-6 w-full max-w-2xl mx-auto"
    >
      <div>
        <label className="block text-sm font-semibold tracking-wide text-gray-300 mb-3 uppercase">
          Secret Message
        </label>
        <div
          className="relative transition-all duration-500 rounded-xl"
          style={{ boxShadow: result ? `0 0 20px ${glowColor}30` : 'none' }}
        >
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message to hide... (e.g., I'm so excited about the new project!)"
            className="w-full h-32 p-4 glass-input text-white resize-none"
            style={{
              borderColor: result ? `${glowColor}50` : 'rgba(255,255,255,0.1)',
            }}
          />
          {result && (
            <div className="absolute top-0 left-0 w-1 h-full rounded-l-xl transition-all duration-500" style={{ backgroundColor: glowColor }} />
          )}
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-500/20 flex items-center gap-2"
          >
            <Shield className="w-4 h-4" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleEncrypt}
        disabled={isAnalyzing}
        className="btn-primary py-4 flex items-center justify-center gap-2 w-full relative overflow-hidden group"
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] animate-[shimmer_2s_infinite] group-hover:animate-[shimmer_1s_infinite]" />

        {isAnalyzing ? (
          <>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
              <Sparkles className="w-5 h-5 text-white/70" />
            </motion.div>
            <span>Analyzing Emotions...</span>
          </>
        ) : (
          <>
            <Shield className="w-5 h-5" />
            <span>Encrypt & Analyze</span>
          </>
        )}
      </button>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 p-5 rounded-xl bg-black/60 border border-white/10 relative overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 mb-6">
              {result.emotions.map((emp, idx) => (
                <EmotionBadge
                  key={idx}
                  emotion={emp}
                  confidence={result.confidence?.[emp]}
                  index={idx}
                />
              ))}
            </div>

            <div className="relative group">
              <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">
                Encrypted Cipher String
              </label>
              <div className="font-mono text-sm text-green-400 bg-black/80 p-4 rounded-lg border border-green-500/20 break-all pr-12">
                {result.cipherText}
              </div>

              <button
                onClick={handleCopy}
                className="absolute right-2 top-8 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                title="Copy to clipboard"
              >
                {copied ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div >
  );
}
