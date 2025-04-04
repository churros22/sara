
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface EntryScreenProps {
  onAccessGranted: () => void;
}

const EntryScreen = ({ onAccessGranted }: EntryScreenProps) => {
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const correctPassword = "1104"; // Sara's birthday 11-04

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === correctPassword) {
      onAccessGranted();
      toast({
        title: "Hooray! 🎉",
        duration: 1000,
      });
    } else {
      toast({
        title: "❌ Wrong Password",
        description: "Try again slow Sara 😜",
        variant: "destructive",
      });
      setPassword("");
    }
  };

  // Function to handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  // Pixel art decorations - carefully positioned to avoid overlap
  const pixelArts = [
    { emoji: "💙", top: 11, left: 50, delay: 0.8, },
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-sara-pixel6 via-sara-pixelBg to-sara-pixel1 p-4 relative overflow-hidden">
      {/* Scanlines effect */}
      <div className="absolute inset-0 bg-scanlines opacity-70 pointer-events-none"></div>
      
      {/* Pixel art decorations */}
      {pixelArts.map((item, index) => (
        <div 
          key={index}
          className="absolute animate-float text-3xl md:text-5xl pointer-events-none"
          style={{ 
            top: `${item.top}%`, 
            left: `${item.left}%`,
            animationDelay: `${item.delay}s`,
            zIndex: 1,
            opacity: 0.7
          }}
        >
          {item.emoji}
        </div>
      ))}

      {/* Pixel Character */}
      <div className="absolute top-20 left-50 transform -translate-x-1/2 w-32 h-32 pixel-character-container">
        <img 
          src="/lovable-uploads/6ce3c4f5-4273-48e0-82f0-c8022f62c515.png" 
          alt="Pixel Character" 
          className="w-full h-full object-contain"
        />
      </div>

      <div className="w-full max-w-md relative mt-32">
        <div 
          className="bg-sara-pixelBg backdrop-blur-lg rounded-none shadow-lg p-8 border-2 border-sara-pixel3 transition-all"
          style={{ boxShadow: "4px 4px 0 rgba(59, 130, 246, 0.4)" }}
        >
          <div className="pixel-shadow mb-6 text-center">
            <h1 className="text-2xl font-pixelated font-bold text-sara-pixel5 mb-2">
              <span className="animate-pixel-rainbow inline-block">Hello Sara!</span> 
              <span className="inline-block ml-2">💙</span>
            </h1>
            <p className="text-sm font-vt323 text-sara-pixel4"></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-vt323 font-bold text-sara-pixel5 mb-2">
                Enter Password:
              </label>
              <p className="font-vt323 text-xs text-sara-green mb-4">
                Hint: Your special day is the key (format: DayMonth)
              </p>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Example : 0122"
                className="w-full px-4 py-3 rounded-none border-2 border-sara-pixel3 bg-sara-pixel6 font-vt323 focus:outline-none text-center text-xl tracking-widest text-sara-pixel5"
                autoFocus
                style={{ boxShadow: "2px 2px 0 rgba(59, 130, 246, 0.4)" }}
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-sara-pixel2 text-white rounded-none font-silkscreen text-sm hover:bg-sara-pixel3 transition-colors"
              style={{ boxShadow: "2px 2px 0 rgba(59, 130, 246, 0.4)" }}
            >
              Enter ▶
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <p className="font-press text-sm text-sara-pixel4">
              Press Enter to continue 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryScreen;
