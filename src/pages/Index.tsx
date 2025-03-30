
import { useState, useEffect } from "react";
import EntryScreen from "@/components/EntryScreen";
import WelcomeScreen from "@/components/WelcomeScreen";
import { useAudio } from "@/contexts/AudioContext";
import { preloadAssets } from "@/utils/preload";

const Index = () => {
  const [accessGranted, setAccessGranted] = useState(false);
  const audio = useAudio();

  // Check localStorage on component mount
  useEffect(() => {
    const hasAccess = localStorage.getItem("saraAccessGranted") === "true";
    if (hasAccess) {
      setAccessGranted(true);
      // Start preloading assets as soon as we know the user is logged in
      preloadAssets();
    }
  }, []);

  const handleAccessGranted = () => {
    // Store access granted status in localStorage
    localStorage.setItem("saraAccessGranted", "true");
    setAccessGranted(true);
    // Preload assets immediately after login
    preloadAssets();
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
        <WelcomeScreen />
      ) : (
        <EntryScreen onAccessGranted={handleAccessGranted} />
      )}
    </div>
  );
};

export default Index;
