
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageGrid from "@/components/ImageGrid";
import SearchBar from "@/components/SearchBar";

const Saranterest = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
            </svg>
          </button>
          
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl text-red-600 font-bold">S</span>
            <span className="text-xl text-red-600 font-bold">aranterest</span>
          </div>
          
          {/* Search bar */}
          <div className="flex-1 max-w-md mx-4">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search for inspiration..."
              className="bg-gray-100 border-none rounded-full"
            />
          </div>
          
          {/* Icon placeholders */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-lg">💌</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <span className="text-lg">🔔</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pinterest-style content */}
      <div className="container mx-auto py-6 px-4">
        <div className="bg-white rounded-2xl p-4">
          <ImageGrid images={dummyImages} />
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            To replace these images, add your own photos to the '/assets/images/' folder and update the image paths in the Saranterest.tsx file.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Saranterest;
