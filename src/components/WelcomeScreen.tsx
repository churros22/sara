
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element - this will be replaced with actual audio
    const audioElement = new Audio("/assets/audio/background.mp3");
    audioElement.loop = true;
    setAudio(audioElement);

    // Fade in content
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);

    return () => {
      clearTimeout(timer);
      if (audioElement) {
        audioElement.pause();
        audioElement.src = "";
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audio) return;
    
    if (audioPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
    }
    
    setAudioPlaying(!audioPlaying);
  };

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-tr from-sara-blue/20 via-background to-sara-pink/20 p-4 sm:p-8">
      <div className="relative w-full max-w-5xl">
        <button
          onClick={toggleAudio}
          className="absolute top-4 right-4 z-10 glass rounded-full p-3 animate-hover"
          aria-label={audioPlaying ? "Mute music" : "Play music"}
        >
          {audioPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5 6 9H2v6h4l5 4V5Z" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5 6 9H2v6h4l5 4V5Z" /><line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </button>

        <div className={`text-center mb-12 ${showContent ? 'animate-fade-in' : 'opacity-0'}`}>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-primary">Hello Sara!</h1>
          <p className="text-xl text-muted-foreground">
            Welcome! Please feel at home, mi casa is your casa
          </p>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${showContent ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <div 
            className="interactive-tile bg-sara-pink/10"
            onClick={() => navigateTo("/saranterest")}
          >
            <h2 className="text-2xl font-semibold mb-2">Saranterest</h2>
            <p className="text-muted-foreground">Discover beautiful images curated for you</p>
          </div>

          <div 
            className="interactive-tile bg-sara-blue/10"
            onClick={() => navigateTo("/googolu")}
          >
            <h2 className="text-2xl font-semibold mb-2">Googolu</h2>
            <p className="text-muted-foreground">Find all things Sara in one place</p>
          </div>

          <div 
            className="interactive-tile bg-sara-yellow/10" 
            onClick={() => navigateTo("/saratify")}
          >
            <h2 className="text-2xl font-semibold mb-2">Saratify</h2>
            <p className="text-muted-foreground">Listen to your favorite songs</p>
          </div>

          <div 
            className="interactive-tile bg-sara-purple/10"
            onClick={() => navigateTo("/saraprise")}
          >
            <h2 className="text-2xl font-semibold mb-2">Saraprise</h2>
            <p className="text-muted-foreground">A special surprise just for you</p>
          </div>
        </div>
      </div>

      <div className={`mt-12 text-center text-sm text-muted-foreground ${showContent ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
        <p>Made with love for your special day</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
