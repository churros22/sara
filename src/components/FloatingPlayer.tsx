
import { useAudio } from "@/contexts/AudioContext";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

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
  
  // Hide on Saratify page since the full player is there
  useEffect(() => {
    setIsVisible(location.pathname !== "/saratify" && songs.length > 0);
  }, [location.pathname, songs.length]);
  
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
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
            </svg>
          </button>
          
          <button 
            onClick={togglePlayPause}
            className="text-white p-1 hover:bg-white/10 rounded-full transition"
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            )}
          </button>
          
          <button 
            onClick={nextSong}
            className="text-white p-1 hover:bg-white/10 rounded-full transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 5 7 7-7 7"/><path d="M5 12h14"/>
            </svg>
          </button>
        </div>
        
        <div className="text-white/80 text-xs pr-3 hidden sm:block">
          {formatTime(progress)}/{formatTime(duration)}
        </div>
      </div>
    </div>
  );
};

export default FloatingPlayer;
