import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { EncryptPanel } from './components/EncryptPanel';
import { DecryptPanel } from './components/DecryptPanel';
import { Sidebar } from './components/Sidebar';

function App() {
  const [activeTab, setActiveTab] = useState('encrypt');
  const [apiKey, setApiKey] = useState('AIzaSyBw-uxcklxuhS_66j40Sw_n8YdYhfw8ZeM');
  const [history, setHistory] = useState([]);

  const handleEncrypt = (newResult) => {
    setHistory(prev => [newResult, ...prev].slice(0, 5));
  };

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        <Header setApiKey={setApiKey} currentApiKey={apiKey} />

        {/* Floating Particles in Background handled via CSS & abstract JS is overkill here, relying on CSS animations for performance */}

        <div className="w-full flex flex-col lg:flex-row gap-8 items-start justify-center">

          <div className="flex-1 w-full max-w-3xl flex flex-col items-center">

            {/* Mode Toggle Switch */}
            <div className="glass-card p-2 rounded-full mb-8 inline-flex items-center gap-2 relative bg-black/40 border border-white/10">
              <motion.div
                layoutId="activeTabGlow"
                className="absolute inset-0 top-2 bottom-2 w-[calc(50%-4px)] rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-md pointer-events-none transition-all duration-300 left-2"
                style={{
                  transform: activeTab === 'decrypt' ? 'translateX(100%)' : 'translateX(0%)'
                }}
              />
              <button
                onClick={() => setActiveTab('encrypt')}
                className={`relative z-10 px-8 py-3 rounded-full font-bold transition-all duration-300 uppercase tracking-wider text-sm ${activeTab === 'encrypt' ? 'text-white' : 'text-gray-400 hover:text-white/80'}`}
              >
                {activeTab === 'encrypt' && (
                  <motion.div layoutId="activeTabBg" className="absolute inset-0 bg-white/10 border border-white/20 rounded-full" />
                )}
                Encrypt
              </button>

              <button
                onClick={() => setActiveTab('decrypt')}
                className={`relative z-10 px-8 py-3 rounded-full font-bold transition-all duration-300 uppercase tracking-wider text-sm ${activeTab === 'decrypt' ? 'text-white' : 'text-gray-400 hover:text-white/80'}`}
              >
                {activeTab === 'decrypt' && (
                  <motion.div layoutId="activeTabBg" className="absolute inset-0 bg-white/10 border border-white/20 rounded-full" />
                )}
                Decrypt
              </button>
            </div>

            {/* Main Content Area */}
            <div className="w-full relative min-h-[500px]">
              <AnimatePresence mode="wait">
                {activeTab === 'encrypt' ? (
                  <motion.div
                    key="encrypt"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full"
                  >
                    <EncryptPanel apiKey={apiKey} onEncrypt={handleEncrypt} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="decrypt"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full"
                  >
                    <DecryptPanel />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          <Sidebar history={history} />

        </div>
      </div>
    </div>
  );
}

export default App;
