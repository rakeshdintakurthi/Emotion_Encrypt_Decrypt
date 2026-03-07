import React, { useState, useEffect } from 'react';
import { Key, Unlock, ShieldAlert } from 'lucide-react';
import { EmotionBadge, EMOTION_STYLES } from './EmotionBadge';
import { decryptText } from '../utils/encryption';
import { motion, AnimatePresence } from 'framer-motion';

export function DecryptPanel() {
  const [cipherText, setCipherText] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [displayedText, setDisplayedText] = useState('');

  const dominantEmotion = result?.emotions?.[0] || 'Neutral';
  const glowColor = EMOTION_STYLES[dominantEmotion]?.color || '#888888';

  const handleDecrypt = () => {
    if (!cipherText.trim()) {
      setError("Please paste an encrypted cipher string.");
      return;
    }

    setIsDecrypting(true);
    setError(null);
    setResult(null);
    setDisplayedText('');

    setTimeout(() => {
      const decryptedData = decryptText(cipherText);

      if (decryptedData.error) {
        setError(decryptedData.error);
      } else {
        setResult(decryptedData);
      }
      setIsDecrypting(false);
    }, 800); // Fake delay for animation effect
  };

  // Typewriter effect
  useEffect(() => {
    if (result?.text) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(result.text.slice(0, i));
        i++;
        if (i > result.text.length) {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [result]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-card p-6 flex flex-col gap-6 w-full max-w-2xl mx-auto"
    >
      <div>
        <label className="block text-sm font-semibold tracking-wide text-gray-300 mb-3 uppercase">
          Encrypted Cipher String
        </label>
        <div
          className="relative transition-all duration-500 rounded-xl"
          style={{ boxShadow: result ? `0 0 20px ${glowColor}30` : 'none' }}
        >
          <textarea
            value={cipherText}
            onChange={(e) => setCipherText(e.target.value)}
            placeholder="Paste cipher text here... (e.g., [JOY]::U2FsdGVkX1...)"
            className="w-full h-32 p-4 glass-input font-mono text-green-400 resize-none break-all bg-black/80"
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
            <ShieldAlert className="w-4 h-4" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={handleDecrypt}
        disabled={isDecrypting}
        className="btn-primary py-4 flex items-center justify-center gap-2 w-full relative overflow-hidden group"
        style={{
          background: 'linear-gradient(to right, #9B59B6, #ff69b4)'
        }}
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] animate-[shimmer_2s_infinite] group-hover:animate-[shimmer_1s_infinite]" />

        {isDecrypting ? (
          <>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
              <Key className="w-5 h-5 text-white/70" />
            </motion.div>
            <span>Decrypting...</span>
          </>
        ) : (
          <>
            <Unlock className="w-5 h-5" />
            <span>Decrypt & Reveal</span>
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
                  index={idx}
                />
              ))}
            </div>

            <div className="relative group">
              <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">
                Original Message
              </label>
              <div className="text-lg text-white font-medium min-h-[60px] leading-relaxed">
                {displayedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2 bg-white h-5 ml-1 align-middle"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div >
  );
}
