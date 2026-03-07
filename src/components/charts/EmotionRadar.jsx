import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';

const EMOTION_COLORS = {
    Joy: '#FFD700',
    Sadness: '#4A90D9',
    Anger: '#FF4444',
    Fear: '#9B59B6',
    Anxiety: '#FF8C00',
    Excitement: '#00FFD1',
    Love: '#FF69B4',
    Neutral: '#888888',
    Disgust: '#6D8B3A',
    Surprise: '#E91E63',
};

const ALL_EMOTIONS = ['Joy', 'Sadness', 'Anger', 'Fear', 'Anxiety', 'Excitement', 'Love', 'Neutral'];

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-sidebar border border-white/10 rounded-lg px-3 py-2 text-xs text-white shadow-xl">
                <p className="font-semibold">{payload[0]?.payload?.emotion}</p>
                <p className="text-gray-400">{payload[0]?.value}%</p>
            </div>
        );
    }
    return null;
};

export function EmotionRadar({ history }) {
    const aggregated = ALL_EMOTIONS.reduce((acc, emotion) => {
        acc[emotion] = 0;
        return acc;
    }, {});

    let count = 0;
    history.forEach(entry => {
        if (entry.confidence) {
            count++;
            Object.entries(entry.confidence).forEach(([emotion, val]) => {
                if (aggregated[emotion] !== undefined) {
                    aggregated[emotion] += val;
                }
            });
        }
    });

    const data = ALL_EMOTIONS.map(emotion => ({
        emotion,
        value: count > 0 ? Math.round(aggregated[emotion] / count) : 0,
    }));

    const hasData = history.length > 0;

    return (
        <div className="w-full h-64 relative">
            {!hasData && (
                <div className="absolute inset-0 flex items-center justify-center flex-col gap-2 z-10">
                    <div className="text-gray-600 text-sm text-center">
                        Encrypt messages to see<br />your emotion analysis
                    </div>
                </div>
            )}
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data} cx="50%" cy="50%">
                    <PolarGrid stroke="rgba(255,255,255,0.05)" />
                    <PolarAngleAxis
                        dataKey="emotion"
                        tick={{ fill: '#9ca3af', fontSize: 10, fontFamily: 'Inter' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Radar
                        name="Emotion"
                        dataKey="value"
                        stroke="#6366f1"
                        fill="#6366f1"
                        fillOpacity={hasData ? 0.2 : 0.02}
                        strokeWidth={1.5}
                        dot={{ fill: '#6366f1', strokeWidth: 2, r: 3 }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
