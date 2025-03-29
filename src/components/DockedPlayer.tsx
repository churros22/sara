
import React, { useState, useEffect } from "react";
import { useAudioContext } from "@/hooks/use-audio-context";
import { Disc, Maximize2, Minimize2, Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const DockedPlayer = () => {
  const {
    songs,
    currentSongIndex,
    isPlaying,
    togglePlayPause,
    prevSong,
    nextSong,
    progress,
    duration,
  } = useAudioContext();
  
  const [expanded, setExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const currentSong = songs[currentSongIndex];
  
  // Show docked player only when user is logged in
  useEffect(() => {
    const hasAccess = localStorage.getItem("saraAccessGranted") === "true";
    setIsVisible(hasAccess);
  }, [location.pathname]);
  
  // Calculate progress percentage
  const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;
  
  const handleExpandClick = () => {
    if (expanded) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  };
  
  const navigateToSaratify = () => {
    navigate("/saratify");
  };
  
  if (!isVisible) return null;
  
  // Don't show on the Saratify page since we have the full player there
  if (location.pathname === "/saratify") return null;
  
  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md text-white border-t border-white/10 transition-all duration-300 ease-in-out ${
        expanded ? "h-24" : "h-14"
      }`}
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 h-1 bg-primary" style={{ width: `${progressPercentage}%` }}></div>
      
      <div className="container mx-auto px-4 h-full flex items-center">
        {/* Song info */}
        <div className="flex-1 min-w-0 flex items-center cursor-pointer" onClick={navigateToSaratify}>
          <div className="w-8 h-8 bg-gray-700 rounded-full overflow-hidden flex items-center justify-center animate-spin-slow">
            <Disc size={16} className="text-primary" />
          </div>
          <div className="ml-3 truncate">
            <p className="font-medium truncate">{currentSong.title}</p>
            {expanded && <p className="text-xs text-gray-400 truncate">{currentSong.artist}</p>}
          </div>
        </div>
        
        {/* Player controls */}
        <div className="flex items-center space-x-4">
          {expanded && (
            <button 
              onClick={prevSong} 
              className="p-2 text-white/70 hover:text-white transition-colors"
            >
              <SkipBack size={18} />
            </button>
          )}
          
          <button 
            onClick={togglePlayPause} 
            className="p-2 bg-primary rounded-full text-primary-foreground hover:bg-primary/90"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </button>
          
          {expanded && (
            <button 
              onClick={nextSong} 
              className="p-2 text-white/70 hover:text-white transition-colors"
            >
              <SkipForward size={18} />
            </button>
          )}
          
          <button 
            onClick={handleExpandClick} 
            className="p-2 text-white/70 hover:text-white transition-colors"
          >
            {expanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DockedPlayer;
