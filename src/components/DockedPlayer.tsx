
import { useRef, useState, useEffect } from "react";
import { useAudioContext } from "@/hooks/use-audio-context";
import { Music, X, Maximize2, Minimize2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const DockedPlayer = () => {
  const {
    songs,
    currentSongIndex,
    isPlaying,
    progress,
    duration,
    togglePlayPause,
    handleProgressChange,
    nextSong,
    prevSong,
    formatTime,
    isPlayerVisible,
    togglePlayerVisibility
  } = useAudioContext();
  
  const currentSong = songs[currentSongIndex];
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const playerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to collapse expanded view on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (expanded && playerRef.current && !playerRef.current.contains(event.target as Node)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expanded]);

  // Don't render if the player isn't visible
  if (!isPlayerVisible) return null;

  const navigateToSaratify = () => {
    navigate("/saratify");
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div 
      ref={playerRef}
      className={`fixed bottom-0 z-50 transition-all duration-300 ease-in-out ${
        expanded 
          ? "left-0 right-0 mx-auto max-w-md h-auto" 
          : isMobile 
            ? "left-0 right-0 mx-auto max-w-xs" 
            : "right-4 w-72"
      }`}
    >
      <div className={`pixel-border bg-black/90 backdrop-blur-md text-white rounded-t-xl shadow-lg overflow-hidden ${
        expanded ? "p-4" : "p-2"
      }`}>
        {/* Header with controls */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <button 
              onClick={navigateToSaratify}
              className="p-1 rounded-full bg-[#1DB954]/90 hover:bg-[#1DB954] transition-colors text-black"
            >
              <Music size={16} />
            </button>
            <span className="font-pixel text-xs text-[#1DB954] animate-pulse-gentle">Saratify</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <button 
              onClick={toggleExpanded}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label={expanded ? "Minimize" : "Expand"}
            >
              {expanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
            <button 
              onClick={togglePlayerVisibility}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X size={14} />
            </button>
          </div>
        </div>
        
        {/* Now playing info */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 relative overflow-hidden rounded-md pixel-border">
            <img 
              src={currentSong.cover} 
              alt={currentSong.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="font-pixel text-sm truncate">{currentSong.title}</p>
            <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>
          </div>
        </div>
        
        {/* Player controls */}
        {expanded && (
          <div className="mt-3 space-y-2">
            {/* Progress bar */}
            <div className="flex items-center space-x-2 text-xs">
              <span>{formatTime(progress)}</span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={progress}
                onChange={handleProgressChange}
                className="flex-1 h-1 rounded-full appearance-none bg-gray-600 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1DB954]"
              />
              <span>{formatTime(duration)}</span>
            </div>
            
            {/* Control buttons */}
            <div className="flex items-center justify-center space-x-4">
              <button 
                onClick={prevSong}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Previous song"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
                </svg>
              </button>
              
              <button 
                onClick={togglePlayPause}
                className="p-3 rounded-full bg-white text-black hover:bg-gray-200 transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                )}
              </button>
              
              <button 
                onClick={nextSong}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Next song"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 5 7 7-7 7"/><path d="M5 12h14"/>
                </svg>
              </button>
            </div>
          </div>
        )}
        
        {/* Compact player controls for minimized state */}
        {!expanded && (
          <div className="flex items-center justify-between mt-1">
            <div className="w-24 bg-gray-700 h-1 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#1DB954]" 
                style={{width: `${(progress / duration) * 100 || 0}%`}}
              ></div>
            </div>
            
            <button 
              onClick={togglePlayPause}
              className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default DockedPlayer;
