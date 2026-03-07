import React, { useState, useEffect } from 'react';
import { Settings, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export function Header({ setApiKey, currentApiKey }) {
    const [showSettings, setShowSettings] = useState(false);
    const [tempKey, setTempKey] = useState(currentApiKey);

    const handleSave = () => {
        setApiKey(tempKey);
        setShowSettings(false);
    };

    return (
        <header className="w-full flex justify-between items-center mb-10 relative z-10">
            <div className="flex items-center gap-4">
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-white/10 p-3 rounded-xl border border-white/20"
                    style={{ boxShadow: '0 0 15px rgba(255,255,255,0.2)' }}
                >
                    <Lock className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                    <h1 className="text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 text-glitch" data-text="EMOTION CIPHER">
                        EMOTION CIPHER
                    </h1>
                    <p className="text-gray-400 text-sm mt-1 font-medium tracking-wide">
                        Where feelings stay readable, but words stay private
                    </p>
                </div>
            </div>

            <button
                onClick={() => setShowSettings(true)}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                title="API Settings"
            >
                <Settings className="w-6 h-6 text-gray-300" />
            </button>

            {showSettings && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-6 w-full max-w-md relative"
                    >
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Settings className="w-5 h-5" />
                            Settings
                        </h2>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Gemini API Key
                            </label>
                            <input
                                type="password"
                                value={tempKey}
                                onChange={(e) => setTempKey(e.target.value)}
                                placeholder="AIzaSy..."
                                className="w-full p-3 glass-input text-white"
                            />
                            <p className="text-xs text-gray-400 mt-2">
                                Required for emotion detection. Keys are only used locally in your browser.
                            </p>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowSettings(false)}
                                className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors text-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-500 transition-colors text-white"
                            >
                                Save
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </header>
    );
}
