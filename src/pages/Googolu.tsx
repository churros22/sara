
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import { ArrowLeft, Image, MapPin, Newspaper, Video } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

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
  const isMobile = useIsMobile();
  const { toast } = useToast();

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
      title: "Breaking News: Sara saved the world!!",
      url: "https://algerie-news.com/04-11-2025-news",
      description: "Sara's quick thinking and bravery saved the world from a catastrophic event. Her heroism will be remembered for generations to come."
    },
    {
      id: "3",
      title: "Why Sara Is Loved By Everyone She Meets",
      url: "https://amazon.com/sara_secerets",
      description: "Explore the many reasons why Sara is adored by friends, family, and colleagues. Buy her secret for 411.99 $ only!"
    },
    {
      id: "4",
      title: "Sara's Creative Talents",
      url: "https://guinness-world-records.com/sara-hamaidi",
      description: "Sara made history with crocheting the world's largest tapestry in just 24 hours. Her creative talents know no bounds."
    },
    {
      id: "5",
      title: "More Than Just a Pretty Face: Sara's multiple personalities",
      url: "https://crime-ivestigations.com/psycho-files",
      description: "Sara's multiple personalities have been the subject of many studies. Her unique mind is a mystery that continues to fascinate the FBI researchers. Naughty Sara, Mad Sara, Chef Sara, Wise Sara... Slow Sara is the most dangerous one."
    },
    {
      id: "6",
      title: "Pride and Prejudice: What Sara Thinks",
      url: "https://cinema.com/sara-reviews",
      description: "Sara's reviews of the latest movies and TV shows are always insightful and entertaining. Mr Darcy is such a man, she said... and she was right."
    }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowResults(true);
  };

  // Google-like categories
  const categories = [
    { name: "All", icon: <div className="w-4 h-4"></div> },
    { name: "Images", icon: <Image size={16} /> },
    { name: "Videos", icon: <Video size={16} /> },
    { name: "News", icon: <Newspaper size={16} /> },
    { name: "Maps", icon: <MapPin size={16} /> }
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Google-style navigation and header */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/")}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-2"
              aria-label="Go back"
            >
              <ArrowLeft size={isMobile ? 20 : 24} />
            </button>
            
            {/* Show the logo on both mobile and desktop but smaller on mobile */}
            {!showResults && (
              <div className="flex items-center justify-center py-2 mb-0">
                <div className={`inline-block pixel-shadow ${isMobile ? 'scale-75 transform-origin-left' : ''}`}>
                  <span className="text-4xl font-bold text-[#4285F4]">G</span>
                  <span className="text-4xl font-bold text-[#EA4335]">o</span>
                  <span className="text-4xl font-bold text-[#FBBC05]">o</span>
                  <span className="text-4xl font-bold text-[#4285F4]">g</span>
                  <span className="text-4xl font-bold text-[#34A853]">o</span>
                  <span className="text-4xl font-bold text-[#EA4335]">l</span>
                  <span className="text-4xl font-bold text-[#4285F4]">u</span>
                </div>
              </div>
            )}
            
            {/* When results are showing, show a smaller logo on both */}
            {showResults && (
              <div className="flex items-center ml-2">
                <div className="inline-block">
                  <span className="text-2xl font-bold text-[#4285F4]">G</span>
                  <span className="text-2xl font-bold text-[#EA4335]">o</span>
                  <span className="text-2xl font-bold text-[#FBBC05]">o</span>
                  <span className="text-2xl font-bold text-[#4285F4]">g</span>
                  <span className="text-2xl font-bold text-[#34A853]">o</span>
                  <span className="text-2xl font-bold text-[#EA4335]">l</span>
                  <span className="text-2xl font-bold text-[#4285F4]">u</span>
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Go back to home"
            color="black"
          >
            <ArrowLeft size={isMobile ? 20 : 24}  
            color="black"
            />
          </button>
        </div>
      </div>

      {/* Main search section - simplified if results are showing */}
      <div className="container py-4 max-w-6xl mx-auto px-4">
        {!showResults ? (
          <div className="mb-8 text-center">
            <div className="inline-block pixel-shadow" style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.1)" }}>
              <span className="text-5xl md:text-6xl font-bold text-[#4285F4]">G</span>
              <span className="text-5xl md:text-6xl font-bold text-[#EA4335]">o</span>
              <span className="text-5xl md:text-6xl font-bold text-[#FBBC05]">o</span>
              <span className="text-5xl md:text-6xl font-bold text-[#4285F4]">g</span>
              <span className="text-5xl md:text-6xl font-bold text-[#34A853]">o</span>
              <span className="text-5xl md:text-6xl font-bold text-[#EA4335]">l</span>
              <span className="text-5xl md:text-6xl font-bold text-[#4285F4]">u</span>
            </div>
          </div>
        ) : null}

        <div className={`${showResults ? 'max-w-full' : 'max-w-2xl mx-auto'} mb-8 relative`}>
          <div className="relative">
            <SearchBar 
              onSearch={handleSearch}
              defaultValue={searchQuery}
              placeholder="Search for Sara..."
              className={`${showResults ? 'border shadow-sm' : 'border shadow-lg'} rounded-full font-vt323`}
            />
          </div>
        </div>

        {showResults && (
          <>
            {/* Google-like category tabs */}
            <div className="border-b mb-4 overflow-x-auto scrollbar-none">
              <div className="flex space-x-6 font-vt323 min-w-max">
                {categories.map((category, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-1 px-1 py-2 ${index === 0 ? 'text-[#4285F4] border-b-2 border-[#4285F4]' : 'text-gray-600 hover:text-gray-800'} cursor-pointer transition-colors`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-3xl animate-fade-in">
              <p className="text-sm font-vt323 text-gray-500 mb-6">
                About {searchResults.length} results for "{searchQuery}"
              </p>

              {/* Pixel art decorations positioned strategically */}
              <div className="hidden lg:block absolute top-40 right-10 text-3xl opacity-60">✨</div>
              <div className="hidden lg:block absolute bottom-40 left-10 text-3xl opacity-60">🌟</div>

              <div className="space-y-8">
                {searchResults.map((result) => (
                  <div key={result.id} className="group">
                    <h2 className="text-xl font-medium font-vt323 text-[#1a0dab] group-hover:underline transition-colors">
                      {result.title}
                    </h2>
                    <a 
                      href="#" 
                      className="text-[#006621] text-sm font-vt323 hover:underline block mb-1"
                      onClick={(e) => e.preventDefault()}
                    >
                      {result.url}
                    </a>
                    <p className="text-gray-600 font-vt323">
                      {result.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          <p className="font-vt323 text-lg">
           2025 Googolu - 🔍
          </p>
        </div>
      </div>
    </div>
  );
};

export default Googolu;
