
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const Saraprise = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Mark as loaded after a short delay for initial animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle iframe loading with a timeout fallback
  useEffect(() => {
    // Progress simulation
    const progressInterval = setInterval(() => {
      setLoadProgress(prev => {
        const newValue = prev + (100 - prev) * 0.1;
        return Math.min(newValue, 99);
      });
    }, 300);
    
    // Fallback in case the iframe's onLoad event doesn't trigger
    const fallbackTimer = setTimeout(() => {
      setIsIframeLoading(false);
      setLoadProgress(100);
      clearInterval(progressInterval);
    }, 4000);
    
    return () => {
      clearTimeout(fallbackTimer);
      clearInterval(progressInterval);
    };
  }, []);

  const handleIframeLoad = () => {
    // Short delay to ensure smooth transition
    setTimeout(() => {
      setIsIframeLoading(false);
      setLoadProgress(100);
    }, 300);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-sara-pink/20 via-background to-sara-purple/20">
      <div className="container py-8">
        <div className="flex items-center mb-8 animate-fade-in">
          <button onClick={() => navigate("/home")} className="p-2 rounded-full hover:bg-muted transition-colors mr-4 animate-pulse-gentle" aria-label="Go back">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold font-pixelated pixel-shadow animate-scale-in">Saraprise</h1>
        </div>

        <div className="max-w-screen-sm mx-auto glass p-4 shadow-lg animate-fade-in rounded-sm">
          {/* Enhanced loading indicator */}
          {isIframeLoading && (
            <div className="w-full h-[400px] flex flex-col items-center justify-center rounded-lg bg-black/5 backdrop-blur-sm">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-lg font-pixel text-primary">Loading...</p>
              <p className="text-sm text-muted-foreground mt-2">Be patient Patrice</p>
              <div className="w-64 mt-4">
                <Progress value={loadProgress} className="h-2" />
              </div>
            </div>
          )}

          {/* Embed the external HTML page using an iframe with fixed height */}
          <ScrollArea className="h-[60vh]">
          <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg border border-muted bg-gradient-to-br from-sara-pink/10 via-background to-sara-purple/10">
            <iframe 
              src="./assets/index_saraprise.html" 
              title="Saraprise Content" 
              className={`relative w-full min-h-[400px] rounded-lg transition-opacity duration-500 ${isIframeLoading ? "opacity-0" : "opacity-100"}`}
              onLoad={handleIframeLoad} 
              style={{
                border: "none",
                height: "60vh"
              }}
            />
            {!isIframeLoading && (
             <div className="absolute inset-0 pointer-events-none border-2 border-primary rounded-lg animate-glow">
              
             </div>
            )}
          </div>
          </ScrollArea>

          {/* Newspaper-styled content */}
          <div className="mt-8 px-4 py-6 bg-[#f8f7f1] border border-[#e0ded7] shadow-md">
            {/* Newspaper header */}
            <div className="text-center border-b-2 border-black pb-2 mb-4">
              <h2 className="text-3xl font-bold font-serif tracking-tight uppercase">THE SARA TIMES</h2>
              <p className="text-xs uppercase tracking-widest">SPECIAL BIRTHDAY EDITION</p>
            </div>
            
            {/* Newspaper headline */}
            <h3 className="text-2xl font-serif font-bold mb-4 text-center">A Special Message for Sara</h3>
            
            {/* Two-column newspaper layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                {/* First column with text */}
                <p className="text-sm leading-relaxed font-serif first-letter:text-3xl first-letter:font-bold first-letter:float-left first-letter:mr-1">
                  Sara, you are an amazing person, and this is a small token of appreciation for all the joy you bring to our lives. Your kindness and warmth have touched everyone around you in ways you may never fully realize.
                </p>
                <p className="text-sm leading-relaxed font-serif">
                  We hope this day brings you as much happiness as you bring to everyone around you. Happy Birthday, Sara!
                </p>
                <div className="border border-gray-300 p-2 bg-gray-50 italic text-xs">
                  "The greatest gift you can give someone is your time, your attention, your love, your concern." — Sara's daily reminder
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Second column with images */}
                <div className="border p-1 bg-white shadow-sm">
                  <img src="./assets/images/sara_1.jpg" alt="Sara smiling" className="w-full h-auto sepia-[0.2]" />
                  <p className="text-xs italic pt-1 text-center">Sara enjoying her special day</p>
                </div>
                <div className="border p-1 bg-white shadow-sm">
                  <img src="./assets/images/sara_2.jpg" alt="Sara enjoying her day" className="w-full h-auto sepia-[0.2]" />
                  <p className="text-xs italic pt-1 text-center">A moment to remember</p>
                </div>
              </div>
            </div>

            {/* Newspaper footer with date */}
            <div className="mt-6 pt-2 border-t border-gray-400 flex justify-between text-xs text-gray-600">
              <span>The Sara Times | April 7, 2025</span>
              <span>Price: One Smile</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Saraprise;
