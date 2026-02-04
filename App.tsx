
import React, { useState, useEffect, useCallback } from 'react';
import { 
  AspectRatio, 
  QualitySetting, 
  WallpaperVariation, 
  AppStatus 
} from './types';
import { 
  generateSingleImage, 
  checkApiKey, 
  selectApiKey 
} from './services/geminiService';

// Components
import Header from './components/Header';
import PromptArea from './components/PromptArea';
import Gallery from './components/Gallery';
import FullScreenModal from './components/FullScreenModal';
import SettingsDrawer from './components/SettingsDrawer';
import KeyGate from './components/KeyGate';

const App: React.FC = () => {
  const [hasKey, setHasKey] = useState<boolean | null>(null);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [results, setResults] = useState<WallpaperVariation[]>([]);
  const [history, setHistory] = useState<WallpaperVariation[]>([]);
  const [selectedImage, setSelectedImage] = useState<WallpaperVariation | null>(null);
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("9:16");
  const [quality, setQuality] = useState<QualitySetting>("Standard");
  const [referenceImage, setReferenceImage] = useState<WallpaperVariation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    const init = async () => {
      const isConfigured = await checkApiKey();
      setHasKey(isConfigured);
      
      const savedHistory = localStorage.getItem('vibepaper_history');
      if (savedHistory) {
        try {
          setHistory(JSON.parse(savedHistory));
        } catch (e) {
          console.error("Failed to parse history", e);
        }
      }
    };
    init();
  }, []);

  // Save history when it changes
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('vibepaper_history', JSON.stringify(history.slice(0, 50)));
    }
  }, [history]);

  const handleSelectKey = async () => {
    await selectApiKey();
    setHasKey(true);
  };

  const generateWallpapers = useCallback(async () => {
    if (!prompt.trim()) return;
    
    setStatus(AppStatus.GENERATING);
    setError(null);
    setResults([]);

    try {
      const requests = Array(4).fill(null).map(() => 
        generateSingleImage({
          prompt,
          aspectRatio,
          quality,
          referenceImageBase64: referenceImage?.base64
        })
      );

      const variations = await Promise.all(requests);
      setResults(variations);
      setHistory(prev => [...variations, ...prev]);
      setStatus(AppStatus.IDLE);
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("Requested entity was not found")) {
        setHasKey(false);
        setError("API Key configuration lost. Please re-select your key.");
      } else {
        setError("Generation failed. Please try again.");
      }
      setStatus(AppStatus.IDLE);
    }
  }, [prompt, aspectRatio, quality, referenceImage]);

  const handleRemix = (image: WallpaperVariation) => {
    setReferenceImage(image);
    setPrompt(image.prompt);
    setSelectedImage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearReference = () => setReferenceImage(null);

  const clearHistory = () => {
    if (window.confirm("Clear all saved wallpapers?")) {
      setHistory([]);
      localStorage.removeItem('vibepaper_history');
    }
  };

  if (hasKey === false) {
    return <KeyGate onSelectKey={handleSelectKey} />;
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 pb-20">
      <Header onOpenSettings={() => setShowSettings(true)} />
      
      <main className="max-w-4xl mx-auto px-4 pt-24">
        <PromptArea 
          prompt={prompt}
          setPrompt={setPrompt}
          onGenerate={generateWallpapers}
          status={status}
          referenceImage={referenceImage}
          onClearReference={clearReference}
        />

        {error && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <Gallery 
          currentResults={results}
          history={history}
          isLoading={status === AppStatus.GENERATING}
          onSelect={setSelectedImage}
          onClearHistory={clearHistory}
        />
      </main>

      <SettingsDrawer 
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        aspectRatio={aspectRatio}
        setAspectRatio={setAspectRatio}
        quality={quality}
        setQuality={setQuality}
      />

      {selectedImage && (
        <FullScreenModal 
          image={selectedImage} 
          onClose={() => setSelectedImage(null)}
          onRemix={handleRemix}
        />
      )}
    </div>
  );
};

export default App;
