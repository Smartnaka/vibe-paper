
import React from 'react';
import { AspectRatio, ImageSize } from '../types';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (v: AspectRatio) => void;
  imageSize: ImageSize;
  setImageSize: (v: ImageSize) => void;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  isOpen, onClose, aspectRatio, setAspectRatio, imageSize, setImageSize
}) => {
  const aspectRatios: AspectRatio[] = ["1:1", "2:3", "3:2", "3:4", "4:3", "9:16", "16:9", "21:9"];
  const sizes: ImageSize[] = ["1K", "2K", "4K"];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass border-t border-white/10 rounded-t-[32px] p-8 space-y-8 animate-in slide-in-from-bottom duration-300">
        <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-2" />
        
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-widest text-white/40">Aspect Ratio</label>
          <div className="grid grid-cols-4 gap-2">
            {aspectRatios.map(ratio => (
              <button
                key={ratio}
                onClick={() => setAspectRatio(ratio)}
                className={`py-3 rounded-xl text-sm font-medium transition-all ${
                  aspectRatio === ratio ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 pb-4">
          <label className="text-xs font-bold uppercase tracking-widest text-white/40">Resolution (Quality)</label>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => setImageSize(size)}
                className={`py-3 rounded-xl text-sm font-medium transition-all ${
                  imageSize === size ? 'bg-purple-600 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-white/30 text-center">Higher resolutions take longer to generate.</p>
        </div>

        <button 
          onClick={onClose}
          className="w-full py-4 bg-white/10 rounded-2xl font-bold hover:bg-white/20 transition-all"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsDrawer;
