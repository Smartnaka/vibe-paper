
import React from 'react';
import { AppStatus, WallpaperVariation } from '../types';

interface PromptAreaProps {
  prompt: string;
  setPrompt: (v: string) => void;
  onGenerate: () => void;
  status: AppStatus;
  referenceImage: WallpaperVariation | null;
  onClearReference: () => void;
}

const PromptArea: React.FC<PromptAreaProps> = ({ 
  prompt, setPrompt, onGenerate, status, referenceImage, onClearReference 
}) => {
  const isGenerating = status === AppStatus.GENERATING;

  return (
    <div className="space-y-4">
      <div className="relative group">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your desired vibe... (e.g. Rainy cyberpunk lo-fi street)"
          className="w-full bg-[#111] border border-white/10 rounded-2xl p-5 pt-6 min-h-[140px] focus:outline-none focus:border-blue-500/50 transition-all text-lg resize-none placeholder:text-white/20"
          disabled={isGenerating}
        />
        
        {referenceImage && (
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-1 pr-3">
            <img 
              src={referenceImage.url} 
              alt="Ref" 
              className="w-10 h-10 object-cover rounded" 
            />
            <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Remixing</span>
            <button 
              onClick={onClearReference}
              className="ml-2 text-white/40 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>

      <button
        onClick={onGenerate}
        disabled={isGenerating || !prompt.trim()}
        className={`w-full py-5 rounded-2xl font-bold text-lg transition-all active:scale-95 flex items-center justify-center gap-3 ${
          isGenerating 
            ? 'bg-white/5 text-white/20 cursor-not-allowed' 
            : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-xl shadow-purple-600/20'
        }`}
      >
        {isGenerating ? (
          <>
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            <span>Crafting...</span>
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11l-7-7-7 7M17 21l-7-7-7 7" />
            </svg>
            <span>Generate Variations</span>
          </>
        )}
      </button>
    </div>
  );
};

export default PromptArea;
