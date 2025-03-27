
import { useState, FormEvent } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface EntryScreenProps {
  onAccessGranted: () => void;
}

const EntryScreen = ({ onAccessGranted }: EntryScreenProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    
    setIsLoading(true);
    
    // Check if it's Sara's birthday - 11-04
    setTimeout(() => {
      if (password === "11-04") {
        onAccessGranted();
      } else {
        setError("That's not the correct password. Try again! 💕");
        setIsLoading(false);
      }
    }, 800); // Small delay for effect
  };

  // Pixel art decorations
  const pixelArts = [
    "🎀", "🎁", "🍰", "🧁", "🍭", "🎈", "✨", "💖", "🎊", "🦄", "🌈", "🍬"
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 bg-gradient-to-br from-sara-pastel5 via-background to-sara-pastel4">
      {/* Pixel art decorations */}
      {pixelArts.map((emoji, index) => (
        <div 
          key={index}
          className="absolute animate-float text-4xl md:text-5xl"
          style={{ 
            top: `${Math.random() * 80 + 5}%`, 
            left: `${Math.random() * 80 + 5}%`,
            animationDelay: `${index * 0.3}s`,
            transform: `rotate(${Math.random() * 20 - 10}deg)`
          }}
        >
          {emoji}
        </div>
      ))}
      
      <div className={cn(
        "w-full max-w-md glass p-6 sm:p-8 rounded-2xl animate-fade-in shadow-lg border-2",
        "border-sara-pink/30 backdrop-blur-lg",
        isMobile ? "mx-4" : ""
      )}>
        <div className="text-center mb-8">
          <div className="mb-4 flex justify-center">
            <div className="w-20 h-20 bg-sara-pink/30 rounded-full flex items-center justify-center animate-pulse-gentle">
              <span className="text-4xl">🔐</span>
            </div>
          </div>
          <h1 className="text-3xl font-caveat font-bold text-primary mb-2">Hello there! 👋</h1>
          <p className="text-muted-foreground font-caveat text-xl">Please enter the password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-primary font-caveat text-lg">
              Password
            </label>
            <input
              id="password"
              type="text"
              placeholder="Enter password"
              className={cn(
                "w-full px-4 py-3 rounded-lg bg-background border-2 font-vt323 text-xl",
                "focus:ring-2 focus:ring-primary/20 outline-none transition-all",
                error ? "border-destructive" : "border-sara-pink/50"
              )}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {error && (
              <p className="text-destructive text-sm font-caveat animate-pixel-bounce text-lg">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full py-3 px-4 rounded-lg font-medium transition-all",
              "bg-sara-pink text-primary-foreground font-press text-xs sm:text-sm",
              "pixel-border hover:translate-y-[-2px] active:translate-y-[1px]",
              "hover:bg-sara-pink/90 focus:outline-none",
              isLoading && "opacity-70 cursor-not-allowed"
            )}
          >
            {isLoading ? "Checking... 🔍" : "Enter ✨"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground italic font-caveat text-lg">
            Hint: It's Sara's birthday! (DD-MM) 💫
          </p>
        </div>
      </div>
    </div>
  );
};

export default EntryScreen;
