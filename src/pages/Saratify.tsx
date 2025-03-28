
import { useNavigate } from "react-router-dom";
import MusicPlayer from "@/components/MusicPlayer";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft, Heart, Search, Library, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Saratify = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const preloadedRef = useRef(false);

  // Songs with corrected paths
  const songs = [
    {
      id: "1",
      title: "Happy Birthday",
      artist: "For Sara",
      src: "/assets/audio/arabic_sara.mp3",
      cover: "/assets/images/cover1.jpg",
      lyrics: "Happy birthday to you\nHappy birthday to you\nHappy birthday dear Sara\nHappy birthday to you!\n\nMay all your wishes come true today and always."
    },
    {
      id: "2",
      title: "You Are Amazing",
      artist: "Sara's Admirers",
      src: "/assets/audio/sara_impala.mp3",
      cover: "/assets/images/sara_1.jpg",
      lyrics: "You're amazing just the way you are\nYour smile lights up the entire room\nYour kindness touches everyone around you\nNever change, you're perfect as you are."
    },
    {
      id: "3",
      title: "Memories",
      artist: "Friends of Sara",
      src: "/assets/audio/sara_poem.mp3",
      cover: "/assets/images/sara_2.jpg",
      lyrics: "Remember all the good times\nAll the laughter we've shared\nEvery moment with you\nIs a treasure beyond compare."
    }
  ];

  // Preload audio files to make them load faster
  useEffect(() => {
    if (preloadedRef.current) return;
    preloadedRef.current = true;

    // Preload images first
    const imagePromises = songs.map(song => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(null);
        img.onerror = () => resolve(null);
        img.src = song.cover;
      });
    });

    // Then preload audio
    Promise.all(imagePromises).then(() => {
      songs.forEach(song => {
        const audio = new Audio();
        audio.preload = "auto";
        audio.src = song.src;
      });

      // Show loading for at least 1 second for better UX
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });

    // Cleanup
    return () => {
      preloadedRef.current = false;
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("saraAccessGranted");
    toast({
      title: "Logged out! 👋",
      description: "Come back soon!",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Loading screen - optimized for performance */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black">
          <div className="flex flex-col items-center space-y-6">
            <svg className="w-16 h-16 animate-pulse" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" fill="#1DB954"/>
            </svg>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 bg-gray-800" />
              <Skeleton className="h-4 w-24 bg-gray-800" />
            </div>
            <div className="text-sm text-gray-400 mt-4">Loading your music...</div>
          </div>
        </div>
      )}

      {/* Spotify-like header - optimized for performance */}
      <div className="sticky top-0 z-10 bg-black/95 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full hover:bg-white/10 transition-colors mr-4 text-white"
            aria-label="Go back"
          >
            <ArrowLeft size={isMobile ? 20 : 24} />
          </button>
          <div className="flex items-center">
            <svg className="w-8 h-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" fill="#1DB954"/>
            </svg>
            <h1 className="text-xl sm:text-2xl font-vt323 font-bold ml-2">Saratify</h1>
          </div>
        </div>
        
        {/* Spotify-like navigation buttons (desktop only) - simplified for mobile */}
        <div className="flex md:flex items-center gap-2 md:gap-4">
          {!isMobile && (
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <Heart size={20} className="text-gray-300" />
            </button>
          )}
          {!isMobile && (
            <>
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <Search size={20} className="text-gray-300" />
              </button>
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <Library size={20} className="text-gray-300" />
              </button>
            </>
          )}
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors" onClick={handleLogout}>
            <LogOut size={isMobile ? 18 : 20} className="text-gray-300" />
          </button>
        </div>
      </div>

      {!isLoading && (
        <div className="container py-8 max-w-5xl mx-auto px-4">
          {/* Reduced number of decoration elements to improve performance */}
          <div className="hidden sm:block absolute top-20 right-8 text-4xl animate-float opacity-70" style={{ animationDelay: "0.5s", zIndex: 1 }}>🎵</div>
          <div className="hidden sm:block absolute bottom-20 left-8 text-4xl animate-float opacity-70" style={{ animationDelay: "1.2s", zIndex: 1 }}>🎧</div>
          
          {/* Custom player section with optimized styling */}
          <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 rounded-lg p-4 sm:p-6 shadow-lg backdrop-blur-lg border border-gray-800 z-10">
            <div className="mb-6 text-center">
              <h2 className="font-vt323 text-3xl text-[#1DB954] mb-2 pixel-shadow" style={{ textShadow: "2px 2px 0 #000" }}>Sara's Playlist</h2>
              <p className="text-gray-400 font-vt323">Songs selected just for you</p>
              
              {/* Simplified background for better performance */}
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
            
            {/* Simplified album recommendations */}
            <div className="mt-12 border-t border-gray-800 pt-6">
              <h3 className="font-vt323 text-xl mb-4 text-white/90">Because you're awesome...</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[1, 2].map((item) => (
                  <div key={item} className="group cursor-pointer">
                    <div className="aspect-square bg-gray-800 rounded-md overflow-hidden mb-2 pixel-border" style={{ boxShadow: "2px 2px 0 #000" }}>
                      <div className="w-full h-full bg-gradient-to-br from-sara-retro1/20 to-sara-retro3/20"></div>
                    </div>
                    <p className="font-vt323 text-sm truncate">More Birthday Songs</p>
                    <p className="font-vt323 text-xs text-gray-400 truncate">Just for you</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-white/70">
            <p className="font-vt323 text-lg">
              To add your own songs, place audio files in the '/assets/audio/' folder and update the songs array.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Saratify;
