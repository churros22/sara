
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Music, VolumeX, Cake, Images, Search, Gift } from "lucide-react";

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const isMobile = useIsMobile();

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
  
  // Pixel art decorations
  const pixelArts = [
    "🧁", "🎀", "🍭", "🎈", "✨", "💖", "🎊", "🦄", "🌈"
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-tr from-sara-pastel3/40 via-background to-sara-pastel2/40 p-4 sm:p-8 overflow-x-hidden">
      {/* Pixel art decorations */}
      {pixelArts.map((emoji, index) => (
        <div 
          key={index}
          className="absolute animate-float text-2xl md:text-4xl"
          style={{ 
            top: `${Math.random() * 80 + 10}%`, 
            left: `${Math.random() * 80 + 10}%`,
            animationDelay: `${index * 0.4}s`,
            transform: `rotate(${Math.random() * 20 - 10}deg)`,
            zIndex: 1
          }}
        >
          {emoji}
        </div>
      ))}
      
      <div className="relative w-full max-w-5xl z-10">
        <button
          onClick={toggleAudio}
          className="absolute top-4 right-4 z-10 glass rounded-full p-3 animate-hover"
          aria-label={audioPlaying ? "Mute music" : "Play music"}
        >
          {audioPlaying ? (
            <Music className="text-sara-retro5" />
          ) : (
            <VolumeX className="text-sara-retro1" />
          )}
        </button>

        <div className={`text-center mb-8 ${showContent ? 'animate-fade-in' : 'opacity-0'}`}>
          <h1 className="text-4xl sm:text-5xl font-caveat font-bold mb-4 text-primary">
            Hello Sara! 
            <span className="inline-block ml-2 animate-pulse-gentle">🎂</span>
          </h1>
          <div className="w-12 h-1 bg-sara-pink mx-auto my-4 rounded-full"></div>
          <p className="text-xl font-caveat text-muted-foreground px-4">
            Welcome! Please feel at home, mi casa is your casa
          </p>
        </div>

        <div 
          className={`grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 ${showContent ? 'animate-fade-in' : 'opacity-0'}`} 
          style={{ animationDelay: '0.2s' }}
        >
          <div 
            className="interactive-tile bg-sara-retro1/10 relative overflow-hidden group"
            onClick={() => navigateTo("/saranterest")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sara-retro1/20 to-sara-retro3/20 opacity-50 group-hover:opacity-70 transition-opacity"></div>
            <div className="relative z-10 flex items-center gap-3">
              <div className="bg-white/30 p-2 rounded-full">
                <Images size={isMobile ? 20 : 24} className="text-sara-retro1" />
              </div>
              <div>
                <h2 className="text-2xl font-caveat font-semibold mb-1">Saranterest</h2>
                <p className="text-muted-foreground font-caveat">Discover beautiful images curated for you</p>
              </div>
            </div>
            <div className="absolute bottom-2 right-2 font-pixel text-xs text-sara-retro1/70">✨ click me ✨</div>
          </div>

          <div 
            className="interactive-tile bg-sara-retro2/10 relative overflow-hidden group"
            onClick={() => navigateTo("/googolu")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sara-retro2/20 to-sara-retro4/20 opacity-50 group-hover:opacity-70 transition-opacity"></div>
            <div className="relative z-10 flex items-center gap-3">
              <div className="bg-white/30 p-2 rounded-full">
                <Search size={isMobile ? 20 : 24} className="text-sara-retro2" />
              </div>
              <div>
                <h2 className="text-2xl font-caveat font-semibold mb-1">Googolu</h2>
                <p className="text-muted-foreground font-caveat">Find all things Sara in one place</p>
              </div>
            </div>
            <div className="absolute bottom-2 right-2 font-pixel text-xs text-sara-retro2/70">✨ click me ✨</div>
          </div>

          <div 
            className="interactive-tile bg-sara-retro3/10 relative overflow-hidden group" 
            onClick={() => navigateTo("/saratify")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sara-retro3/20 to-sara-retro5/20 opacity-50 group-hover:opacity-70 transition-opacity"></div>
            <div className="relative z-10 flex items-center gap-3">
              <div className="bg-white/30 p-2 rounded-full">
                <Music size={isMobile ? 20 : 24} className="text-sara-retro3" />
              </div>
              <div>
                <h2 className="text-2xl font-caveat font-semibold mb-1">Saratify</h2>
                <p className="text-muted-foreground font-caveat">Listen to your favorite songs</p>
              </div>
            </div>
            <div className="absolute bottom-2 right-2 font-pixel text-xs text-sara-retro3/70">✨ click me ✨</div>
          </div>

          <div 
            className="interactive-tile bg-sara-retro5/10 relative overflow-hidden group"
            onClick={() => navigateTo("/saraprise")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sara-retro5/20 to-sara-retro1/20 opacity-50 group-hover:opacity-70 transition-opacity"></div>
            <div className="relative z-10 flex items-center gap-3">
              <div className="bg-white/30 p-2 rounded-full">
                <Gift size={isMobile ? 20 : 24} className="text-sara-retro5" />
              </div>
              <div>
                <h2 className="text-2xl font-caveat font-semibold mb-1">Saraprise</h2>
                <p className="text-muted-foreground font-caveat">A special surprise just for you</p>
              </div>
            </div>
            <div className="absolute bottom-2 right-2 font-pixel text-xs text-sara-retro5/70">✨ click me ✨</div>
          </div>
        </div>
      </div>

      <div className={`mt-12 text-center text-sm text-muted-foreground ${showContent ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
        <p className="font-caveat text-lg">Made with 💖 for your special day</p>
        <div className="mt-2 font-vt323">
          <span className="inline-block animate-rainbow">✨ Happy Birthday Sara! ✨</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
