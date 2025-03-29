
import { useState } from "react";
import PlayerControls from "./PlayerControls";
import PlayerProgress from "./PlayerProgress";
import SongInfo from "./SongInfo";
import { useAudioContext } from "@/hooks/use-audio-context";

const MusicPlayer = () => {
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
    formatTime
  } = useAudioContext();

  const currentSong = songs[currentSongIndex];
  const [showLyrics, setShowLyrics] = useState(false);

  return (
    <div className="w-full max-w-xl mx-auto glass rounded-2xl p-6 shadow-lg">
      <div className="flex flex-col space-y-6">
        <SongInfo song={currentSong} />
        
        <PlayerProgress 
          progress={progress}
          duration={duration}
          formatTime={formatTime}
          handleProgressChange={handleProgressChange}
        />
        
        <PlayerControls 
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
          prevSong={prevSong}
          nextSong={nextSong}
        />

        {currentSong.lyrics && (
          <div className="mt-4 text-center">
            <button 
              onClick={() => setShowLyrics(!showLyrics)}
              className="px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg font-pixel text-sm transition-colors"
            >
              {showLyrics ? "Hide lyrics" : "Show lyrics"}
            </button>
          </div>
        )}
      </div>
      
      {showLyrics && currentSong.lyrics && (
        <div className="mt-4 px-4 py-4 rounded-lg bg-white/5 text-center max-h-60 overflow-y-auto custom-scrollbar animate-fade-in">
          <p className="whitespace-pre-line font-pixel text-sm">{currentSong.lyrics}</p>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
