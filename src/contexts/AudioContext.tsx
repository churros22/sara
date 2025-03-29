
import { createContext, useState, useContext, useEffect, useRef } from "react";

interface Song {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover: string;
  lyrics?: string;
}

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
  const animationRef = useRef<number>(0);

  // Save current song index to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("saratify-current-song-index", currentSongIndex.toString());
  }, [currentSongIndex]);

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Audio playback failed:", error);
          setIsPlaying(false);
        });
      }
      startProgressAnimation();
    } else {
      audioRef.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }, [isPlaying]);

  // Update audio src when current song changes
  useEffect(() => {
    if (!audioRef.current || songs.length === 0) return;
    
    const currentSong = songs[currentSongIndex];
    if (!currentSong) return;
    
    audioRef.current.src = currentSong.src;
    audioRef.current.load();
    
    // Try to restore progress
    const savedProgress = localStorage.getItem(`saratify-song-progress-${currentSong.id}`);
    if (savedProgress) {
      const parsedProgress = parseFloat(savedProgress);
      setProgress(parsedProgress);
      audioRef.current.currentTime = parsedProgress;
    }

    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
        setIsPlaying(false);
      });
    }
  }, [currentSongIndex, songs]);

  // Save progress periodically
  useEffect(() => {
    if (songs.length === 0) return;
    
    const currentSong = songs[currentSongIndex];
    if (!currentSong) return;
    
    const saveInterval = setInterval(() => {
      if (progress > 0) {
        localStorage.setItem(`saratify-song-progress-${currentSong.id}`, progress.toString());
      }
    }, 5000);
    
    return () => clearInterval(saveInterval);
  }, [progress, currentSongIndex, songs]);

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

  const handleProgressChange = (newProgress: number) => {
    if (!audioRef.current) return;
    
    audioRef.current.currentTime = newProgress;
    setProgress(newProgress);
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

  const stopAndReset = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setProgress(0);
    cancelAnimationFrame(animationRef.current);
  };

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
          }
        }}
        onEnded={nextSong}
      />
      {children}
    </AudioContext.Provider>
  );
};
