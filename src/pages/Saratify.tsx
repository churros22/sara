
import { useNavigate } from "react-router-dom";
import MusicPlayer from "@/components/MusicPlayer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Music, ArrowLeft, Heart, Search, Library } from "lucide-react";

const Saratify = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Placeholder songs - these will be replaced with actual songs from the assets folder
  const songs = [
    {
      id: "1",
      title: "Happy Birthday",
      artist: "For Sara",
      src: "/assets/audio/song1.mp3",
      cover: "/assets/images/cover1.jpg",
      lyrics: "Happy birthday to you\nHappy birthday to you\nHappy birthday dear Sara\nHappy birthday to you!\n\nMay all your wishes come true today and always."
    },
    {
      id: "2",
      title: "You Are Amazing",
      artist: "Sara's Admirers",
      src: "/assets/audio/song2.mp3",
      cover: "/assets/images/cover2.jpg",
      lyrics: "You're amazing just the way you are\nYour smile lights up the entire room\nYour kindness touches everyone around you\nNever change, you're perfect as you are."
    },
    {
      id: "3",
      title: "Memories",
      artist: "Friends of Sara",
      src: "/assets/audio/song3.mp3",
      cover: "/assets/images/cover3.jpg",
      lyrics: "Remember all the good times\nAll the laughter we've shared\nEvery moment with you\nIs a treasure beyond compare."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Spotify-like header */}
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
            <div className="bg-[#1DB954] rounded-full w-10 h-10 flex items-center justify-center">
              <Music size={isMobile ? 16 : 20} className="text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold ml-2 font-vt323">Saratify</h1>
          </div>
        </div>
        
        {/* Spotify-like navigation buttons (desktop only) */}
        {!isMobile && (
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <Heart size={20} className="text-gray-300" />
            </button>
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <Search size={20} className="text-gray-300" />
            </button>
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <Library size={20} className="text-gray-300" />
            </button>
          </div>
        )}
      </div>

      <div className="container py-8 max-w-5xl mx-auto px-4">
        {/* Pixel art decorations positioned carefully to not overlap */}
        <div className="hidden sm:block absolute top-20 right-8 text-4xl animate-float opacity-70" style={{ animationDelay: "0.5s", zIndex: 1 }}>🎵</div>
        <div className="hidden sm:block absolute bottom-20 left-8 text-4xl animate-float opacity-70" style={{ animationDelay: "1.2s", zIndex: 1 }}>🎧</div>
        <div className="hidden lg:block absolute top-40 left-12 text-3xl animate-float opacity-70" style={{ animationDelay: "0.8s", zIndex: 1 }}>🎹</div>
        <div className="hidden lg:block absolute bottom-40 right-12 text-3xl animate-float opacity-70" style={{ animationDelay: "1.5s", zIndex: 1 }}>🎤</div>
        
        {/* Custom player section with pixel-art inspired styling */}
        <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 rounded-lg p-4 sm:p-6 shadow-lg backdrop-blur-lg border border-gray-800 z-10">
          <div className="mb-6 text-center">
            <h2 className="font-caveat text-3xl text-[#1DB954] mb-2 pixel-border" style={{ textShadow: "2px 2px 0 #000" }}>Sara's Playlist</h2>
            <p className="text-gray-400 font-vt323">Songs selected just for you</p>
            
            {/* Pixel art grid background (subtle) */}
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
          
          {/* Spotify-inspired album recommendations */}
          <div className="mt-12 border-t border-gray-800 pt-6">
            <h3 className="font-vt323 text-xl mb-4 text-white/90">Because you're awesome...</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="group animate-hover cursor-pointer">
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

        <div className="mt-12 text-center text-sm text-white/70">
          <p className="font-caveat text-lg">
            To add your own songs, place audio files in the '/assets/audio/' folder, cover images in the '/assets/images/' folder, and update the songs array in the Saratify.tsx file.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Saratify;
