
import { useEffect } from "react";
import PlayerControls from "./PlayerControls";
import PlayerProgress from "./PlayerProgress";
import SongInfo from "./SongInfo";
import { useAudio } from "@/contexts/AudioContext";

interface Song {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover: string;
  lyrics?: string;
}

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
    setSongs
  } = useAudio();

  useEffect(() => {
    // Set songs in context
    setSongs(songs);
  }, [songs, setSongs]);

  const currentSong = songs[currentSongIndex];

  if (!currentSong) return null;

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
      </div>
      
      {currentSong.lyrics && (
        <div className="mt-8 px-4 py-6 rounded-lg bg-white/5 text-center max-h-60 overflow-y-auto custom-scrollbar">
          <p className="whitespace-pre-line">{currentSong.lyrics}</p>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
