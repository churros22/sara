
import { useState, useEffect } from "react";
import EntryScreen from "@/components/EntryScreen";
import Home from "@/pages/Home";
import { useAudio } from "@/contexts/AudioContext";
import { preloadAssets } from "@/utils/preload";

const Index = () => {
  const [accessGranted, setAccessGranted] = useState(false);
  const audio = useAudio();

  // Start preloading assets immediately when the page loads
  useEffect(() => {
    // Start preloading assets right away, regardless of login status
    preloadAssets();
    
    // Check localStorage for access status
    const hasAccess = localStorage.getItem("saraAccessGranted") === "true";
    if (hasAccess) {
      setAccessGranted(true);
    }
  }, []);

  const handleAccessGranted = () => {
    // Store access granted status in localStorage
    localStorage.setItem("saraAccessGranted", "true");
    setAccessGranted(true);
  };

  // Make sure audio is stopped when on login screen
  useEffect(() => {
    if (!accessGranted) {
      audio.stopAndReset();
    }
  }, [accessGranted, audio]);

  return (
    <div className="min-h-screen w-full">
      {accessGranted ? (
        <Home />
      ) : (
        <EntryScreen onAccessGranted={handleAccessGranted} />
      )}
    </div>
  );
};

export default Index;
