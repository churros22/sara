
import { useState, useEffect, useRef } from "react";

interface Song {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover: string;
  lyrics?: string;
}

export function useMusicPlayer(songs: Song[]) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number>(0);

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    const audioElements = songs.map(song => {
      const audio = new Audio(song.src);
      audio.preload = "auto";
      return audio;
    });
    
    return () => {
      audioElements.forEach(audio => {
        audio.pause();
        audio.src = "";
      });
    };
  }, [songs]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    
    const audio = audioRef.current;
    
    audio.src = currentSong.src;
    audio.preload = "auto";
    audio.load();
    setIsAudioReady(false);
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsAudioReady(true);
    };
    
    const handleEnded = () => {
      nextSong();
    };
    
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    
    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Audio playback failed:", error);
          setIsPlaying(false);
        });
      }
      startProgressAnimation();
    }
    
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      cancelAnimationFrame(animationRef.current);
    };
  }, [currentSongIndex, currentSong.src]);

  useEffect(() => {
    if (!audioRef.current || !isAudioReady) return;
    
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

  return {
    currentSong,
    isPlaying,
    progress,
    duration,
    togglePlayPause,
    handleProgressChange,
    nextSong,
    prevSong,
    formatTime
  };
}
