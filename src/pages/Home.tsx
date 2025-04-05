
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import UserAvatar from "@/components/home/UserAvatar";
import SectionGrid from "@/components/home/SectionGrid";
import HomeFooter from "@/components/home/HomeFooter";
import SparkleEffect from "@/components/effects/SparkleEffect";
import { homeSections } from "@/data/homeSections";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAudio } from "@/contexts/AudioContext";

const Home = () => {
  const [showContent, setShowContent] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const audioContext = useAudio();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleLogout = () => {
    audioContext.stopAndReset();
    
    localStorage.removeItem("saraAccessGranted");
    toast({
      title: "Bye Bye 👋",
      description: "Miss you already! 😢",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-sara-pixelBg p-4 sm:p-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="/lovable-uploads/f50ed068-b0aa-414d-a993-85e567d482cc.png" 
          alt="Forest Background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-sara-pixelBg/80"></div>
        
        <SparkleEffect />
      </div>
      
      {/* Logout Button */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={handleLogout}
          className="p-2 bg-sara-pixel6/50 rounded-full border border-sara-pixel4/30 hover:bg-sara-pixel6/80 transition-colors"
          aria-label="Log out"
        >
          <LogOut size={20} className="text-sara-pixel4" />
        </button>
      </div>
      
      <div className="relative z-10 w-full max-w-4xl text-center mt-8 mb-10">
        <UserAvatar />
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <SectionGrid sections={homeSections} />
      </div>

      <div className="relative z-10">
        <HomeFooter />
      </div>
    </div>
  );
};

export default Home;
