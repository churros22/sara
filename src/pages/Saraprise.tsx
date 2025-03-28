
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Saraprise = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Mark as loaded after a short delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sara-pink/20 via-background to-sara-purple/20">
      <div className="container py-8">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full hover:bg-muted transition-colors mr-4"
            aria-label="Go back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </button>
          <h1 className="text-3xl font-bold">Saraprise</h1>
        </div>

        <div className="max-w-4xl mx-auto glass p-4 sm:p-10 rounded-2xl shadow-lg">
          {/* Loading indicator */}
          {!isLoaded && (
            <div className="w-full h-[300px] md:h-[500px] flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          {/* Embed the external HTML page using an iframe with adjusted dimensions */}
          <iframe
            src="./assets/index_saraprise.html"
            title="Saraprise Content"
            className={`w-full ${isMobile ? 'h-[500px]' : 'h-[600px]'} rounded-lg border border-gray-300 ${isLoaded ? 'block' : 'hidden'}`}
            onLoad={() => setIsLoaded(true)}
            style={{ overflow: 'hidden' }}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Saraprise;
