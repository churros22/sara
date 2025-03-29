
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EntryScreen from "@/components/EntryScreen";
import WelcomeScreen from "@/components/WelcomeScreen";

const Index = () => {
  const [accessGranted, setAccessGranted] = useState(false);
  const navigate = useNavigate();

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
        <div className="animate-fade-in">
          <WelcomeScreen />
        </div>
      ) : (
        <EntryScreen onAccessGranted={handleAccessGranted} />
      )}
    </div>
  );
};

export default Index;
