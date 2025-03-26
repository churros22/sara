
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
          <h1 className="text-3xl font-bold">Saranterest</h1>
        </div>

        <div className="mb-8">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search for inspiration..."
          />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <ImageGrid images={dummyImages} />
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            To replace these images, add your own photos to the '/assets/images/' folder and update the image paths in the Saranterest.tsx file.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Saranterest;
