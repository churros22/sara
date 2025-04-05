
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAudio } from "@/contexts/AudioContext";

const HomeFooter = () => {
  const { toast } = useToast();
  const audioContext = useAudio();
  const navigate = useNavigate();

  const handleLogout = () => {
    audioContext.stopAndReset();
    
    localStorage.removeItem("saraAccessGranted");
    toast({
      title: "Bye Bye 👋",
      description: "Miss you already! 😢",
    });
    navigate("/");
  };

  return (
    <div className="mt-auto pb-8 text-center">
      <p className="font-caveat text-xl text-[#A3F7BF]">Made with love <span className="text-[#4CC9F0] animate-pulse-gentle inline-block">💙</span></p>
      <p className="mt-2 font-caveat text-white/70">and rage :3</p>
      
      <div className="mt-6 relative">
        <span className="inline-block text-2xl font-bold text-[#4CC9F0] animate-pixel-rainbow"
              style={{ textShadow: "0 0 10px rgba(76, 201, 240, 0.5)" }}>
          ✨ Happy Birthday Sara! ✨
        </span>
      </div>
      
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="p-2 bg-[#1D3557]/50 rounded-full border border-[#4CC9F0]/30 hover:bg-[#1D3557]/80 transition-colors"
          aria-label="Log out"
        >
          <LogOut size={20} className="text-[#4CC9F0]" />
        </button>
      </div>
    </div>
  );
};

export default HomeFooter;
