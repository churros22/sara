
import { useAudio } from "@/contexts/AudioContext";

const HomeFooter = () => {
  const audioContext = useAudio();

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
    </div>
  );
};

export default HomeFooter;
