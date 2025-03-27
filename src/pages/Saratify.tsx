
import { useNavigate } from "react-router-dom";
import MusicPlayer from "@/components/MusicPlayer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Music, ArrowLeft } from "lucide-react";

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
      <div className="sticky top-0 z-10 bg-black/95 px-4 py-3 flex items-center">
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

      <div className="container py-8 max-w-5xl mx-auto px-4">
        {/* Pixel art decorations */}
        <div className="hidden sm:block absolute top-20 right-8 text-4xl animate-float" style={{ animationDelay: "0.5s" }}>🎵</div>
        <div className="hidden sm:block absolute bottom-20 left-8 text-4xl animate-float" style={{ animationDelay: "1.2s" }}>🎧</div>
        
        {/* Custom player section */}
        <div className="bg-gray-900/70 rounded-lg p-4 sm:p-6 shadow-lg backdrop-blur-lg border border-gray-800">
          <div className="mb-6 text-center">
            <h2 className="font-caveat text-3xl text-[#1DB954] mb-2">Sara's Playlist</h2>
            <p className="text-gray-400 font-vt323">Songs selected just for you</p>
          </div>
          <MusicPlayer songs={songs} />
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
