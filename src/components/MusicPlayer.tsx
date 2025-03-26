
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

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
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number>(0);

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    if (!audioRef.current) return;
    
    const audio = audioRef.current;
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    
    const handleEnded = () => {
      nextSong();
    };
    
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      cancelAnimationFrame(animationRef.current);
    };
  }, [currentSongIndex]);

  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
        setIsPlaying(false);
      });
      startProgressAnimation();
    } else {
      audioRef.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }, [isPlaying, currentSongIndex]);

  const startProgressAnimation = () => {
    if (!audioRef.current) return;
    
    const updateProgress = () => {
      if (!audioRef.current) return;
      setProgress(audioRef.current.currentTime);
      animationRef.current = requestAnimationFrame(updateProgress);
    };
    
    animationRef.current = requestAnimationFrame(updateProgress);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  const prevSong = () => {
    setCurrentSongIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? songs.length - 1 : prevIndex - 1;
      return newIndex;
    });
  };

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => {
      const newIndex = prevIndex === songs.length - 1 ? 0 : prevIndex + 1;
      return newIndex;
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto glass rounded-2xl p-6 shadow-lg">
      <audio 
        ref={audioRef} 
        src={currentSong.src} 
        preload="metadata"
        onLoadedMetadata={() => audioRef.current && setDuration(audioRef.current.duration)}
      />
      
      <div className="flex flex-col space-y-6">
        {/* Album Cover */}
        <div className="relative w-full aspect-square overflow-hidden rounded-lg shadow-md mx-auto animate-float">
          <img 
            src={currentSong.cover} 
            alt={`${currentSong.title} cover`}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Song Info */}
        <div className="text-center">
          <h3 className="text-xl font-bold truncate">{currentSong.title}</h3>
          <p className="text-muted-foreground">{currentSong.artist}</p>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-2 rounded-full appearance-none bg-primary/20 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        
        {/* Controls */}
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
      </div>
      
      {/* Lyrics */}
      {currentSong.lyrics && (
        <div className="mt-8 px-4 py-6 rounded-lg bg-white/5 text-center max-h-60 overflow-y-auto custom-scrollbar">
          <p className="whitespace-pre-line">{currentSong.lyrics}</p>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
