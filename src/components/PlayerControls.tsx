
interface PlayerControlsProps {
  isPlaying: boolean;
  togglePlayPause: () => void;
  prevSong: () => void;
  nextSong: () => void;
}

const PlayerControls = ({ isPlaying, togglePlayPause, prevSong, nextSong }: PlayerControlsProps) => {
  return (
    <div className="flex items-center justify-center space-x-6">
      <button 
        onClick={prevSong}
        className="p-2 rounded-full hover:bg-primary/10 transition-colors"
        aria-label="Previous song"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
        </svg>
      </button>
      
      <button 
        onClick={togglePlayPause}
        className="p-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        )}
      </button>
      
      <button 
        onClick={nextSong}
        className="p-2 rounded-full hover:bg-primary/10 transition-colors"
        aria-label="Next song"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 5 7 7-7 7"/><path d="M5 12h14"/>
        </svg>
      </button>
    </div>
  );
};

export default PlayerControls;
