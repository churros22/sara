
import { useState, useEffect, FormEvent } from "react";
import { cn } from "@/lib/utils";

interface EntryScreenProps {
  onAccessGranted: () => void;
}

const EntryScreen = ({ onAccessGranted }: EntryScreenProps) => {
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Format should be DD-MM
    if (!date.match(/^\d{2}-\d{2}$/)) {
      setError("Please enter a valid date format (DD-MM)");
      return;
    }

    setIsLoading(true);
    
    // Check if it's Sara's birthday - 11-04
    setTimeout(() => {
      if (date === "11-04") {
        onAccessGranted();
      } else {
        setError("That's not Sara's birthday. Try again!");
        setIsLoading(false);
      }
    }, 800); // Small delay for effect
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 bg-gradient-to-br from-sara-blue/10 via-background to-sara-pink/10">
      <div className="w-full max-w-md glass p-8 rounded-2xl animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Hello there!</h1>
          <p className="text-muted-foreground">Please enter Sara's birthday to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="date" className="block text-sm font-medium text-primary">
              Birthday (DD-MM)
            </label>
            <input
              id="date"
              type="text"
              placeholder="11-04"
              className={cn(
                "w-full px-4 py-3 rounded-lg bg-background border-2 focus:ring-2 focus:ring-primary/20 outline-none transition-all",
                error ? "border-destructive" : "border-input"
              )}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              autoFocus
            />
            {error && <p className="text-destructive text-sm">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full py-3 px-4 rounded-lg font-medium transition-all",
              "bg-primary text-primary-foreground hover:bg-primary/90",
              "focus:outline-none focus:ring-2 focus:ring-primary/20",
              isLoading && "opacity-70 cursor-not-allowed"
            )}
          >
            {isLoading ? "Checking..." : "Enter"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground italic">
            Hint: It's Sara's birthday! (DD-MM)
          </p>
        </div>
      </div>
    </div>
  );
};

export default EntryScreen;
