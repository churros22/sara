
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import UserAvatar from "@/components/home/UserAvatar";
import SectionGrid from "@/components/home/SectionGrid";
import HomeFooter from "@/components/home/HomeFooter";
import SparkleEffect from "@/components/effects/SparkleEffect";
import { homeSections } from "@/data/homeSections";

const Home = () => {
  const [showContent, setShowContent] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#1D3557] p-4 sm:p-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="/lovable-uploads/f50ed068-b0aa-414d-a993-85e567d482cc.png" 
          alt="Forest Background" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-[#1D3557]/70"></div>
        
        <SparkleEffect />
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
