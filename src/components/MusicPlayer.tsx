
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
    formatTime
  } = useAudio();

  const currentSong = songs[currentSongIndex];

  if (!currentSong) return null;

  return (
    <div className="w-full mx-auto rounded-xl overflow-hidden">
      {/* Cover art section */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <SongInfo song={currentSong} />
        </div>
        
        <div className="w-full md:w-2/3 flex flex-col justify-between">
          {/* Mobile view: Player controls first */}
          <div className="md:hidden mb-4">
            <PlayerControls 
              isPlaying={isPlaying}
              togglePlayPause={togglePlayPause}
              prevSong={prevSong}
              nextSong={nextSong}
            />
          </div>
          
          {/* Progress bar */}
          <div className="mb-4">
            <PlayerProgress 
              progress={progress}
              duration={duration}
              formatTime={formatTime}
              handleProgressChange={handleProgressChange}
            />
          </div>
          
          {/* Desktop view: Player controls after progress */}
          <div className="hidden md:block">
            <PlayerControls 
              isPlaying={isPlaying}
              togglePlayPause={togglePlayPause}
              prevSong={prevSong}
              nextSong={nextSong}
            />
          </div>
          
          {/* Lyrics section */}
          {currentSong.lyrics && (
            <div className="mt-4 px-4 py-3 rounded-lg bg-white/5 text-center max-h-48 overflow-y-auto">
              <h3 className="text-white/90 text-sm mb-2 font-semibold">Lyrics</h3>
              <p className="text-white/70 text-sm whitespace-pre-line">{currentSong.lyrics}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
