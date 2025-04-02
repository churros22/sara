
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EntryScreen from "@/components/EntryScreen";
import { useAudio } from "@/contexts/AudioContext";
import { preloadAssets } from "@/utils/preload";

/**
 * Index Page Component
 * Landing/authentication page with entry screen
 */
const Index = () => {
  const [accessGranted, setAccessGranted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const audio = useAudio();
  const navigate = useNavigate();

  // Initial setup and preloading
  useEffect(() => {
    // Start preloading assets right away, regardless of login status
    preloadAssets();
    
    // Check localStorage for access status
    const hasAccess = localStorage.getItem("saraAccessGranted") === "true";
    
    if (hasAccess) {
      setAccessGranted(true);
      // Use navigate instead of directly rendering Home component, with replace to prevent back button issues
      navigate("/home", { replace: true });
    }
    
    // Remove loading state
    setIsLoading(false);
  }, [navigate]);

  // Make sure audio is completely stopped when on login screen
  useEffect(() => {
    // Always stop and reset audio when on Index page
    audio.stopAndReset();
    
    // Cleanup on unmount
    return () => {
      if (accessGranted) {
        // If we're navigating away from index after gaining access,
        // we don't need to stop audio because we want it to play on the next page
      } else {
        audio.stopAndReset();
      }
    };
  }, [audio, accessGranted]);

  /**
   * Handle access granted
   * Updates localStorage and navigates to home
   */
  const handleAccessGranted = () => {
    // Store access granted status in localStorage
    localStorage.setItem("saraAccessGranted", "true");
    setAccessGranted(true);
    
    // Navigate to home using router with replace to prevent back button issues
    navigate("/home", { replace: true });
  };

  // Show loading indicator while checking access status
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-sara-pixelBg">
        <div className="w-12 h-12 border-4 border-sara-pixel3 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      {!accessGranted && <EntryScreen onAccessGranted={handleAccessGranted} />}
    </div>
  );
};

export default Index;
