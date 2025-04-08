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
    <div className="min-h-screen w-full flex flex-col bg-sara-pixelBg relative overflow-hidden">
      {/* Background with just forest on top */}
      <div className="relative top-1 w-full overflow-hidden">
        <img
          src="/assets/images/bg_sara.png"
          className="w-full h-full object-cover opacity-90"
        />
        

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

        <SparkleEffect />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center mt-1 px-6 sm:px-8">
        <UserAvatar />

        <div className="w-auto mx-auto mt-6">
          <SectionGrid sections={homeSections} />
        </div>

        <div className="mt-auto w-full">
          <HomeFooter />
        </div>
      </div>
    </div>
  );
};

export default Home;