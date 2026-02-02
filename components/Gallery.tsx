
import React from 'react';
import { WallpaperVariation } from '../types';

interface GalleryProps {
  items: WallpaperVariation[];
  isLoading: boolean;
  onSelect: (image: WallpaperVariation) => void;
}

const Gallery: React.FC<GalleryProps> = ({ items, isLoading, onSelect }) => {
  if (isLoading && items.length === 0) {
    return (
      <div className="mt-12 grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-[9/16] rounded-2xl loading-shimmer border border-white/5 shadow-inner" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mt-20 text-center space-y-3 opacity-30">
        <div className="flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-sm font-medium">Your masterpieces will appear here</p>
      </div>
    );
  }

  return (
    <div className="mt-12 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40">Latest Variations</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="group relative aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all active:scale-[0.98]"
          >
            <img 
              src={item.url} 
              alt={item.prompt} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
