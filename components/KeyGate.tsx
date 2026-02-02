
import React from 'react';

interface KeyGateProps {
  onSelectKey: () => void;
}

const KeyGate: React.FC<KeyGateProps> = ({ onSelectKey }) => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 text-center space-y-8">
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-purple-500/20">
        <svg viewBox="0 0 24 24" className="w-10 h-10 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
        </svg>
      </div>
      
      <div className="space-y-4 max-w-sm">
        <h1 className="text-3xl font-bold gradient-text">VibePaper AI</h1>
        <p className="text-white/60 text-sm leading-relaxed">
          To generate high-quality 4K wallpapers using Gemini 3 Pro, you must select an API key from a paid project.
        </p>
      </div>

      <div className="space-y-4 w-full max-w-xs">
        <button
          onClick={onSelectKey}
          className="w-full py-4 bg-white text-black rounded-2xl font-bold shadow-xl active:scale-95 transition-all"
        >
          Select API Key
        </button>
        <a 
          href="https://ai.google.dev/gemini-api/docs/billing" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block text-xs text-blue-400 hover:underline"
        >
          Learn about API Billing
        </a>
      </div>

      <div className="absolute bottom-8 text-[10px] text-white/20 font-medium uppercase tracking-[0.3em]">
        Secured by Google AI Studio
      </div>
    </div>
  );
};

export default KeyGate;
