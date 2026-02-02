
import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  const [selectedImage, setSelectedImage] = useState<WallpaperVariation | null>(null);
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("9:16");
  const [quality, setQuality] = useState<QualitySetting>("Standard");
  const [referenceImage, setReferenceImage] = useState<WallpaperVariation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const init = async () => {
      const isConfigured = await checkApiKey();
      setHasKey(isConfigured);
    };
    init();
  }, []);

  const handleSelectKey = async () => {
    await selectApiKey();
    setHasKey(true); // Proceed assuming success per instructions
  };

  const generateWallpapers = useCallback(async () => {
    if (!prompt.trim()) return;
    
    setStatus(AppStatus.GENERATING);
    setError(null);
    setResults([]);

    try {
      // Generate 4 in parallel for a better user experience
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
    setSelectedImage(null);
    // Focus the prompt area or scroll up
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearReference = () => setReferenceImage(null);

  if (hasKey === false) {
    return <KeyGate onSelectKey={handleSelectKey} />;
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Header onOpenSettings={() => setShowSettings(true)} />
      
      <main className="max-w-4xl mx-auto px-4 pt-20 pb-40">
        <PromptArea 
          prompt={prompt}
          setPrompt={setPrompt}
          onGenerate={generateWallpapers}
          status={status}
          referenceImage={referenceImage}
          onClearReference={clearReference}
        />

        {error && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}

        <Gallery 
          items={results} 
          isLoading={status === AppStatus.GENERATING}
          onSelect={setSelectedImage}
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

      {/* Persistent helper for mobile */}
      {status === AppStatus.IDLE && results.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="glass px-6 py-3 rounded-full text-xs font-medium border border-white/10 shadow-2xl hover:bg-white/10 transition-all"
          >
            Create More
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
