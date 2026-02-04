
import React, { useState, useEffect } from 'react';
import { AppStatus, WallpaperVariation } from '../types';

interface PromptAreaProps {
  prompt: string;
  setPrompt: (v: string) => void;
  onGenerate: () => void;
  status: AppStatus;
  referenceImage: WallpaperVariation | null;
  onClearReference: () => void;
}

const STYLES = [
  "Studio Ghibli", "Cyberpunk", "Minimalist Vector", "3D Render", 
  "Oil Painting", "Synthwave", "Anatomical Sketch", "Double Exposure",
  "Ukiyo-e", "Macro Photography", "Vaporwave", "Cinematic"
];

const SURPRISES = [
  "A rainy cyberpunk street at night with neon reflections in puddles, cinematic lighting",
  "Ethereal floating islands with crystal waterfalls in a purple nebula sky, Ghibli style",
  "Close up of a mechanical watch interior with glowing blue plasma gears, 8k detail",
  "A lonely astronaut sitting on a park bench on the moon looking at Earth, minimalist style",
  "Hyper-realistic macro shot of a butterfly wing made of stained glass",
  "A cozy cottage in the woods during a thunderstorm, warm orange window light, oil painting",
  "Futuristic botanical garden inside a massive glass dome on Mars, lush greenery"
];

const PromptArea: React.FC<PromptAreaProps> = ({ 
  prompt, setPrompt, onGenerate, status, referenceImage, onClearReference 
}) => {
  const isGenerating = status === AppStatus.GENERATING;
  const [loadingText, setLoadingText] = useState("Crafting...");

  useEffect(() => {
    if (isGenerating) {
      const texts = ["Mixing pigments...", "Painting pixels...", "Adding highlights...", "Finalizing 4K...", "Upscaling textures..."];
      let i = 0;
      const interval = setInterval(() => {
        setLoadingText(texts[i % texts.length]);
        i++;
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const handleSurprise = () => {
    const random = SURPRISES[Math.floor(Math.random() * SURPRISES.length)];
    setPrompt(random);
  };

  const toggleStyle = (style: string) => {
    if (prompt.includes(style)) {
      setPrompt(prompt.replace(new RegExp(`,? ?${style}`, 'g'), ''));
    } else {
      setPrompt(prompt ? `${prompt}, ${style}` : style);
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-[22px] blur opacity-75 group-focus-within:opacity-100 transition duration-1000 group-focus-within:duration-200"></div>
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your vibe... (e.g. Rainy neon street)"
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 pt-7 min-h-[160px] focus:outline-none focus:border-blue-500/50 transition-all text-lg resize-none placeholder:text-white/20 shadow-2xl"
            disabled={isGenerating}
          />
          
          <button 
            onClick={handleSurprise}
            title="Surprise me"
            className="absolute top-4 right-4 p-2.5 glass border border-white/10 rounded-xl hover:bg-white/10 active:scale-90 transition-all text-white/60 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
            </svg>
          </button>

          {referenceImage && (
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-1.5 pr-3 shadow-xl">
              <img src={referenceImage.url} alt="Ref" className="w-8 h-8 object-cover rounded shadow-inner" />
              <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Remix Mode</span>
              <button onClick={onClearReference} className="ml-1 text-white/30 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
        <div className="flex gap-2 w-max">
          {STYLES.map(style => (
            <button
              key={style}
              onClick={() => toggleStyle(style)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                prompt.includes(style) 
                  ? 'bg-white text-black border-white' 
                  : 'glass border-white/5 text-white/50 hover:text-white hover:border-white/20'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={isGenerating || !prompt.trim()}
        className={`w-full py-5 rounded-2xl font-bold text-lg transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-2xl ${
          isGenerating 
            ? 'bg-white/5 text-white/20 cursor-not-allowed' 
            : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:brightness-110'
        }`}
      >
        {isGenerating ? (
          <>
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            <span className="animate-pulse">{loadingText}</span>
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
            </svg>
            <span>Generate Wallpaper</span>
          </>
        )}
      </button>
    </div>
  );
};

export default PromptArea;
