
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { useAudio } from "@/contexts/AudioContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import AnimatedWrap from "@/components/AnimatedWrap";

const Home = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{id: number, style: React.CSSProperties}>>([]);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const audioContext = useAudio();

  // App sections with detailed descriptions
  const sections = [
    {
      id: "saranterest",
      title: "Saranterest",
      description: "Browse beautiful images and get inspired (or torture your heart :3)",
      color: "#4CC9F0",
      icon: (
        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: "googolu",
      title: "Googolu",
      description: "Search for anything and everything, even your name!",
      color: "#4CC9F0",
      icon: (
        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.2 20.6L17.6 16c1.3-1.6 2-3.6 2-5.7 0-5-4-9-9-9s-9 4-9 9 4 9 9 9c2.1 0 4.1-.7 5.7-2l4.6 4.6c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.3zM10.7 3.3c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7z" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: "saratify",
      title: "Saratify",
      description: "Enjoy your favorite songs and playlists, selected just for you",
      color: "#4CC9F0",
      icon: (
        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: "saraprise",
      title: "Saraprise",
      description: "A little something for a little someone :3",
      color: "#4CC9F0",
      icon: (
        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 12V22H4V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 7H2V12H22V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 22V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 7H16.5C17.3284 7 18 6.32843 18 5.5C18 4.67157 17.3284 4 16.5 4C15.6716 4 15 4.67157 15 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 7H7.5C6.67157 7 6 6.32843 6 5.5C6 4.67157 6.67157 4 7.5 4C8.32843 4 9 4.67157 9 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  useEffect(() => {
    // Fade in content
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Generate sparkles randomly
  useEffect(() => {
    const createSparkle = () => {
      const id = Date.now();
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 10 + 5;
      const delay = Math.random() * 2;
      
      const style = {
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: ['#FFD700', '#A3F7BF', '#4CC9F0'][Math.floor(Math.random() * 3)],
        borderRadius: '50%',
        animationDelay: `${delay}s`,
        opacity: 0,
        zIndex: 1
      } as React.CSSProperties;
      
      setSparkles(prev => [...prev.slice(-20), { id, style }]);
    };
    
    const interval = setInterval(createSparkle, 500);
    return () => clearInterval(interval);
  }, []);

  // Handle navigation with function instead of direct Link
  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    // Stop all audio and clear context when logging out
    audioContext.stopAndReset();
    
    localStorage.removeItem("saraAccessGranted");
    toast({
      title: "Bye Bye 👋",
      description: "Miss you already! 😢",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#1D3557] p-4 sm:p-8 relative overflow-hidden">
      {/* Background with butterfly effect */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="/lovable-uploads/f50ed068-b0aa-414d-a993-85e567d482cc.png" 
          alt="Forest Background" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-[#1D3557]/70"></div>
        
        {/* Sparkles */}
        {sparkles.map(sparkle => (
          <div 
            key={sparkle.id}
            className="animate-sparkle" 
            style={sparkle.style}
          />
        ))}
      </div>
      
      {/* Header Section */}
      <div className="relative z-10 w-full max-w-4xl text-center mt-8 mb-10">
        <div className="flex flex-col items-center justify-center">
          {/* Avatar with glow effect */}
          <div className="mb-6 relative">
            <div className="absolute inset-0 rounded-full bg-[#4CC9F0] blur-lg opacity-70 animate-pulse-gentle"></div>
            <Avatar className="w-24 h-24 border-2 border-[#4CC9F0] animate-glow">
              <AvatarImage src="/lovable-uploads/6ce3c4f5-4273-48e0-82f0-c8022f62c515.png" alt="Sara" className="object-cover" />
              <AvatarFallback className="bg-[#1D3557] text-[#4CC9F0]">S</AvatarFallback>
            </Avatar>
          </div>
          
          {/* Vertical Sara text */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
            <div className="flex flex-col">
              {["S", "A", "R", "A"].map((letter, index) => (
                <span 
                  key={index} 
                  className="text-3xl font-bold text-[#FFD700]"
                  style={{ textShadow: "0 0 10px rgba(255, 215, 0, 0.7)" }}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>

          {/* Main hero text */}
          <h1 className="text-5xl sm:text-7xl font-bold mb-4 text-[#4CC9F0] animate-fade-in"
              style={{ textShadow: "0 0 15px rgba(76, 201, 240, 0.6)" }}>
            Hi Sara!
          </h1>
          
          {/* Glowing underline */}
          <div className="w-32 h-1 bg-[#4CC9F0] mx-auto my-3 rounded-full shadow-[0_0_10px_rgba(76,201,240,0.8)]"></div>
          
          <AnimatedWrap>
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-silkscreen text-white mb-2">Welcome 🎉</h2>
              <p className="text-xl font-caveat text-[#A3F7BF] italic">
                Feel free por favor, mi casa is your casa
              </p>
            </div>
          </AnimatedWrap>
        </div>
      </div>

      {/* Feature Section in 2x2 Grid */}
      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {sections.map((section, index) => (
          <div 
            key={section.id}
            className="border-2 border-[#4CC9F0] rounded-lg overflow-hidden cursor-pointer hover:shadow-[0_0_15px_rgba(76,201,240,0.5)] transition-all duration-300"
            onClick={() => handleNavigate(`/${section.id}`)}
            style={{ 
              backgroundColor: "rgba(29, 53, 87, 0.8)",
              backdropFilter: "blur(4px)",
              animation: `fadeIn 0.5s ease-out forwards ${index * 0.15}s`
            }}
          >
            <div className="p-6 flex flex-col items-center text-center h-full">
              <div className="bg-[#1D3557] p-4 rounded-lg mb-4 border border-[#4CC9F0]/30 shadow-[0_0_10px_rgba(76,201,240,0.2)]">
                {section.icon}
              </div>
              <h3 className="text-2xl font-silkscreen text-[#4CC9F0] mb-2">{section.title}</h3>
              <p className="text-sm font-caveat text-white">{section.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <div className="relative z-10 mt-auto pb-8 text-center">
        <p className="font-caveat text-xl text-[#A3F7BF]">Made with love <span className="text-[#4CC9F0] animate-pulse-gentle inline-block">💙</span></p>
        <p className="mt-2 font-caveat text-white/70">and rage :3</p>
        
        {/* Birthday message with sparkle effect */}
        <div className="mt-6 relative">
          <span className="inline-block text-2xl font-bold text-[#4CC9F0] animate-pixel-rainbow"
                style={{ textShadow: "0 0 10px rgba(76, 201, 240, 0.5)" }}>
            ✨ Happy Birthday Sara! ✨
          </span>
        </div>
        
        {/* Logout button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={handleLogout}
            className="p-2 bg-[#1D3557]/50 rounded-full border border-[#4CC9F0]/30 hover:bg-[#1D3557]/80 transition-colors"
            aria-label="Log out"
          >
            <LogOut size={20} className="text-[#4CC9F0]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
