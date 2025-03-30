
import { useAudio } from "@/contexts/AudioContext";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { X, SkipBack, Play, Pause, SkipForward } from "lucide-react";

const FloatingPlayer = () => {
  const {
    isPlaying,
    togglePlayPause,
    currentSongIndex,
    songs,
    progress,
    duration,
    formatTime,
    nextSong,
    prevSong
  } = useAudio();
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  
  // Hide on Saratify page and when logged out
  useEffect(() => {
    const hasAccess = localStorage.getItem("saraAccessGranted") === "true";
    setIsVisible(
      location.pathname !== "/saratify" && 
      songs.length > 0 && 
      hasAccess
    );
  }, [location.pathname, songs.length]);
  
  // Function to hide the floating player
  const hidePlayer = () => {
    setIsVisible(false);
  };
  
  if (!isVisible || songs.length === 0) return null;
  
  const currentSong = songs[currentSongIndex];
  if (!currentSong) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <div className="bg-black/80 backdrop-blur-md rounded-full p-1 shadow-lg border border-white/10 flex items-center gap-2">
        <div 
          className="w-10 h-10 rounded-full overflow-hidden"
          style={{ 
            backgroundImage: `url(${currentSong.cover})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="px-2 max-w-32 hidden sm:block">
          <p className="text-xs font-medium text-white truncate">{currentSong.title}</p>
          <p className="text-xs text-white/70 truncate">{currentSong.artist}</p>
        </div>
        
        <div className="flex gap-1">
          <button 
            onClick={prevSong}
            className="text-white p-1 hover:bg-white/10 rounded-full transition"
            aria-label="Previous song"
          >
            <SkipBack size={16} />
          </button>
          
          <button 
            onClick={togglePlayPause}
            className="text-white p-1 hover:bg-white/10 rounded-full transition"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          
          <button 
            onClick={nextSong}
            className="text-white p-1 hover:bg-white/10 rounded-full transition"
            aria-label="Next song"
          >
            <SkipForward size={16} />
          </button>
        </div>
        
        <div className="text-white/80 text-xs pr-3 hidden sm:block">
          {formatTime(progress)}/{formatTime(duration)}
        </div>
        
        <button 
          onClick={hidePlayer}
          className="text-white/80 p-1 hover:bg-white/10 rounded-full transition ml-1"
          aria-label="Close player"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default FloatingPlayer;
