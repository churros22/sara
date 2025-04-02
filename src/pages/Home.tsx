
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { LogOut } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { useAudio } from "@/contexts/AudioContext";
import { Skeleton } from "@/components/ui/skeleton";
import AnimatedWrap from "@/components/AnimatedWrap";
import DesktopEnvironment from "@/components/DesktopEnvironment";

/**
 * Home Page Component
 * Main landing page after login with 3D immersive desktop environment
 */
const Home = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const audioContext = useAudio();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Motion values for parallax scrolling effect
  const scrollY = useMotionValue(0);
  const y = useTransform(scrollY, [0, 300], [0, -50]);

  // App sections with detailed descriptions for reference
  const sections = [
    {
      id: "saranterest",
      title: "Saranterest",
      description: "Browse beautiful images and get inspired (or torture your heart :3)",
      color: "sara-pixel3",
      icon: (
        <svg className="w-5 h-5 text-sara-pixel5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: "googolu",
      title: "Googolu",
      description: "Search for anything and everything, even your name!",
      color: "sara-pixel2",
      icon: (
        <svg className="w-5 h-5 text-sara-pixel5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.2 20.6L17.6 16c1.3-1.6 2-3.6 2-5.7 0-5-4-9-9-9s-9 4-9 9 4 9 9 9c2.1 0 4.1-.7 5.7-2l4.6 4.6c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.3zM10.7 3.3c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7z" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: "saratify",
      title: "Saratify",
      description: "Enjoy your favorite songs and playlists, selected just for you",
      color: "sara-pixel1",
      icon: (
        <svg className="w-5 h-5 text-sara-pixel5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: "saraprise",
      title: "Saraprise",
      description: "A little something for a little someone :3",
      color: "sara-pixel4",
      icon: (
        <svg className="w-5 h-5 text-sara-pixel5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 12V22H4V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 7H2V12H22V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 22V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 7H16.5C17.3284 7 18 6.32843 18 5.5C18 4.67157 17.3284 4 16.5 4C15.6716 4 15 4.67157 15 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 7H7.5C6.67157 7 6 6.32843 6 5.5C6 4.67157 6.67157 4 7.5 4C8.32843 4 9 4.67157 9 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        scrollY.set(window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  // Fade in content after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  /**
   * Handle logout
   * Clears localStorage and stops audio playback
   */
  const handleLogout = () => {
    // Stop all audio and clear context when logging out
    audioContext.stopAndReset();
    
    localStorage.removeItem("saraAccessGranted");
    localStorage.removeItem("desktopLastVisited"); // Clear desktop state on logout
    
    toast({
      title: "Bye Bye 👋",
      description: "Miss you already! 😢",
    });
    navigate("/", { replace: true });
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen w-full flex flex-col items-center justify-center bg-sara-pixelBg p-4 sm:p-8 overflow-x-hidden relative"
      style={{ 
        perspective: "1500px",
        transformStyle: "preserve-3d"
      }}
    >
      {/* 3D environment background with depth */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Distant background layer */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-sara-pixel1/10 to-sara-pixel2/5"
          style={{ y, transformStyle: "preserve-3d", transform: "translateZ(-200px)" }}
        />
        
        {/* Mid-distance elements */}
        <motion.div 
          className="absolute inset-0 bg-grid opacity-5"
          style={{ y: useTransform(scrollY, [0, 300], [0, -30]), transformStyle: "preserve-3d", transform: "translateZ(-100px)" }}
        />
        
        {/* Foreground elements */}
        <motion.div 
          className="absolute inset-0 pointer-events-none bg-scanlines opacity-20"
          style={{ transformStyle: "preserve-3d", transform: "translateZ(-50px)" }}
        />
      </div>
      
      {/* 3D Pixel Character with skeleton loading */}
      <motion.div 
        className="absolute top-40 sm:top-12 left-11 transform -translate-x-1/2 w-11 h-11 pixel-character-container"
        style={{ 
          transformStyle: "preserve-3d", 
          transform: "translateZ(50px) rotateY(10deg)",
          filter: "drop-shadow(0 10px 8px rgb(0 0 0 / 0.3))"
        }}
        animate={{
          rotateY: [10, -10, 10],
          y: [0, -5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {!imageLoaded && (
          <div className="w-full h-full">
            <Skeleton className="w-full h-full bg-sara-pixel3/20 animate-pulse-gentle" />
          </div>
        )}
        <img 
          src="/lovable-uploads/6ce3c4f5-4273-48e0-82f0-c8022f62c515.png" 
          alt="Pixel Character" 
          className={`w-full h-full object-contain ${imageLoaded ? 'block' : 'hidden'}`}
          onLoad={() => setImageLoaded(true)}
          style={{ transformStyle: "preserve-3d" }}
        />
      </motion.div>
      
      <div className="relative w-full max-w-4xl z-10 mt-36 sm:mt-40" style={{ transformStyle: "preserve-3d" }}>
        {/* Logout button with 3D effect */}
        <motion.div 
          className={`absolute top-2 right-2 z-10 flex gap-2 ${isMobile ? 'scale-75 origin-top-right' : ''}`}
          whileHover={{ 
            scale: 1.1,
            rotateY: 10,
            z: 10
          }}
          style={{ 
            transformStyle: "preserve-3d", 
            transform: "translateZ(30px)"
          }}
        >
          <button
            onClick={handleLogout}
            className="pixel-button-small p-2 transition-all duration-300"
            style={{ 
              transformStyle: "preserve-3d",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1), 0 3px 5px rgba(0,0,0,0.2)"
            }}
            aria-label="Log out"
          >
            <LogOut size={isMobile ? 16 : 20} className="text-sara-pixel4" />
          </button>
        </motion.div>

        {/* Header section with welcome message */}
        <AnimatedWrap animation="fade-in">
          <motion.div 
            className={`text-center mb-6 ${showContent ? 'animate-fade-in' : 'opacity-0'}`}
            style={{ 
              transformStyle: "preserve-3d", 
              transform: "translateZ(20px)"
            }}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl font-press font-bold mb-4 text-sara-pixel5 pixel-text-glow animate-scale-in"
              animate={{ 
                textShadow: ["0 0 10px rgba(59, 130, 246, 0.3)", "0 0 20px rgba(59, 130, 246, 0.5)", "0 0 10px rgba(59, 130, 246, 0.3)"]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Hi Sara!
            </motion.h1>
            
            <div 
              className="w-12 h-1 bg-sara-pixel3 mx-auto my-3 rounded-none pixel-border"
              style={{ 
                transformStyle: "preserve-3d", 
                transform: "translateZ(15px)",
                boxShadow: "0 3px 10px rgba(59, 130, 246, 0.3)"
              }}
            ></div>
            
            <motion.p 
              className="text-xl font-press text-sara-pixel4 px-4 animate-fade-in" 
              style={{ 
                animationDelay: '0.3s',
                transformStyle: "preserve-3d", 
                transform: "translateZ(10px)"
              }}
            >
              Welcome to your 3D interactive desktop 🎉 
            </motion.p>
            
            <motion.p 
              className="text-xl font-press text-sara-pixel4 px-4 animate-fade-in" 
              style={{ 
                animationDelay: '0.3s',
                transformStyle: "preserve-3d", 
                transform: "translateZ(10px)"
              }}
            >
              Click on any device to explore
            </motion.p>
          </motion.div>
        </AnimatedWrap>

        {/* 3D Desktop Environment Component */}
        <AnimatedWrap animation="fade-in" delay={0.2}>
          <DesktopEnvironment />
        </AnimatedWrap>
      </div>

      {/* Footer with animated birthday message */}
      <motion.div 
        className={`mt-6 text-center text-sm text-sara-pixel4 ${showContent ? 'animate-fade-in' : 'opacity-0'}`} 
        style={{ 
          animationDelay: '0.4s', 
          position: 'relative', 
          zIndex: 10,
          transformStyle: "preserve-3d", 
          transform: "translateZ(40px)"
        }}
        whileHover={{
          scale: 1.05,
          rotateX: 5
        }}
      >
        <p className="font-press text-lg">Made with love 💙</p>
        <p className="mt-2 font-press">and rage :3 </p>
        <motion.div 
          className="mt-2 font-pixel"
          animate={{
            y: [0, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="inline-block animate-pixel-rainbow font-bold pixel-text-glow">✨ Happy Birthday Sara! ✨</span>
        </motion.div>
      </motion.div>
      
      {/* 3D room elements to create depth */}
      <motion.div 
        className="absolute -bottom-4 left-0 right-0 h-20 bg-gradient-to-t from-sara-pixel1/20 to-transparent"
        style={{ 
          transformStyle: "preserve-3d", 
          transform: "translateZ(-50px) rotateX(45deg)",
          filter: "blur(3px)"
        }}
      />
      
      {/* 3D desk surface */}
      <motion.div 
        className="absolute -bottom-40 left-0 right-0 h-40 bg-[url('/lovable-uploads/a6c47b86-9b3d-401d-b3c0-7ac35e32d347.png')] bg-cover opacity-30"
        style={{ 
          transformStyle: "preserve-3d", 
          transform: "translateZ(-30px) rotateX(60deg)",
          transformOrigin: "bottom"
        }}
      />
    </div>
  );
};

export default Home;
