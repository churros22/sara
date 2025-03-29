
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Song {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover: string;
  lyrics?: string;
}

interface AudioContextType {
  songs: Song[];
  currentSongIndex: number;
  isPlaying: boolean;
  progress: number;
  duration: number;
  togglePlayPause: () => void;
  handleProgressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextSong: () => void;
  prevSong: () => void;
  formatTime: (time: number) => string;
  setCurrentSongIndex: (index: number) => void;
  audio: HTMLAudioElement | null;
  isAudioReady: boolean;
  isPlayerVisible: boolean;
  togglePlayerVisibility: () => void;
  stopAndReset: () => void;
}

const defaultSongs: Song[] = [
  {
    id: "1",
    title: "Happy Birthday",
    artist: "churros",
    src: "/assets/audio/arabic_sara.mp3",
    cover: "/assets/images/sara_7.jpg",
    lyrics: "not really lyrics"
  },
  {
    id: "2",
    title: "You Are Amazing",
    artist: "tame impala",
    src: "/assets/audio/sara_impala.mp3",
    cover: "/assets/images/sara_1.jpg",
    lyrics: "the less i know the better"
  },
  {
    id: "3",
    title: "Memories",
    artist: "cameleon",
    src: "/assets/audio/sara_poem.mp3",
    cover: "/assets/images/sara_2.jpg",
    lyrics: "lila."
  }
];

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage if available
  const [songs] = useState<Song[]>(defaultSongs);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(() => {
    const saved = localStorage.getItem("saratify-current-song");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [isPlaying, setIsPlaying] = useState<boolean>(() => {
    const saved = localStorage.getItem("saratify-is-playing");
    return saved ? saved === "true" : false;
  });
  const [progress, setProgress] = useState<number>(() => {
    const saved = localStorage.getItem("saratify-progress");
    return saved ? parseFloat(saved) : 0;
  });
  const [duration, setDuration] = useState<number>(0);
  const [isAudioReady, setIsAudioReady] = useState<boolean>(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState<boolean>(() => {
    const saved = localStorage.getItem("saratify-player-visible");
    return saved ? saved === "true" : false;
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number>(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Initialize audio element and add event listeners
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    
    const audio = audioRef.current;
    const currentSong = songs[currentSongIndex];
    
    // Save current song index to localStorage
    localStorage.setItem("saratify-current-song", currentSongIndex.toString());
    
    audio.src = currentSong.src;
    audio.preload = "auto";
    
    // Set audio time to saved progress
    if (progress > 0) {
      audio.currentTime = progress;
    }
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsAudioReady(true);
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
  }, [currentSongIndex, songs]);

  // Control playback based on isPlaying state
  useEffect(() => {
    if (!audioRef.current || !isAudioReady) return;
    
    // Save play state to localStorage
    localStorage.setItem("saratify-is-playing", isPlaying.toString());
    
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
  }, [isPlaying, isAudioReady]);

  // Save visibility state
  useEffect(() => {
    localStorage.setItem("saratify-player-visible", isPlayerVisible.toString());
  }, [isPlayerVisible]);

  // Save progress periodically
  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (progress > 0) {
        localStorage.setItem("saratify-progress", progress.toString());
      }
    }, 5000); // Save every 5 seconds
    
    return () => clearInterval(saveInterval);
  }, [progress]);

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
    // If player is hidden but user toggles play, make it visible
    if (!isPlayerVisible) {
      setIsPlayerVisible(true);
    }
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
    localStorage.setItem("saratify-progress", newTime.toString());
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

  const togglePlayerVisibility = () => {
    setIsPlayerVisible(!isPlayerVisible);
  };

  const stopAndReset = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setProgress(0);
    setIsPlayerVisible(false);
    
    // Clear localStorage data
    localStorage.removeItem("saratify-current-song");
    localStorage.removeItem("saratify-is-playing");
    localStorage.removeItem("saratify-progress");
    localStorage.removeItem("saratify-player-visible");
    
    toast({
      title: "Music stopped",
      description: "Your session has ended.",
    });
  };

  return (
    <AudioContext.Provider
      value={{
        songs,
        currentSongIndex,
        isPlaying,
        progress,
        duration,
        togglePlayPause,
        handleProgressChange,
        nextSong,
        prevSong,
        formatTime,
        setCurrentSongIndex,
        audio: audioRef.current,
        isAudioReady,
        isPlayerVisible,
        togglePlayerVisibility,
        stopAndReset
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioContext = (): AudioContextType => {
  const context = useContext(AudioContext);
  
  if (context === undefined) {
    throw new Error("useAudioContext must be used within an AudioProvider");
  }
  
  return context;
};
