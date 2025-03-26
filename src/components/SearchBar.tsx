
import { useState, FormEvent } from "react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  buttonText?: string;
}

const SearchBar = ({
  onSearch,
  defaultValue = "",
  placeholder = "Search...",
  className = "",
  buttonText = "Search"
}: SearchBarProps) => {
  const [query, setQuery] = useState(defaultValue);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "flex items-center w-full max-w-3xl mx-auto rounded-full overflow-hidden bg-background border border-input focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all",
        className
      )}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-grow px-4 py-3 bg-transparent outline-none"
        autoFocus
      />
      <button
        type="submit"
        className="px-5 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default SearchBar;
