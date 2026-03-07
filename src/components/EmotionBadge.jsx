import React from 'react';
import { Smile, Frown, Angry, Ghost, Heart, Meh, Zap, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export const EMOTION_STYLES = {
    Joy: { color: '#FFD700', bg: 'bg-[#FFD700]/10', border: 'border-[#FFD700]/30', shadow: '#FFD700', Icon: Smile },
    Sadness: { color: '#4A90D9', bg: 'bg-[#4A90D9]/10', border: 'border-[#4A90D9]/30', shadow: '#4A90D9', Icon: Frown },
    Anger: { color: '#FF4444', bg: 'bg-[#FF4444]/10', border: 'border-[#FF4444]/30', shadow: '#FF4444', Icon: Angry },
    Fear: { color: '#9B59B6', bg: 'bg-[#9B59B6]/10', border: 'border-[#9B59B6]/30', shadow: '#9B59B6', Icon: Ghost },
    Anxiety: { color: '#FF8C00', bg: 'bg-[#FF8C00]/10', border: 'border-[#FF8C00]/30', shadow: '#FF8C00', Icon: AlertTriangle },
    Excitement: { color: '#00FFD1', bg: 'bg-[#00FFD1]/10', border: 'border-[#00FFD1]/30', shadow: '#00FFD1', Icon: Zap },
    Love: { color: '#FF69B4', bg: 'bg-[#FF69B4]/10', border: 'border-[#FF69B4]/30', shadow: '#FF69B4', Icon: Heart },
    Neutral: { color: '#888888', bg: 'bg-[#888888]/10', border: 'border-[#888888]/30', shadow: '#888888', Icon: Meh }
};

export function EmotionBadge({ emotion, confidence, index = 0 }) {
    const normalizedEmotion = emotion.charAt(0).toUpperCase() + emotion.slice(1).toLowerCase();
    const style = EMOTION_STYLES[normalizedEmotion] || EMOTION_STYLES.Neutral;
    const { Icon, color, bg, border, shadow } = style;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${bg} ${border} transition-all duration-300`}
            style={{ boxShadow: `0 0 10px ${shadow}4d` }}
        >
            <Icon className="w-4 h-4" style={{ color }} />
            <span className="text-sm font-semibold tracking-wide" style={{ color }}>
                {normalizedEmotion.toUpperCase()}
            </span>
            {confidence && (
                <span className="text-xs text-white/50 ml-1 font-mono">
                    {confidence}%
                </span>
            )}
        </motion.div>
    );
}
