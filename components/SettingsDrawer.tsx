
import React from 'react';
import { AspectRatio, QualitySetting } from '../types';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (v: AspectRatio) => void;
  quality: QualitySetting;
  setQuality: (v: QualitySetting) => void;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  isOpen, onClose, aspectRatio, setAspectRatio, quality, setQuality
}) => {
  const aspectRatios: AspectRatio[] = ["1:1", "2:3", "3:2", "3:4", "4:3", "9:16", "16:9", "21:9"];
  const qualities: { label: QualitySetting; description: string; color: string }[] = [
    { label: 'Draft', description: 'Fastest generation (1K)', color: 'from-emerald-600 to-teal-600' },
    { label: 'Standard', description: 'Balanced speed & detail (2K)', color: 'from-blue-600 to-indigo-600' },
    { label: 'High', description: 'Highest fidelity (4K)', color: 'from-purple-600 to-pink-600' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative glass border-t border-white/10 rounded-t-[32px] p-8 space-y-8 animate-in slide-in-from-bottom duration-300">
        <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-2" />
        
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-widest text-white/40">Canvas Ratio</label>
          <div className="grid grid-cols-4 gap-2">
            {aspectRatios.map(ratio => (
              <button
                key={ratio}
                onClick={() => setAspectRatio(ratio)}
                className={`py-3 rounded-xl text-xs font-medium transition-all ${
                  aspectRatio === ratio ? 'bg-blue-600 text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4 pb-4">
          <label className="text-xs font-bold uppercase tracking-widest text-white/40">Generation Quality</label>
          <div className="grid grid-cols-1 gap-3">
            {qualities.map(q => (
              <button
                key={q.label}
                onClick={() => setQuality(q.label)}
                className={`relative p-4 rounded-2xl flex flex-col items-start transition-all border ${
                  quality === q.label 
                    ? `bg-gradient-to-r ${q.color} border-white/20 shadow-lg` 
                    : 'bg-white/5 border-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex justify-between w-full items-center">
                    <span className="font-bold">{q.label}</span>
                    {quality === q.label && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    )}
                </div>
                <span className={`text-[11px] mt-1 ${quality === q.label ? 'text-white/80' : 'text-white/40'}`}>
                    {q.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full py-5 bg-white text-black rounded-2xl font-bold active:scale-[0.98] transition-all shadow-xl"
        >
          Confirm Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsDrawer;
