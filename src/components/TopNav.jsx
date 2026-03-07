import React, { useState } from 'react';
import { Settings, User, Shield, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function TopNav({ currentApiKey, setApiKey }) {
    const [showSettings, setShowSettings] = useState(false);
    const [tempKey, setTempKey] = useState(currentApiKey);

    const handleSave = () => {
        setApiKey(tempKey);
        setShowSettings(false);
    };

    return (
        <>
            <nav className="w-full fixed top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5 h-20 flex items-center justify-between px-6 lg:px-12">
                <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent p-[1px]">
                        <div className="w-full h-full bg-background rounded-[11px] flex items-center justify-center">
                            <Shield className="w-5 h-5 text-accent" />
                        </div>
                    </div>
                    <div>
                        <h1 className="font-display font-bold text-xl tracking-tight text-white group-hover:text-accent transition-colors">
                            Emotion Cipher
                        </h1>
                        <p className="text-xs text-gray-400 font-medium">Enterprise Security</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowSettings(true)}
                        className="p-2.5 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                    >
                        <Settings className="w-5 h-5" />
                    </button>
                    <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden cursor-pointer hover:border-accent/50 transition-colors">
                        <div className="w-full h-full bg-sidebar flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {showSettings && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-sidebar border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl shadow-primary/10 relative"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Key className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-display font-bold text-white">API Configuration</h3>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Gemini API Key
                                </label>
                                <input
                                    type="password"
                                    value={tempKey}
                                    onChange={(e) => setTempKey(e.target.value)}
                                    placeholder="AIzaSy..."
                                    className="w-full p-3 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-white transition-all"
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    Required for emotion detection. Keys are encrypted and stored locally.
                                </p>
                            </div>

                            <div className="flex gap-3 justify-end">
                                <button
                                    onClick={() => setShowSettings(false)}
                                    className="px-5 py-2.5 rounded-xl font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-5 py-2.5 rounded-xl font-medium bg-primary hover:bg-primary-hover text-white transition-colors border border-white/10"
                                >
                                    Save Key
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
