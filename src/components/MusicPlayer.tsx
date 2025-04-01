
import { useEffect } from "react";
import PlayerControls from "./PlayerControls";
import PlayerProgress from "./PlayerProgress";
import SongInfo from "./SongInfo";
import { useAudio } from "@/contexts/AudioContext";
import { Song } from "@/types/audio";

interface MusicPlayerProps {
  songs: Song[];
}

const MusicPlayer = ({ songs }: MusicPlayerProps) => {
  const {
    currentSongIndex,
    isPlaying,
    progress,
    duration,
    togglePlayPause,
    handleProgressChange,
    nextSong,
    prevSong,
    formatTime,
    setDuration,
    audioRef
  } = useAudio();

  const currentSong = songs[currentSongIndex];

  // Update duration when component mounts or song changes
  useEffect(() => {
    const updateDuration = () => {
      if (audioRef.current && !isNaN(audioRef.current.duration)) {
        console.log("Updating duration:", audioRef.current.duration);
        setDuration(audioRef.current.duration);
      }
    };

    // Try to get duration immediately if already available
    updateDuration();
    
    // Also add an event listener as a backup
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', updateDuration);
      
      // Add a canplaythrough event as a final fallback
      audioRef.current.addEventListener('canplaythrough', updateDuration);
    }
    
    // Cleanup listeners
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadedmetadata', updateDuration);
        audioRef.current.removeEventListener('canplaythrough', updateDuration);
      }
    };
  }, [currentSongIndex, setDuration, audioRef]);

  // Handle case when no songs are available
  if (!currentSong || songs.length === 0) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-white/70">No songs available. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto rounded-xl overflow-hidden bg-black/30 p-5">
      {/* More Spotify-like layout with improved iPhone compatibility */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <SongInfo song={currentSong} />
        </div>
        
        <div className="w-full md:w-2/3 flex flex-col justify-between">
          {/* Mobile view: Player controls first */}
          <div className="md:hidden mb-6">
            <PlayerControls 
              isPlaying={isPlaying}
              togglePlayPause={togglePlayPause}
              prevSong={prevSong}
              nextSong={nextSong}
            />
          </div>
          
          {/* Progress bar */}
          <div className="mb-6">
            <PlayerProgress 
              progress={progress}
              duration={duration}
              formatTime={formatTime}
              handleProgressChange={handleProgressChange}
            />
          </div>
          
          {/* Desktop view: Player controls after progress */}
          <div className="hidden md:block mb-6">
            <PlayerControls 
              isPlaying={isPlaying}
              togglePlayPause={togglePlayPause}
              prevSong={prevSong}
              nextSong={nextSong}
            />
          </div>
          
          {/* Lyrics section */}
          {currentSong.lyrics && (
            <div className="px-4 py-3 rounded-lg bg-white/5 text-center max-h-48 overflow-y-auto">
              <h3 className="text-white/90 text-sm mb-2 font-semibold">More info</h3>
              <p className="text-white/70 text-sm whitespace-pre-line">{currentSong.lyrics}</p>
            </div>
          )}
          
          {/* Additional Spotify-like features */}
          <div className="mt-4 flex justify-between items-center text-xs text-white/50">
            <div>
              <span className="mr-2">{currentSongIndex + 1} of {songs.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
