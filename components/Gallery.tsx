
import React from 'react';
import { WallpaperVariation } from '../types';

interface GalleryProps {
  currentResults: WallpaperVariation[];
  history: WallpaperVariation[];
  isLoading: boolean;
  onSelect: (image: WallpaperVariation) => void;
  onClearHistory: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ currentResults, history, isLoading, onSelect, onClearHistory }) => {
  // Filter history to exclude what's currently being shown as results
  const filteredHistory = history.filter(h => !currentResults.find(r => r.id === h.id));

  if (isLoading && currentResults.length === 0) {
    return (
      <div className="mt-12 space-y-6">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Generating Variations
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-[9/16] rounded-2xl loading-shimmer border border-white/5 shadow-inner" />
          ))}
        </div>
      </div>
    );
  }

  if (currentResults.length === 0 && history.length === 0) {
    return (
      <div className="mt-20 py-20 text-center space-y-4 opacity-30 border-2 border-dashed border-white/5 rounded-3xl">
        <div className="flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
            <p className="text-lg font-bold">Awaiting your vision</p>
            <p className="text-xs uppercase tracking-widest mt-1">Describe a vibe above to begin</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 space-y-16">
      {currentResults.length > 0 && (
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-400">Latest Variations</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {currentResults.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelect(item)}
                className="group relative aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 hover:border-white/40 transition-all active:scale-[0.98] shadow-xl hover:shadow-2xl"
              >
                <img src={item.url} alt={item.prompt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        </section>
      )}

      {filteredHistory.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white/30">Past Creations</h2>
            <button 
                onClick={onClearHistory}
                className="text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-red-400/60 transition-colors"
            >
                Clear All
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredHistory.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelect(item)}
                className="group relative aspect-[9/16] rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all active:scale-[0.98]"
              >
                <img src={item.url} alt={item.prompt} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all" />
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Gallery;
