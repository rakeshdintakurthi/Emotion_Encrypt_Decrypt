import React from 'react';
import { Smile, Frown, Angry, Ghost, Heart, Meh, Zap, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export const EMOTION_STYLES = {
    Joy: { color: '#FFD700', Icon: Smile },
    Sadness: { color: '#4A90D9', Icon: Frown },
    Anger: { color: '#FF4444', Icon: Angry },
    Fear: { color: '#9B59B6', Icon: Ghost },
    Anxiety: { color: '#FF8C00', Icon: AlertTriangle },
    Excitement: { color: '#00FFD1', Icon: Zap },
    Love: { color: '#FF69B4', Icon: Heart },
    Neutral: { color: '#888888', Icon: Meh },
    Disgust: { color: '#6D8B3A', Icon: Frown },
    Surprise: { color: '#E91E63', Icon: Zap },
};

export function EmotionBadge({ emotion, confidence, index = 0 }) {
    const normalizedEmotion = emotion.charAt(0).toUpperCase() + emotion.slice(1).toLowerCase();
    const style = EMOTION_STYLES[normalizedEmotion] || EMOTION_STYLES.Neutral;
    const { Icon, color } = style;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08, type: 'spring', stiffness: 200, damping: 15 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border transition-all"
            style={{
                color,
                borderColor: `${color}35`,
                backgroundColor: `${color}10`,
            }}
        >
            <Icon className="w-3.5 h-3.5" />
            <span>{normalizedEmotion}</span>
            {confidence && (
                <span className="text-[10px] opacity-60 font-mono font-normal">
                    {confidence}%
                </span>
            )}
        </motion.div>
    );
}
