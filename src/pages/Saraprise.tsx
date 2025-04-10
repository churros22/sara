
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
          
          <div className="relative w-full h-auto rounded-lg overflow-hidden shadow-lg border border-muted bg-gradient-to-br from-sara-pink/10 via-background to-sara-purple/10">
            <iframe 
              src="./assets/index_saraprise.html" 
              title="Saraprise Content" 
              className={`relative w-full min-h-[200px] rounded-lg transition-opacity duration-500 ${isIframeLoading ? "opacity-0" : "opacity-100"}`}
              onLoad={handleIframeLoad} 
              style={{
                border: "none",
                height: "40vh"
              }}
            />
            {!isIframeLoading && (
             <div className="absolute inset-0 pointer-events-none border-2 border-primary rounded-lg animate-glow">
              
             </div>
            )}
          </div>
          

          {/* Newspaper-styled content */}
          <div className="mt-8 px-4 py-6 bg-[#f8f7f1] text-black border border-[#e0ded7] shadow-md">
            {/* Newspaper header */}
            <div className="text-center border-b-2 border-black pb-2 mb-4">
              <h2 className="text-3xl font-bold font-serif tracking-tight uppercase">THE MORNING NEWSPAPER</h2>
              <p className="text-xs uppercase tracking-widest">SPECIAL BIRTHDAY EDITION</p>
            </div>
            
            {/* Newspaper headline */}
            <h3 className="text-2xl font-serif font-bold mb-4 text-center">Such a lovely person</h3>
            
            {/* Two-column newspaper layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                {/* First column with text */}
                <p className="text-sm leading-relaxed font-serif first-letter:text-3xl first-letter:font-bold first-letter:float-left first-letter:mr-1">
                  Dear Sara, From a large collection of morning messages spanning months, 
                  From "Good الف morning ya ahla sara f denya kolha" to carefully crafted 
                  declarations of affection that would make Shakespeare envious. Comes one final morning newspaper.
                  <br />The universe can hardly contain its excitement today, because your special day has officially arrived. 
                  You’ve been described as a master playful Sara, an adorably slow Sara, a wonderfully moody Sara, and everything
                  in between—but from every angle, you’re pure magic.
                  Rumor has it, the only thing deadlier than your sharp wit is your brief encounter with that wood-cleaning liquid, 
                  yet through it all, you emerge unscathed—and hotter, apparently!
                  <br />
                  With every sunrise message I’ve ever written, I’ve tried to capture how precious you are—yet words never measure up
                  <br />
                </p>
                <p className="text-sm leading-relaxed font-serif">
                May your birthday be filled with moments that make you smile, adventures that excite you, and people who cherish you as much as you cherish them.
                <br />
                Thank you for being a million versions of perfection, all rolled into one incredible soul.
                </p>
                <div className="border border-gray-300 p-2 bg-gray-50 italic text-xs">
                  "The greatest gift you can give someone is your time, your attention, your love, your concern." — Things Sara would never say
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Second column with images */}
                <div className="border p-1 bg-white shadow-sm">
                  <img src="./assets/images/Screenshot_2025-04-11-00-15-19-883-edit_com.android.chrome.jpg" alt="Sara smiling" className="w-full h-auto sepia-[0.2]" />
                  <p className="text-xs italic pt-1 text-center">Good things</p>
                </div>
                <div className="border p-1 bg-white shadow-sm">
                  <img src="./assets/images/Screenshot_2025-04-11-00-14-23-166-edit_com.android.chrome.jpg" alt="Sara enjoying her day" className="w-full h-auto sepia-[0.2]" />
                  <p className="text-xs italic pt-1 text-center"> :3 </p>
                </div>
              </div>
            </div>
 {/* Newspaper headline */}
 <h3 className="text-2xl font-serif font-bold mb-2 text-center">Weather Forcast :</h3>
 <div className="border border-gray-300 p-1 bg-gray-50 italic text-center text-xs">
                  "100% CHANCE OF HAPPY TEARS"
                </div>
            {/* Newspaper footer with date */}
            <div className="mt-6 pt-2 border-t border-gray-400 flex justify-between text-xs text-gray-600">
              <span> | April 11, 2025</span>
              <span>Price $ : One Smile </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Saraprise;
