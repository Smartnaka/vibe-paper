
import React, { useState } from 'react';
import { WallpaperVariation } from '../types';

interface FullScreenModalProps {
  image: WallpaperVariation;
  onClose: () => void;
  onRemix: (image: WallpaperVariation) => void;
}

const FullScreenModal: React.FC<FullScreenModalProps> = ({ image, onClose, onRemix }) => {
  const [zoom, setZoom] = useState(1);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `vibepaper-${image.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col animate-in fade-in duration-300">
      {/* Top Bar */}
      <div className="p-6 flex justify-between items-center z-10">
        <button 
          onClick={onClose}
          className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex gap-2">
            <span className="glass px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/60">
                {image.aspectRatio}
            </span>
            <span className="glass px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/60">
                {image.size}
            </span>
        </div>
      </div>

      {/* Image Viewport */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-4 relative">
        <div 
          className="transition-all duration-200 ease-out flex items-center justify-center"
          style={{ 
            width: zoom > 1 ? `${zoom * 100}%` : '100%',
            height: zoom > 1 ? `${zoom * 100}%` : '100%',
          }}
        >
          <img 
            src={image.url} 
            alt="Full view" 
            className={`rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.5)] transition-all duration-200 ${zoom === 1 ? 'max-h-full max-w-full object-contain' : 'w-full h-auto'}`}
            style={{
                transform: `scale(${zoom > 1 ? 1 : 1})`, // Keep scale 1 as we adjust width/height for scrollable panning
            }}
          />
        </div>
      </div>

      {/* Controls Area */}
      <div className="p-6 space-y-6 bg-gradient-to-t from-black via-black/80 to-transparent">
        {/* Zoom Slider */}
        <div className="space-y-3 px-4">
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-white/40">
            <span>Zoom</span>
            <span>{zoom.toFixed(1)}x</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="4" 
            step="0.1" 
            value={zoom} 
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button 
            onClick={handleDownload}
            className="flex-1 py-4 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </button>
          <button 
            onClick={() => onRemix(image)}
            className="flex-1 py-4 glass text-white border border-white/20 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Remix
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullScreenModal;
