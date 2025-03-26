
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/SearchBar";

interface SearchResult {
  id: string;
  title: string;
  url: string;
  description: string;
}

const Googolu = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("Sara");
  const [showResults, setShowResults] = useState(false);

  // Placeholder search results - these would be customized with compliments and achievements
  const searchResults: SearchResult[] = [
    {
      id: "1",
      title: "Sara - The Most Amazing Person",
      url: "https://amazing-people.com/sara",
      description: "Sara is known for her incredible kindness and warmth. Everyone who meets her immediately feels welcome and appreciated."
    },
    {
      id: "2",
      title: "Sara's Remarkable Achievements",
      url: "https://achievements.com/sara",
      description: "A comprehensive list of Sara's impressive achievements, including her academic excellence and professional accomplishments."
    },
    {
      id: "3",
      title: "Why Sara Is Loved By Everyone",
      url: "https://beloved.com/sara",
      description: "Explore the many reasons why Sara is adored by friends, family, and colleagues. Her genuine care for others tops the list."
    },
    {
      id: "4",
      title: "Sara's Creative Talents",
      url: "https://creative-minds.com/sara",
      description: "Discover Sara's artistic abilities and creative thinking that impresses everyone around her."
    },
    {
      id: "5",
      title: "Sara's Infectious Laughter and Humor",
      url: "https://joy.com/sara",
      description: "Sara's sense of humor and contagious laugh brings joy to every room she enters."
    },
    {
      id: "6",
      title: "The Wisdom of Sara",
      url: "https://wisdom.com/sara",
      description: "Sara's thoughtful insights and wise perspective on life have helped many people through difficult times."
    }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full hover:bg-muted transition-colors mr-4"
            aria-label="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
            </svg>
          </button>
          <div className="flex items-center">
            <h1 className="text-3xl font-bold">Googolu</h1>
          </div>
        </div>

        <div className="mb-12 text-center">
          <div className="inline-block">
            <span className="text-6xl font-bold">G</span>
            <span className="text-6xl font-bold text-sara-blue">o</span>
            <span className="text-6xl font-bold text-sara-pink">o</span>
            <span className="text-6xl font-bold text-sara-yellow">g</span>
            <span className="text-6xl font-bold text-sara-green">o</span>
            <span className="text-6xl font-bold text-sara-purple">l</span>
            <span className="text-6xl font-bold">u</span>
          </div>
        </div>

        <div className="mb-8 max-w-2xl mx-auto">
          <SearchBar 
            onSearch={handleSearch}
            defaultValue={searchQuery}
            placeholder="Search for Sara..."
          />
        </div>

        {showResults && (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 shadow-sm animate-fade-in">
            <p className="text-sm text-muted-foreground mb-6">
              About {searchResults.length} results for "{searchQuery}"
            </p>

            <div className="space-y-8">
              {searchResults.map((result) => (
                <div key={result.id} className="group">
                  <h2 className="text-xl font-medium text-primary group-hover:text-primary/80 transition-colors">
                    {result.title}
                  </h2>
                  <a 
                    href="#" 
                    className="text-sara-blue text-sm hover:underline block mb-1"
                    onClick={(e) => e.preventDefault()}
                  >
                    {result.url}
                  </a>
                  <p className="text-muted-foreground">
                    {result.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            To customize these search results, edit the searchResults array in the Googolu.tsx file with your own compliments and achievements for Sara.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Googolu;
