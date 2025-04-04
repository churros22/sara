
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";

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

          {/* Additional content: Pictures and text */}
          <div className="mt-8 text-center px-4">
            <h2 className="text-2xl font-bold mb-4">A Special Message for Sara</h2>
            <p className="text-lg mb-6">
              Sara, you are an amazing person, and this is a small token of appreciation for all the joy you bring to our lives.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <img src="./assets/images/sara_1.jpg" alt="Sara smiling" className="rounded-lg shadow-lg" />
              <img src="./assets/images/sara_2.jpg" alt="Sara enjoying her day" className="rounded-lg shadow-lg" />
            </div>
            <p className="text-lg mt-6">
              We hope this day brings you as much happiness as you bring to everyone around you. Happy Birthday, Sara!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Saraprise;
