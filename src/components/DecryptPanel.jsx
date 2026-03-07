import React, { useState, useEffect } from 'react';
import { Key, Unlock, AlertTriangle } from 'lucide-react';
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
  const glowColor = EMOTION_STYLES[dominantEmotion]?.color || '#6366f1';

  const handleDecrypt = () => {
    if (!cipherText.trim()) {
      setError('Please paste an encrypted cipher string.');
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
    }, 800);
  };

  // Typewriter effect
  useEffect(() => {
    if (result?.text) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(result.text.slice(0, i));
        i++;
        if (i > result.text.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [result]);

  return (
    <div className="glass-card p-6 flex flex-col gap-5">
      {/* Cipher input */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
          Encrypted Cipher String
        </label>
        <div
          className="relative rounded-xl transition-all duration-500"
          style={{ boxShadow: result ? `0 0 0 1px ${glowColor}40, 0 0 20px ${glowColor}15` : 'none' }}
        >
          <textarea
            value={cipherText}
            onChange={(e) => { setCipherText(e.target.value); if (error) setError(null); }}
            placeholder="Paste cipher text here... [JOY+EXCITEMENT]::U2FsdGVkX1..."
            className="w-full h-36 p-4 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 font-mono text-emerald-400 resize-none text-xs leading-relaxed placeholder-gray-700 transition-all duration-300"
          />
        </div>
      </div>

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

      {/* Decrypt button */}
      <button
        onClick={handleDecrypt}
        disabled={isDecrypting}
        className="btn-primary py-4 flex items-center justify-center gap-2.5 w-full text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: 'linear-gradient(to right, #7c3aed, #a855f7)' }}
      >
        {isDecrypting ? (
          <>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
              <Key className="w-4 h-4" />
            </motion.div>
            <span>Decrypting...</span>
          </>
        ) : (
          <>
            <Unlock className="w-4 h-4" />
            <span>Decrypt & Reveal</span>
          </>
        )}
      </button>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-wrap gap-2">
              {result.emotions.map((emp, idx) => (
                <EmotionBadge key={idx} emotion={emp} index={idx} />
              ))}
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-gray-500 mb-3 block font-semibold">
                Decrypted Message
              </label>
              <div
                className="p-5 rounded-xl border text-base font-medium leading-relaxed min-h-[80px] relative"
                style={{ borderColor: `${glowColor}30`, backgroundColor: `${glowColor}08` }}
              >
                {displayedText}
                {displayedText.length < (result?.text?.length || 0) && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.7 }}
                    className="inline-block w-0.5 h-5 bg-white ml-0.5 align-middle"
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
