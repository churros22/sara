
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft, Home } from "lucide-react";
import { useDeviceState } from "@/hooks/use-device-state";
import { motion } from "framer-motion";

/**
 * Saraprise Page Component
 * A special surprise page for Sara with embedded content
 */
const Saraprise = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const { state, recordVisit, saveScrollPosition } = useDeviceState("gift");

  // Record visit to this device
  useEffect(() => {
    recordVisit();
  }, [recordVisit]);

  // Set loading state after initial render
  useEffect(() => {
    // Mark as loaded after a short delay for initial animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Handle iframe loading with a timeout fallback
  useEffect(() => {
    // Fallback in case the iframe's onLoad event doesn't trigger
    const fallbackTimer = setTimeout(() => {
      setIsIframeLoading(false);
    }, 4000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  // Save scroll position when user scrolls
  useEffect(() => {
    if (!containerRef.current) return;
    
    const handleScroll = () => {
      if (containerRef.current) {
        saveScrollPosition(containerRef.current.scrollTop);
      }
    };
    
    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);
    
    // Restore scroll position from saved state
    if (state && state.scrollPosition) {
      container.scrollTop = state.scrollPosition;
    }
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [state, saveScrollPosition]);

  /**
   * Handle iframe load event
   * Adds a small delay to ensure smooth transition
   */
  const handleIframeLoad = () => {
    // Short delay to ensure smooth transition
    setTimeout(() => {
      setIsIframeLoading(false);
    }, 300);
  };

  /**
   * Navigate back to the desktop view
   */
  const goToDesktop = () => {
    navigate("/home");
  };

  return (
    <motion.div 
      className="min-h-screen w-full bg-gradient-to-br from-sara-pink/20 via-background to-sara-purple/20"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5 }}
      ref={containerRef}
    >
      <div className="container py-8">
        {/* Header with back button and home button */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-muted transition-colors animate-pulse-gentle"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold font-pixel pixel-shadow animate-scale-in">Saraprise</h1>
          <button
            onClick={goToDesktop}
            className="p-2 rounded-full hover:bg-muted transition-colors animate-pulse-gentle"
            aria-label="Go to desktop"
          >
            <Home size={24} />
          </button>
        </div>

        {/* Gift box opening animation */}
        <motion.div 
          className="max-w-screen-sm mx-auto glass p-4 rounded-2xl shadow-lg"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Enhanced loading indicator */}
          {isIframeLoading && (
            <div className="w-full h-[400px] flex flex-col items-center justify-center rounded-lg bg-black/5 backdrop-blur-sm">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-lg font-pixel text-primary">Opening your gift...</p>
              <p className="text-sm text-muted-foreground mt-2">Be patient Patrice</p>
            </div>
          )}

          {/* Embed the external HTML page - removed borders and margins */}
          <iframe
            src="./assets/index_saraprise.html"
            title="Saraprise Content"
            className={`relative w-full rounded-lg transition-opacity duration-500 ${isIframeLoading ? "opacity-0" : "opacity-100"}`}
            onLoad={handleIframeLoad}
            style={{ 
              overflow: "hidden", 
              border: "none", 
              margin: 0, 
              padding: 0, 
              height: "500px"
            }}
          ></iframe>

          {/* Additional content: Pictures and text */}
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4">A Special Message for Sara</h2>
            <p className="text-lg mb-6">
              Sara, you are an amazing person, and this is a small token of appreciation for all the joy you bring to our lives.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.img
                src="./assets/images/sara_1.jpg"
                alt="Sara smiling"
                className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <motion.img
                src="./assets/images/sara_2.jpg"
                alt="Sara enjoying her day"
                className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </div>
            <p className="text-lg mt-6">
              We hope this day brings you as much happiness as you bring to everyone around you. Happy Birthday, Sara!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Saraprise;
