
import { useState, useEffect } from "react";
import EntryScreen from "@/components/EntryScreen";
import WelcomeScreen from "@/components/WelcomeScreen";

const Index = () => {
  const [accessGranted, setAccessGranted] = useState(false);

  // Check localStorage on component mount
  useEffect(() => {
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
