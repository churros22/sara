
import { Repeat, Shuffle, SkipBack, Play, Pause, SkipForward } from "lucide-react";

interface PlayerControlsProps {
  isPlaying: boolean;
  togglePlayPause: () => void;
  prevSong: () => void;
  nextSong: () => void;
}

const PlayerControls = ({ isPlaying, togglePlayPause, prevSong, nextSong }: PlayerControlsProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Additional controls for Spotify-like feel */}
        <button className="text-white/60 p-2 hover:text-white transition-colors">
          <Shuffle size={18} />
        </button>
        
        <button 
          onClick={prevSong}
          className="text-white p-2 hover:text-white/80 transition-colors"
          aria-label="Previous song"
        >
          <SkipBack size={20} />
        </button>
        
        <button 
          onClick={togglePlayPause}
          className="p-3 bg-white rounded-full text-black hover:scale-105 transition-transform"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
        </button>
        
        <button 
          onClick={nextSong}
          className="text-white p-2 hover:text-white/80 transition-colors"
          aria-label="Next song"
        >
          <SkipForward size={20} />
        </button>
        
        <button className="text-white/60 p-2 hover:text-white transition-colors">
          <Repeat size={18} />
        </button>
      </div>
    </div>
  );
};

export default PlayerControls;
