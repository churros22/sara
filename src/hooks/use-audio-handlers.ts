
import { useCallback } from "react";
import { Song } from "@/types/audio";

interface AudioHandlersProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  animationRef: React.RefObject<number>;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  setProgress: (progress: number) => void;
  currentSongIndex: number;
  setCurrentSongIndex: (index: number) => void;
  songs: Song[];
}

export function useAudioHandlers({
  audioRef,
  animationRef,
  isPlaying,
  setIsPlaying,
  setProgress,
  currentSongIndex,
  setCurrentSongIndex,
  songs
}: AudioHandlersProps) {

  const startProgressAnimation = useCallback(() => {
    if (!audioRef.current) return;
    
    const updateProgress = () => {
      if (!audioRef.current) return;
      setProgress(audioRef.current.currentTime);
      animationRef.current = requestAnimationFrame(updateProgress);
    };
    
    animationRef.current = requestAnimationFrame(updateProgress);
  }, [audioRef, setProgress, animationRef]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying, setIsPlaying]);

  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }, []);

  const handleProgressChange = useCallback((newProgress: number) => {
    if (!audioRef.current) return;
    
    audioRef.current.currentTime = newProgress;
    setProgress(newProgress);
  }, [audioRef, setProgress]);

  const prevSong = useCallback(() => {
    setCurrentSongIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? songs.length - 1 : prevIndex - 1;
      return newIndex;
    });
  }, [setCurrentSongIndex, songs.length]);

  const nextSong = useCallback(() => {
    setCurrentSongIndex((prevIndex) => {
      const newIndex = prevIndex === songs.length - 1 ? 0 : prevIndex + 1;
      return newIndex;
    });
  }, [setCurrentSongIndex, songs.length]);

  const stopAndReset = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setProgress(0);
    cancelAnimationFrame(animationRef.current);
  }, [audioRef, setIsPlaying, setProgress, animationRef]);

  return {
    togglePlayPause,
    formatTime,
    handleProgressChange,
    prevSong,
    nextSong,
    stopAndReset,
    startProgressAnimation
  };
}
