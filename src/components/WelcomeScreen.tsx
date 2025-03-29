
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Music, VolumeX, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAudioContext } from "@/hooks/use-audio-context";

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const { stopAndReset } = useAudioContext();

  useEffect(() => {
    // Create audio element - this will be replaced with actual audio
    const audioElement = new Audio("/assets/audio/sara_impala.mp3");
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

  const handleLogout = () => {
    // Stop any playing music
    stopAndReset();
    
    localStorage.removeItem("saraAccessGranted");
    toast({
      title: "Logged out! 👋",
      description: "Come back soon!",
    });
    navigate("/");
  };
  
  // Pixel art decorations - positioned carefully to avoid overlap
  const pixelArts = [
    { emoji: "🧁", position: { top: "8%", left: "90%" }, delay: 0.2, size: "text-2xl" },
    { emoji: "🎀", position: { top: "15%", right: "15%" }, delay: 0.5, size: "text-2xl" },
    { emoji: "🍭", position: { bottom: "20%", left: "10%" }, delay: 0.8, size: "text-2xl" },
    { emoji: "🎈", position: { bottom: "15%", right: "15%" }, delay: 1.1, size: "text-2xl" },
    { emoji: "✨", position: { top: "25%", left: "15%" }, delay: 1.4, size: "text-xl" },
    { emoji: "💖", position: { bottom: "25%", left: "85%" }, delay: 1.7, size: "text-xl" },
    { emoji: "🎊", position: { top: "40%", right: "8%" }, delay: 2.0, size: "text-xl" },
    { emoji: "🦄", position: { bottom: "40%", left: "8%" }, delay: 2.3, size: "text-2xl" },
    { emoji: "🌈", position: { top: "10%", left: "8%" }, delay: 2.6, size: "text-xl" }
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-tr from-sara-pastel3/40 via-background to-sara-pastel2/40 p-4 sm:p-8 overflow-x-hidden relative">
      {/* Ambient background pattern */}
      <div className="absolute inset-0 bg-opacity-10 z-0" style={{ 
        backgroundImage: "radial-gradient(circle at 25px 25px, rgba(255,255,255,0.15) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255,255,255,0.15) 2%, transparent 0%)",
        backgroundSize: "100px 100px"
      }}></div>
      
      {/* Pixel art decorations with better positioning */}
      {pixelArts.map((item, index) => (
        <div 
          key={index}
          className={`fixed ${item.size} pointer-events-none animate-float z-0`}
          style={{ 
            ...item.position,
            animationDelay: `${item.delay}s`,
            transform: `rotate(${Math.random() * 20 - 10}deg)`,
            opacity: 0.8
          }}
        >
          {item.emoji}
        </div>
      ))}
      
      <div className="relative w-full max-w-5xl z-10">
        {/* Optimized mobile buttons */}
        <div className={`absolute top-2 right-2 z-10 flex gap-2 ${isMobile ? 'scale-75 origin-top-right' : ''}`}>
          <button
            onClick={toggleAudio}
            className="glass rounded-full p-2 animate-hover transition-all duration-300"
            aria-label={audioPlaying ? "Mute music" : "Play music"}
          >
            {audioPlaying ? (
              <Music size={isMobile ? 16 : 20} className="text-sara-retro5 animate-pulse-gentle" />
            ) : (
              <VolumeX size={isMobile ? 16 : 20} className="text-sara-retro1" />
            )}
          </button>
          <button
            onClick={handleLogout}
            className="glass rounded-full p-2 animate-hover transition-all duration-300"
            aria-label="Log out"
          >
            <LogOut size={isMobile ? 16 : 20} className="text-sara-retro3" />
          </button>
        </div>

        <div className={`text-center mb-8 ${showContent ? 'animate-fade-in' : 'opacity-0'}`}>
          <h1 className="text-4xl sm:text-5xl font-press font-bold mb-4 text-primary pixel-shadow animate-scale-in">
            Hello Sara! 
            <span className="inline-block ml-2 animate-pulse-gentle">🎂</span>
          </h1>
          <div className="w-12 h-1 bg-sara-pink mx-auto my-4 rounded-full"></div>
          <p className="text-xl font-pixel text-muted-foreground px-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Welcome! Please feel at home, mi casa is your casa
          </p>
        </div>

        <div 
          className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${showContent ? 'animate-fade-in' : 'opacity-0'}`} 
          style={{ animationDelay: '0.2s' }}
        >
          {/* Saranterest Card - Improved design */}
          <div 
            className="pixel-border bg-gradient-to-br from-pink-500/20 to-purple-600/20 relative overflow-hidden group rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            onClick={() => navigateTo("/saranterest")}
          >
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300"></div>
            <div className="p-6 relative z-10">
              <div className="flex items-start gap-3">
                <div className="bg-white/20 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-inner pixel-border">
                  <svg className="w-8 h-8 text-pink-500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-pixel font-semibold mb-2 text-pink-500 pixel-shadow">Saranterest</h2>
                  <p className="text-muted-foreground font-pixel text-sm">Beautiful aesthetic images to inspire your creativity</p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                <div className="text-xs font-pixel text-white/40">Discover beauty</div>
                <div className="flex space-x-1">
                  <span className="inline-block w-2 h-2 bg-pink-400 rounded-full animate-pulse"></span>
                  <span className="inline-block w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></span>
                  <span className="inline-block w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></span>
                </div>
              </div>
            </div>
          </div>

          {/* Googolu Card - Improved design */}
          <div 
            className="pixel-border bg-gradient-to-br from-blue-500/20 to-cyan-600/20 relative overflow-hidden group rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            onClick={() => navigateTo("/googolu")}
          >
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300"></div>
            <div className="p-6 relative z-10">
              <div className="flex items-start gap-3">
                <div className="bg-white/20 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-inner pixel-border">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.2 20.6L17.6 16c1.3-1.6 2-3.6 2-5.7 0-5-4-9-9-9s-9 4-9 9 4 9 9 9c2.1 0 4.1-.7 5.7-2l4.6 4.6c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.3zM10.7 3.3c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7z" fill="#4285F4"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-pixel font-semibold mb-2 text-blue-400 pixel-shadow">Googolu</h2>
                  <p className="text-muted-foreground font-pixel text-sm">Search across the universe for whatever you need</p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                <div className="text-xs font-pixel text-white/40">Find anything</div>
                <div className="flex space-x-1">
                  <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                  <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></span>
                  <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></span>
                </div>
              </div>
            </div>
          </div>

          {/* Saratify Card - Improved design */}
          <div 
            className="pixel-border bg-gradient-to-br from-green-500/20 to-emerald-600/20 relative overflow-hidden group rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            onClick={() => navigateTo("/saratify")}
          >
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300"></div>
            <div className="p-6 relative z-10">
              <div className="flex items-start gap-3">
                <div className="bg-white/20 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-inner pixel-border">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" fill="#1DB954"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-pixel font-semibold mb-2 text-green-400 pixel-shadow">Saratify</h2>
                  <p className="text-muted-foreground font-pixel text-sm">Listen to your favorite music with premium sound</p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                <div className="text-xs font-pixel text-white/40">Enjoy music</div>
                <div className="flex space-x-1">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></span>
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></span>
                </div>
              </div>
            </div>
          </div>

          {/* Saraprise Card - Improved design */}
          <div 
            className="pixel-border bg-gradient-to-br from-amber-500/20 to-orange-600/20 relative overflow-hidden group rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            onClick={() => navigateTo("/saraprise")}
          >
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300"></div>
            <div className="p-6 relative z-10">
              <div className="flex items-start gap-3">
                <div className="bg-white/20 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-inner pixel-border">
                  <svg className="w-8 h-8 text-amber-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 12V22H4V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 7H2V12H22V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 7H16.5C17.3284 7 18 6.32843 18 5.5C18 4.67157 17.3284 4 16.5 4C15.6716 4 15 4.67157 15 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 7H7.5C6.67157 7 6 6.32843 6 5.5C6 4.67157 6.67157 4 7.5 4C8.32843 4 9 4.67157 9 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-pixel font-semibold mb-2 text-amber-400 pixel-shadow">Saraprise</h2>
                  <p className="text-muted-foreground font-pixel text-sm">A special surprise just for you on your birthday</p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                <div className="text-xs font-pixel text-white/40">Open your gift</div>
                <div className="flex space-x-1">
                  <span className="inline-block w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                  <span className="inline-block w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></span>
                  <span className="inline-block w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`mt-12 text-center text-sm text-muted-foreground ${showContent ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.4s', position: 'relative', zIndex: 10 }}>
        <p className="font-pixel text-lg">Made with rage :3 💖 for your special day</p>
        <div className="mt-2 font-pixel">
          <span className="inline-block animate-rainbow font-bold pixel-shadow">✨ Happy Birthday Sara! ✨</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
