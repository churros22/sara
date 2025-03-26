
import { useState, FormEvent } from "react";
import { cn } from "@/lib/utils";

interface EntryScreenProps {
  onAccessGranted: () => void;
}

const EntryScreen = ({ onAccessGranted }: EntryScreenProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 bg-gradient-to-br from-sara-pink/20 via-background to-sara-purple/20">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 animate-float text-4xl">🎂</div>
      <div className="absolute top-20 right-20 animate-float text-4xl" style={{ animationDelay: "0.5s" }}>🎁</div>
      <div className="absolute bottom-20 left-20 animate-float text-4xl" style={{ animationDelay: "1s" }}>🎈</div>
      <div className="absolute bottom-10 right-10 animate-float text-4xl" style={{ animationDelay: "1.5s" }}>✨</div>
      
      <div className="w-full max-w-md glass p-8 rounded-2xl animate-fade-in shadow-lg border-2 border-sara-pink/30">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Hello there! 👋</h1>
          <p className="text-muted-foreground">Please enter the password to continue</p>
          <div className="mt-4 text-5xl">🔐</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-primary">
              Password
            </label>
            <input
              id="password"
              type="text"
              placeholder="Enter password"
              className={cn(
                "w-full px-4 py-3 rounded-lg bg-background border-2 focus:ring-2 focus:ring-primary/20 outline-none transition-all",
                error ? "border-destructive" : "border-sara-pink/50"
              )}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {error && <p className="text-destructive text-sm">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full py-3 px-4 rounded-lg font-medium transition-all",
              "bg-sara-pink text-primary-foreground hover:bg-sara-pink/90",
              "focus:outline-none focus:ring-2 focus:ring-primary/20",
              isLoading && "opacity-70 cursor-not-allowed"
            )}
          >
            {isLoading ? "Checking... 🔍" : "Enter ✨"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground italic">
            Hint: It's Sara's birthday! (DD-MM) 💫
          </p>
        </div>
      </div>
    </div>
  );
};

export default EntryScreen;
