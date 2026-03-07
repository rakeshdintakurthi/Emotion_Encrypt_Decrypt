import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TopNav } from './components/TopNav';
import { EncryptPanel } from './components/EncryptPanel';
import { DecryptPanel } from './components/DecryptPanel';
import { Dashboard } from './components/Dashboard';

function App() {
  const [activeTab, setActiveTab] = useState('encrypt');
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || '');
  const [history, setHistory] = useState([]);

  const handleEncrypt = (newResult) => {
    setHistory(prev => [newResult, ...prev].slice(0, 20));
  };

  return (
    <div className="min-h-screen bg-background text-white font-sans relative overflow-x-hidden">
      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="bg-blob w-96 h-96 bg-primary/30" style={{ top: '-5%', left: '-10%' }} />
        <div className="bg-blob w-72 h-72 bg-purple-600/20" style={{ top: '50%', right: '-5%' }} />
        <div className="bg-blob w-64 h-64 bg-accent/10" style={{ bottom: '10%', left: '30%' }} />
        <div className="bg-grid-white absolute inset-0 opacity-100" />
      </div>

      <TopNav currentApiKey={apiKey} setApiKey={setApiKey} />

      {/* Main content */}
      <main className="relative z-10 pt-28 pb-12 px-4 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">

          {/* LEFT: Interaction */}
          <div className="flex flex-col gap-0">
            {/* Page Header */}
            <div className="mb-6">
              <h2 className="font-display font-bold text-3xl text-white tracking-tight leading-tight mb-1">
                Secure Message Vault
              </h2>
              <p className="text-gray-400 text-sm">
                End-to-end encrypted messages powered by AI emotion analysis.
              </p>
            </div>

            {/* Tab toggle */}
            <div className="flex gap-1 p-1 bg-white/5 border border-white/5 rounded-xl mb-4 w-fit">
              {['encrypt', 'decrypt'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-6 py-2 rounded-lg font-semibold text-sm tracking-wide capitalize transition-all duration-200 ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                    }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="tabIndicator"
                      className="absolute inset-0 bg-white/10 border border-white/10 rounded-lg"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>

            {/* Content panels */}
            <AnimatePresence mode="wait">
              {activeTab === 'encrypt' ? (
                <motion.div
                  key="encrypt"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <EncryptPanel apiKey={apiKey} onEncrypt={handleEncrypt} />
                </motion.div>
              ) : (
                <motion.div
                  key="decrypt"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <DecryptPanel />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: Dashboard */}
          <aside className="hidden lg:block">
            <Dashboard history={history} />
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;
