import React, { useState } from 'react';
import { Sparkles, Copy, CheckCircle, Shield, AlertTriangle } from 'lucide-react';
import { EmotionBadge, EMOTION_STYLES } from './EmotionBadge';
import { detectEmotion } from '../utils/api';
import { encryptText } from '../utils/encryption';
import { StrengthMeter } from './StrengthMeter';
import { motion, AnimatePresence } from 'framer-motion';

export function EncryptPanel({ apiKey, onEncrypt }) {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const dominantEmotion = result?.dominant || 'Neutral';
  const glowColor = EMOTION_STYLES[dominantEmotion]?.color || '#6366f1';

  const handleEncrypt = async () => {
    if (!inputText.trim()) {
      setError('Please enter a message to encrypt.');
      return;
    }
    if (!apiKey) {
      setError('Please add your API key in the settings first.');
      return;
    }
    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    try {
      const emotionData = await detectEmotion(inputText, apiKey);
      const encryptedStr = encryptText(inputText, emotionData.emotions || ['Neutral']);
      const newResult = { originalText: inputText, ...emotionData, cipherText: encryptedStr };
      setResult(newResult);
      onEncrypt({ id: Date.now(), ...newResult });
    } catch (err) {
      console.error('Encryption Error:', err);
      setError(err?.message || 'An unknown error occurred.');
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
    <div className="glass-card p-6 flex flex-col gap-5">

      {/* Textarea */}
      <div className="relative">
        <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
          Secret Message
        </label>
        <div
          className="relative rounded-xl transition-all duration-500"
          style={{ boxShadow: result ? `0 0 0 1px ${glowColor}40, 0 0 20px ${glowColor}15` : 'none' }}
        >
          <textarea
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Type a message to encrypt and analyze emotions..."
            className="w-full h-36 p-4 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 text-white resize-none text-sm leading-relaxed transition-all duration-300 placeholder-gray-600"
          />
          {/* Live char count */}
          <span className="absolute bottom-3 right-3 text-xs text-gray-600">
            {inputText.length} chars
          </span>
        </div>
      </div>

      {/* Strength meter (live) */}
      <StrengthMeter text={inputText} emotions={result?.emotions} />

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2.5 text-sm text-red-400 bg-red-900/10 px-4 py-3 rounded-xl border border-red-500/20"
          >
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Button */}
      <button
        onClick={handleEncrypt}
        disabled={isAnalyzing}
        className="btn-primary py-4 flex items-center justify-center gap-2.5 w-full text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {/* Shimmer overlay */}
        {!isAnalyzing && (
          <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        )}
        {isAnalyzing ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            <span>Analyzing emotions...</span>
          </>
        ) : (
          <>
            <Shield className="w-4 h-4" />
            <span>Encrypt & Analyze</span>
          </>
        )}
      </button>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex flex-col gap-4"
          >
            {/* Emotion badges */}
            <div className="flex flex-wrap gap-2">
              {result.emotions.map((emp, idx) => (
                <EmotionBadge key={idx} emotion={emp} confidence={result.confidence?.[emp]} index={idx} />
              ))}
            </div>

            {/* Cipher output */}
            <div className="relative group">
              <label className="text-xs uppercase tracking-widest text-gray-500 mb-2 block font-semibold">
                Encrypted Output
              </label>
              <div className="font-mono text-xs text-emerald-400 bg-black/60 p-4 rounded-xl border border-emerald-500/20 break-all pr-12 leading-relaxed">
                {result.cipherText}
              </div>
              <button
                onClick={handleCopy}
                className="absolute right-3 top-9 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white border border-white/10"
                title="Copy"
              >
                {copied ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
