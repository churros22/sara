import { createContext, useState, useContext, useEffect, useRef } from "react";
import { useAudioHandlers } from "@/hooks/use-audio-handlers";
import { Song } from "@/types/audio";

interface AudioContextType {
  currentSongIndex: number;
  setCurrentSongIndex: (index: number) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  progress: number;
  setProgress: (progress: number) => void;
  duration: number;
  setDuration: (duration: number) => void;
  songs: Song[];
  setSongs: (songs: Song[]) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  handleProgressChange: (newProgress: number) => void;
  togglePlayPause: () => void;
  nextSong: () => void;
  prevSong: () => void;
  formatTime: (time: number) => string;
  stopAndReset: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(() => {
    // Try to load from localStorage
    const savedIndex = localStorage.getItem("saratify-current-song-index");
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [songs, setSongs] = useState<Song[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<number | null>(null);

  // Get audio handler functions from custom hook
  const { 
    togglePlayPause, 
    formatTime,
    handleProgressChange,
    prevSong, 
    nextSong,
    stopAndReset,
    startProgressAnimation
  } = useAudioHandlers({
    audioRef,
    animationRef,
    isPlaying,
    setIsPlaying,
    setProgress,
    currentSongIndex, 
    setCurrentSongIndex,
    songs
  });

  // Save current song index to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("saratify-current-song-index", currentSongIndex.toString());
  }, [currentSongIndex]);

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      console.log("Attempting to play audio...");
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Audio playback started successfully");
            // Start the animation and store the ID
            const animationId = startProgressAnimation();
            if (animationId !== undefined) {
              animationRef.current = animationId;
            }
          })
          .catch(error => {
            console.error("Audio playback failed:", error);
            setIsPlaying(false);
          });
      }
    } else {
      audioRef.current.pause();
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }
  }, [isPlaying, startProgressAnimation]);

  // Update audio src when current song changes
  useEffect(() => {
    if (!audioRef.current || songs.length === 0) return;
    
    const currentSong = songs[currentSongIndex];
    if (!currentSong) return;
    
    console.log(`Loading song: ${currentSong.title} from ${currentSong.src}`);
    audioRef.current.src = currentSong.src;
    audioRef.current.load();
    
    // Try to restore progress
    const savedProgress = localStorage.getItem(`saratify-song-progress-${currentSong.id}`);
    if (savedProgress) {
      const parsedProgress = parseFloat(savedProgress);
      setProgress(parsedProgress);
      if (audioRef.current) {
        audioRef.current.currentTime = parsedProgress;
      }
    }

    // Don't automatically play when song changes - let user initiate
    setIsPlaying(false);
  }, [currentSongIndex, songs]);

  // Save progress periodically
  useEffect(() => {
    if (songs.length === 0 || !songs[currentSongIndex]) return;
    
    const currentSong = songs[currentSongIndex];
    
    const saveInterval = setInterval(() => {
      if (progress > 0) {
        localStorage.setItem(`saratify-song-progress-${currentSong.id}`, progress.toString());
      }
    }, 5000);
    
    return () => clearInterval(saveInterval);
  }, [progress, currentSongIndex, songs]);

  // Properly handle cleanup when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        if (animationRef.current !== null) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      }
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        currentSongIndex,
        setCurrentSongIndex,
        isPlaying,
        setIsPlaying,
        progress,
        setProgress,
        duration,
        setDuration,
        songs,
        setSongs,
        audioRef,
        handleProgressChange,
        togglePlayPause,
        nextSong,
        prevSong,
        formatTime,
        stopAndReset
      }}
    >
      <audio
        ref={audioRef}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
            // Make sure audio is loaded properly
            console.log("Audio loaded, duration:", audioRef.current.duration);
          }
        }}
        onEnded={() => {
          console.log("Song ended, playing next");
          nextSong();
        }}
        onError={(e) => {
          console.error("Audio error:", e);
          setIsPlaying(false);
        }}
        preload="auto"
      />
      {children}
    </AudioContext.Provider>
  );
};
