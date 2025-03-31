
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import EntryScreen from "@/components/EntryScreen";
import { useAudio } from "@/contexts/AudioContext";
import { preloadAssets } from "@/utils/preload";

const Index = () => {
  const [accessGranted, setAccessGranted] = useState(false);
  const audio = useAudio();
  const navigate = useNavigate();

  // Start preloading assets immediately when the page loads
  useEffect(() => {
    // Start preloading assets right away, regardless of login status
    preloadAssets();
    
    // Check localStorage for access status
    const hasAccess = localStorage.getItem("saraAccessGranted") === "true";
    if (hasAccess) {
      setAccessGranted(true);
      // Use navigate instead of directly rendering Home component
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  const handleAccessGranted = () => {
    // Store access granted status in localStorage
    localStorage.setItem("saraAccessGranted", "true");
    setAccessGranted(true);
    // Navigate to home using router with replace to prevent back button issues
    navigate("/home", { replace: true });
  };

  // Make sure audio is completely stopped when on login screen
  useEffect(() => {
    // Always stop and reset audio when on Index page
    audio.stopAndReset();
  }, [audio]);

  return (
    <div className="min-h-screen w-full">
      {!accessGranted && <EntryScreen onAccessGranted={handleAccessGranted} />}
    </div>
  );
};

export default Index;
