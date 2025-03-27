
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
        title: "🎉 Welcome!",
        description: "Access granted. Enjoy your special place!",
      });
    } else {
      toast({
        title: "❌ Incorrect password",
        description: "Please try again with the correct password.",
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
    { emoji: "🎂", top: 10, left: 85, delay: 0.2 },
    { emoji: "🎁", top: 80, left: 10, delay: 0.5 },
    { emoji: "🎈", top: 15, left: 15, delay: 0.8 },
    { emoji: "✨", top: 75, left: 85, delay: 1.1 },
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-sara-retro1/20 via-background to-sara-retro3/20 p-4">
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

      <div className="w-full max-w-md relative">
        <div 
          className="bg-white/80 backdrop-blur-lg rounded-lg shadow-lg p-8 border-2 border-black transition-all"
          style={{ boxShadow: "4px 4px 0 rgba(0,0,0,0.8)" }}
        >
          <div className="pixel-shadow mb-6 text-center">
            <h1 className="text-3xl font-press text-primary mb-2">
              <span className="animate-rainbow inline-block">Sara's Space</span> 
              <span className="inline-block ml-2">🔐</span>
            </h1>
            <p className="text-sm font-vt323 text-gray-600">A special place just for you</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-vt323 text-gray-700 mb-2">
                Please enter the password:
              </label>
              <p className="font-vt323 text-xs text-gray-500 mb-4">
                Hint: Your special day is the key (format: MMDD)
              </p>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-md border-2 border-black font-vt323 focus:outline-none text-center text-xl tracking-widest"
                autoFocus
                style={{ boxShadow: "2px 2px 0 rgba(0,0,0,0.8)" }}
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-sara-retro3 text-white rounded-md font-press text-sm hover:bg-sara-retro3/90 transition-colors"
              style={{ boxShadow: "2px 2px 0 rgba(0,0,0,0.8)" }}
            >
              Enter ✨
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <p className="font-vt323 text-sm text-gray-500">
              This space contains a special birthday gift for Sara
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryScreen;
