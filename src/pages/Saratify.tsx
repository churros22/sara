
import { useNavigate } from "react-router-dom";
import MusicPlayer from "@/components/MusicPlayer";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft, Heart, Search, Library, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAudio } from "@/contexts/AudioContext";
import { useSaratifyCache } from "@/hooks/use-saratify-cache";

const CACHE_KEY = "saratify-assets-loaded";

const Saratify = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [songsLoaded, setSongsLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const preloadedRef = useRef(false);
  const audio = useAudio();
  
  // Use the custom hook for caching
  const { songs, isAssetsLoaded } = useSaratifyCache();

  // Set songs in context when component mounts
  useEffect(() => {
    audio.setSongs(songs);
  }, [audio, songs]);

  // Handle loading state with shorter timeouts
  useEffect(() => {
    // If assets are already loaded from cache
    if (isAssetsLoaded && !preloadedRef.current) {
      setImagesLoaded(true);
      setSongsLoaded(true);
      setIsLoading(false);
      preloadedRef.current = true;
      return;
    }
    
    if (preloadedRef.current) return;
    preloadedRef.current = true;

    // Shorter fallback timer for faster display
    const fallbackTimer = setTimeout(() => {
      setImagesLoaded(true);
      setSongsLoaded(true);
      localStorage.setItem(CACHE_KEY, "true");
    }, 1500); // Reduced from 3000ms

    return () => {
      clearTimeout(fallbackTimer);
    };
  }, [songs, isAssetsLoaded]);

  // Update loading state with a shorter delay
  useEffect(() => {
    if (imagesLoaded && songsLoaded) {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, [imagesLoaded, songsLoaded]);

  const handleLogout = () => {
    audio.stopAndReset();
    localStorage.removeItem("saraAccessGranted");
    toast({
      title: "Logged out! 👋",
      description: "Come back soon!",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Loading screen with simplified design */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black">
          <div className="flex flex-col items-center space-y-6 animate-pulse-gentle">
            <div className="relative">
              <svg className="w-16 h-16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" fill="#1DB954"/>
              </svg>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 bg-gray-800" />
              <Skeleton className="h-4 w-24 bg-gray-800" />
            </div>
            <div className="pixel-border bg-gray-800 p-3 font-pixel text-sm text-green-400 animate-pulse mt-4">
              Loading your music...
              <div className="mt-2 flex justify-center space-x-1">
                <span className={`inline-block w-2 h-2 bg-green-400 ${imagesLoaded ? '' : 'animate-bounce'}`} style={{ animationDelay: '0s' }}></span>
                <span className={`inline-block w-2 h-2 bg-green-400 ${songsLoaded ? '' : 'animate-bounce'}`} style={{ animationDelay: '0.2s' }}></span>
                <span className="inline-block w-2 h-2 bg-green-400 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spotify-like header with cleaner styling */}
      <div className="sticky top-0 z-10 bg-black/95 px-4 py-3 flex items-center justify-between animate-fade-in">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/home")}
            className="p-2 rounded-full hover:bg-white/10 transition-colors mr-4 text-white"
            aria-label="Go back"
          >
            <ArrowLeft size={isMobile ? 20 : 24} />
          </button>
          <div className="flex items-center">
            <svg className="w-8 h-8 animate-scale-in" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" fill="#1DB954"/>
            </svg>
            <h1 className="text-xl sm:text-2xl font-pixel font-bold ml-2 pixel-shadow">Saratify</h1>
          </div>
        </div>
        
        {/* Spotify-like navigation buttons */}
        <div className="flex items-center gap-2 md:gap-4">
          {isMobile && (
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <Heart size={20} className="text-gray-300" />
            </button>
          )}
          {isMobile && (
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <Library size={20} className="text-gray-300" />
            </button>
          )}
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors" onClick={handleLogout}>
            <LogOut size={isMobile ? 18 : 20} className="text-gray-300" />
          </button>
        </div>
      </div>

      {!isLoading && (
        <div className="container py-8 max-w-5xl mx-auto px-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {/* Custom player section with cleaner styling */}
          <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 rounded-lg p-4 sm:p-6 shadow-lg backdrop-blur-lg border border-gray-800 z-10">
            <div className="mb-6 text-center">
              <h2 className="font-pixel text-3xl text-[#1DB954] mb-2 pixel-shadow animate-scale-in">Sara's Playlist</h2>
              <p className="text-gray-400 font-pixel">Songs selected just for you</p>
              
              {/* Background pattern */}
              <div className="absolute inset-0 -z-10 opacity-5">
                <div className="w-full h-full" style={{ 
                  backgroundImage: "linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)", 
                  backgroundSize: "20px 20px"
                }}></div>
              </div>
            </div>
            
            <div className="relative z-10">
              <MusicPlayer songs={songs} />
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-white/70">
            <p className="font-pixel text-lg animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Made with love here not rage :3 💖 
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Saratify;
