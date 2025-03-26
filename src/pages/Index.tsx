
import { useState } from "react";
import EntryScreen from "@/components/EntryScreen";
import WelcomeScreen from "@/components/WelcomeScreen";

const Index = () => {
  const [accessGranted, setAccessGranted] = useState(false);

  const handleAccessGranted = () => {
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
