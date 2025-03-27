
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageGrid from "@/components/ImageGrid";
import SearchBar from "@/components/SearchBar";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft, Heart, Bell, User } from "lucide-react";

const Saranterest = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();

  // Placeholder images - these will be replaced with actual images from the assets folder
  const dummyImages = [
    { id: "1", src: "/assets/images/1.jpg", alt: "Sara image 1" },
    { id: "2", src: "/assets/images/2.jpg", alt: "Sara image 2" },
    { id: "3", src: "/assets/images/3.jpg", alt: "Sara image 3" },
    { id: "4", src: "/assets/images/4.jpg", alt: "Sara image 4" },
    { id: "5", src: "/assets/images/5.jpg", alt: "Sara image 5" },
    { id: "6", src: "/assets/images/6.jpg", alt: "Sara image 6" },
    { id: "7", src: "/assets/images/7.jpg", alt: "Sara image 7" },
    { id: "8", src: "/assets/images/8.jpg", alt: "Sara image 8" },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // For now, we're not actually filtering the images
    // This is just for aesthetics
    console.log("Search query:", query);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Pinterest-style header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={isMobile ? 20 : 24} />
          </button>
          
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-caveat font-bold text-red-600">S</span>
            <span className="text-xl font-caveat font-bold text-red-600">aranterest</span>
          </div>
          
          {/* Search bar - conditionally hide on mobile */}
          <div className={`flex-1 max-w-md mx-4 ${isMobile ? 'hidden sm:block' : ''}`}>
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search for inspiration..."
              className="bg-gray-100 border-none rounded-full font-vt323"
            />
          </div>
          
          {/* Icons */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all">
              <Bell size={isMobile ? 18 : 20} className="text-gray-700" />
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all">
              <Heart size={isMobile ? 18 : 20} className="text-gray-700" />
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all">
              <User size={isMobile ? 18 : 20} className="text-gray-700" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile search bar - only shown on mobile */}
      {isMobile && (
        <div className="bg-white px-4 py-2 shadow-sm">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search for inspiration..."
            className="bg-gray-100 border-none rounded-full font-vt323"
          />
        </div>
      )}

      {/* Pinterest-style content */}
      <div className="container mx-auto py-6 px-4">
        <div className="bg-white rounded-2xl p-4">
          <ImageGrid images={dummyImages} />
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p className="font-caveat text-lg">
            To replace these images, add your own photos to the '/assets/images/' folder and update the image paths in the Saranterest.tsx file.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Saranterest;
