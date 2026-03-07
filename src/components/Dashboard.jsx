import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Clock, Lock } from 'lucide-react';
import { EmotionRadar } from './charts/EmotionRadar';

const EMOTION_COLORS = {
    Joy: '#FFD700', Sadness: '#4A90D9', Anger: '#FF4444',
    Fear: '#9B59B6', Anxiety: '#FF8C00', Excitement: '#00FFD1',
    Love: '#FF69B4', Neutral: '#888888', Disgust: '#6D8B3A', Surprise: '#E91E63',
};

function TimeAgo({ ts }) {
    const diff = Math.floor((Date.now() - ts) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
}

export function Dashboard({ history }) {
    const emotionTotals = {};
    history.forEach(entry => {
        (entry.emotions || []).forEach(e => {
            emotionTotals[e] = (emotionTotals[e] || 0) + 1;
        });
    });

    const topEmotions = Object.entries(emotionTotals)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4);

    const securityScore = Math.min(100, history.length * 12 + 40);

    return (
        <div className="flex flex-col gap-4 w-full">

            {/* Security Status Card */}
            <div className="glass-card p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-accent" />
                        <h3 className="text-sm font-semibold text-gray-300 font-display">Security Status</h3>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${securityScore > 70 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                        {securityScore > 70 ? 'Protected' : 'Basic'}
                    </span>
                </div>

                <div className="flex items-end gap-2 mb-3">
                    <span className="text-4xl font-display font-bold text-white">{securityScore}</span>
                    <span className="text-gray-500 text-sm mb-1">/ 100</span>
                </div>

                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${securityScore}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                </div>
                <p className="text-xs text-gray-500 mt-2">{history.length} message{history.length !== 1 ? 's' : ''} encrypted this session</p>
            </div>

            {/* Emotion Radar Card */}
            <div className="glass-card p-5">
                <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-semibold text-gray-300 font-display">Emotion Analysis</h3>
                </div>
                <EmotionRadar history={history} />
                {topEmotions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {topEmotions.map(([emotion, count]) => (
                            <div
                                key={emotion}
                                className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 border border-white/10"
                            >
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: EMOTION_COLORS[emotion] || '#888' }} />
                                <span className="text-xs text-gray-300">{emotion}</span>
                                <span className="text-xs text-gray-500">{count}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Recent Activity Card */}
            <div className="glass-card p-5">
                <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-accent" />
                    <h3 className="text-sm font-semibold text-gray-300 font-display">Recent Activity</h3>
                </div>

                {history.length === 0 ? (
                    <p className="text-xs text-gray-600 text-center py-4">No activity yet. Start encrypting!</p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {history.slice(0, 4).map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex items-start gap-3 group"
                            >
                                <div className="mt-1 w-6 h-6 flex-shrink-0 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                                    <Lock className="w-3 h-3 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex gap-1 flex-wrap mb-1">
                                        {(item.emotions || []).map((e) => (
                                            <span
                                                key={e}
                                                className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded"
                                                style={{ backgroundColor: `${EMOTION_COLORS[e] || '#888'}20`, color: EMOTION_COLORS[e] || '#888' }}
                                            >
                                                {e}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-600 truncate font-mono">
                                        {item.cipherText ? item.cipherText.slice(0, 32) + '...' : ''}
                                    </p>
                                </div>
                                <span className="text-[10px] text-gray-600 flex-shrink-0">
                                    <TimeAgo ts={item.id} />
                                </span>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
