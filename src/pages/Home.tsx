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
  const {
    toast
  } = useToast();
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
      description: "Miss you already! 😢"
    });
    navigate("/");
  };
  return <div className="min-h-screen w-full flex flex-col bg-sara-pixelBg p-4 sm:p-8 relative overflow-hidden">
      {/* Background with just forest on top */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Forest image only at the top portion */}
        <div className="relative h-1/3">
          <img src="/lovable-uploads/f50ed068-b0aa-414d-a993-85e567d482cc.png" alt="Forest Background" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-[#39829e]/10 mx-[42px] px-0 my-[53px] py-0"></div>
        </div>
        
        <SparkleEffect />
      </div>
      
      {/* Logout Button */}
      <div className="absolute top-4 right-4 z-20">
        <button onClick={handleLogout} className="p-2 bg-sara-pixel6/50 rounded-full border border-sara-pixel4/30 hover:bg-sara-pixel6/80 transition-colors" aria-label="Log out">
          <LogOut size={20} className="text-sara-pixel4" />
        </button>
      </div>
      
      {/* Avatar moved to top left */}
      <div className="relative z-10 self-start mt-6 ml-6">
        <UserAvatar />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto mt-12">
        <SectionGrid sections={homeSections} />
      </div>

      <div className="relative z-10 mt-auto">
        <HomeFooter />
      </div>
    </div>;
};
export default Home;