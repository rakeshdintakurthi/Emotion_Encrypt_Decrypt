import React from 'react';
import { motion } from 'framer-motion';

export function StrengthMeter({ text, emotions }) {

  const calculateStrength = () => {
    if (!text || text.length === 0) return 0;
    let score = 20;
    if (text.length > 50) score += 30;
    else if (text.length > 10) score += 15;
    if (emotions && emotions.length > 1) {
      score += (emotions.length * 15);
    }
    return Math.min(100, score);
  };

  const strength = calculateStrength();

  const getStrengthColorText = (val) => {
    if (val < 40) return 'text-red-400';
    if (val < 70) return 'text-yellow-400';
    return 'text-emerald-400';
  };

  const getStrengthColorBg = (val) => {
    if (val < 40) return 'bg-red-400';
    if (val < 70) return 'bg-yellow-400';
    return 'bg-emerald-400';
  };

  const getStrengthLabel = (val) => {
    if (val === 0) return 'Awaiting Input';
    if (val < 40) return 'Weak';
    if (val < 70) return 'Moderate';
    if (val < 100) return 'Strong';
    return 'Military Grade';
  };

  return (
    <div className="w-full mt-2">
      <div className="flex justify-between items-end mb-2">
        <label className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
          Encryption Strength
        </label>
        <span className={'text-xs font-bold uppercase tracking-widest ' + getStrengthColorText(strength)}>
          {getStrengthLabel(strength)}
        </span>
      </div>

      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
        <motion.div
          className={'h-full rounded-full ' + getStrengthColorBg(strength)}
          initial={{ width: 0 }}
          animate={{ width: strength + '%' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
