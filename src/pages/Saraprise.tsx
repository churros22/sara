import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft } from "lucide-react";

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
        <div className="flex items-center mb-8 animate-fade-in">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full hover:bg-muted transition-colors mr-4 animate-pulse-gentle"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold font-pixel pixel-shadow animate-scale-in">Saraprise</h1>
        </div>

        <div className="max-w-screen-sm mx-auto glass p-4 rounded-2xl shadow-lg animate-fade-in">
          {/* Loading indicator */}
          {!isLoaded && (
            <div className="w-full h-[400px] flex items-center justify-center rounded-lg">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Embed the external HTML page using an iframe with adjusted dimensions */}
          <iframe
            src="./assets/index_saraprise.html"
            title="Saraprise Content"
            className={`w-full h-[auto] rounded-lg border-0 ${isLoaded ? "block" : "hidden"}`}
            onLoad={() => setIsLoaded(true)}
            style={{ overflow: "hidden" }}
          ></iframe>

          {/* Additional content: Pictures and text */}
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold mb-4">A Special Message for Sara</h2>
            <p className="text-lg mb-6">
              Sara, you are an amazing person, and this is a small token of appreciation for all the joy you bring to our lives.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <img
                src="./assets/images/sara_1.jpg"
                alt="Sara smiling"
                className="rounded-lg shadow-lg"
              />
              <img
                src="./assets/images/sara_2.jpg"
                alt="Sara enjoying her day"
                className="rounded-lg shadow-lg"
              />
            </div>
            <p className="text-lg mt-6">
              We hope this day brings you as much happiness as you bring to everyone around you. Happy Birthday, Sara!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Saraprise;