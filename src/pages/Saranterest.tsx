
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageGrid from "@/components/ImageGrid";
import SearchBar from "@/components/SearchBar";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft, Heart, Bell, MessageCircle, Upload, User } from "lucide-react";

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

  // Pinterest categories (for decoration)
  const categories = ["Memories", "Birthday", "Friends", "Travel", "Food", "Fashion", "Art"];

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
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
          
          {/* Logo with pixel art styling */}
          <div className="flex items-center">
            <span className="text-2xl font-caveat font-bold text-red-600 pixel-border" style={{ textShadow: "1px 1px 0 #000" }}>S</span>
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
          
          {/* Pinterest Icons */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all">
              <Bell size={isMobile ? 18 : 20} className="text-gray-700" />
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all">
              <MessageCircle size={isMobile ? 18 : 20} className="text-gray-700" />
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

      {/* Pinterest category chips */}
      <div className="bg-white border-b py-3 px-4 overflow-x-auto scrollbar-none">
        <div className="flex space-x-2 min-w-max">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="px-3 py-1.5 rounded-full bg-gray-100 text-sm font-vt323 whitespace-nowrap hover:bg-gray-200 cursor-pointer transition-all"
              style={{ 
                border: '1px solid #000',
                boxShadow: '1px 1px 0 #000'
              }}
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      {/* Pinterest-style content with pixel art decorations */}
      <div className="container mx-auto py-6 px-4">
        {/* Strategically placed pixel decorations */}
        <div className="hidden md:block absolute top-32 right-8 text-3xl" style={{ zIndex: 1, opacity: 0.7 }}>🖼️</div>
        <div className="hidden md:block absolute bottom-20 left-8 text-3xl" style={{ zIndex: 1, opacity: 0.7 }}>📌</div>
        
        <div className="bg-white rounded-2xl p-4 relative">
          <div className="absolute -inset-1 -z-10 bg-gradient-to-r from-sara-retro1/10 via-sara-retro3/10 to-sara-retro5/10 blur-sm"></div>
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
