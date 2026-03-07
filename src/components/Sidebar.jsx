import React from 'react';
import { Activity, Clock } from 'lucide-react';
import { EMOTION_STYLES } from './EmotionBadge';
import { motion } from 'framer-motion';

export function Sidebar({ history }) {
    const stats = history.reduce((acc, curr) => {
        curr.emotions.forEach(e => {
            const normalized = e.charAt(0).toUpperCase() + e.slice(1).toLowerCase();
            acc[normalized] = (acc[normalized] || 0) + 1;
        });
        return acc;
    }, {});

    return (
        <div className="w-full lg:w-80 flex flex-col gap-6">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-6"
            >
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                    <Activity className="w-5 h-5 text-blue-400" />
                    Session Stats
                </h3>

                {Object.keys(stats).length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No emotions detected yet</p>
                ) : (
                    <div className="space-y-3">
                        {Object.entries(stats).map(([emotion, count]) => {
                            const style = EMOTION_STYLES[emotion] || EMOTION_STYLES.Neutral;
                            const { Icon, color } = style;
                            return (
                                <div key={emotion} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Icon className="w-4 h-4" style={{ color }} />
                                        <span className="text-sm text-gray-300">{emotion}</span>
                                    </div>
                                    <span className="text-sm font-bold text-white bg-white/10 px-2 py-0.5 rounded-md">
                                        {count}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6 flex-1"
            >
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                    <Clock className="w-5 h-5 text-purple-400" />
                    Recent Activity
                </h3>

                <div className="space-y-4">
                    {history.length === 0 ? (
                        <p className="text-sm text-gray-500 italic">No history yet</p>
                    ) : (
                        history.map((item, idx) => (
                            <div key={item.id} className="p-3 bg-black/40 rounded-xl border border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: EMOTION_STYLES[item.emotions[0] || 'Neutral']?.color || '#888' }} />
                                <div className="flex flex-wrap gap-1 mb-2">
                                    {item.emotions.map((em, i) => {
                                        const style = EMOTION_STYLES[em] || EMOTION_STYLES.Neutral;
                                        return (
                                            <span key={i} className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase" style={{ color: style.color, backgroundColor: `${style.color}20` }}>
                                                {em}
                                            </span>
                                        );
                                    })}
                                </div>
                                <p className="text-xs text-gray-400 font-mono truncate" title={item.cipherText}>
                                    {item.cipherText.split('::')[1]}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </motion.div>
        </div>
    );
}
