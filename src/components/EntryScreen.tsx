
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

  // Animations for butterflies
  const butterflies = [
    { top: 15, left: 10, delay: 0.2, size: 20 },
    { top: 25, left: 80, delay: 1.2, size: 16 },
    { top: 60, left: 85, delay: 0.8, size: 12 },
    { top: 70, left: 15, delay: 1.5, size: 14 },
    { top: 40, left: 50, delay: 0.5, size: 18 },
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#1D3557] p-4 relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/f50ed068-b0aa-414d-a993-85e567d482cc.png" 
          alt="Forest Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1D3557]/70"></div>
      </div>
      
      {/* Fireflies/butterflies effect */}
      {butterflies.map((item, index) => (
        <div 
          key={index}
          className="absolute animate-float z-10 text-[#A3F7BF] pointer-events-none"
          style={{ 
            top: `${item.top}%`, 
            left: `${item.left}%`,
            animationDelay: `${item.delay}s`,
            fontSize: `${item.size}px`,
            filter: "drop-shadow(0 0 5px rgba(163, 247, 191, 0.8))"
          }}
        >
          🦋
        </div>
      ))}

      {/* Pixel Character with glow */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-32 h-32 z-10">
        <div className="absolute inset-0 rounded-full bg-[#4CC9F0] blur-lg opacity-70 animate-pulse-gentle"></div>
        <img 
          src="/lovable-uploads/6ce3c4f5-4273-48e0-82f0-c8022f62c515.png" 
          alt="Pixel Character" 
          className="w-full h-full object-contain relative z-20"
        />
      </div>

      <div className="w-full max-w-md relative z-20 mt-32">
        <div 
          className="backdrop-blur-lg rounded-lg shadow-lg p-8 border-2 border-[#4CC9F0]"
          style={{ backgroundColor: "rgba(29, 53, 87, 0.8)", boxShadow: "0 0 20px rgba(76, 201, 240, 0.3)" }}
        >
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-[#4CC9F0] mb-2"
                style={{ textShadow: "0 0 10px rgba(76, 201, 240, 0.5)" }}>
              <span className="animate-pixel-rainbow inline-block">Hello Sara!</span> 
              <span className="inline-block ml-2">💙</span>
            </h1>
            <div className="w-24 h-1 bg-[#4CC9F0] mx-auto my-3 rounded-full shadow-[0_0_8px_rgba(76,201,240,0.6)]"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-lg font-medium text-[#4CC9F0] mb-2">
                Enter Password:
              </label>
              <p className="text-sm text-[#A3F7BF] mb-4">
                Hint: Your special day is the key (format: DayMonth)
              </p>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Example: 0122"
                className="w-full px-4 py-3 rounded-md border-2 border-[#4CC9F0] bg-[#1D3557]/50 focus:outline-none focus:ring-2 focus:ring-[#4CC9F0] focus:border-transparent text-center text-xl tracking-widest text-white"
                autoFocus
                style={{ boxShadow: "0 0 10px rgba(76, 201, 240, 0.2)" }}
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#4CC9F0] hover:bg-[#4CC9F0]/80 text-[#1D3557] font-bold rounded-md transition-colors shadow-lg"
              style={{ boxShadow: "0 0 10px rgba(76, 201, 240, 0.3)" }}
            >
              Enter ▶
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-white/70">
              Press Enter to continue
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryScreen;
