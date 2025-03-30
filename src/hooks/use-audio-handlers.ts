import { useCallback } from "react";
import { Song } from "@/types/audio";

interface AudioHandlersProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  animationRef: React.RefObject<number | null>;
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
      // Return the ID so it can be assigned in the parent component
      return requestAnimationFrame(updateProgress);
    };
    
    // Start the animation and return the ID
    return updateProgress();
  }, [audioRef, setProgress]);

  const togglePlayPause = useCallback(() => {
    console.log("Current play state before toggle:", isPlaying);
    setIsPlaying(!isPlaying);
    console.log("Current play state after toggle:", !isPlaying);
  }, [isPlaying, setIsPlaying]);

  const formatTime = useCallback((time: number) => {
    if (!time || isNaN(time)) return "0:00";
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
    if (songs.length === 0) return;
    const newIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(newIndex);
  }, [setCurrentSongIndex, songs.length, currentSongIndex]);

  const nextSong = useCallback(() => {
    if (songs.length === 0) return;
    const newIndex = currentSongIndex === songs.length - 1 ? 0 : currentSongIndex + 1;
    setCurrentSongIndex(newIndex);
  }, [setCurrentSongIndex, songs.length, currentSongIndex]);

  const stopAndReset = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    // Cancel animation frame if it exists
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      // Instead of directly assigning to .current, we handle this differently
      // The parent component should manage setting this to null after cancellation
    }
    
    setIsPlaying(false);
    setProgress(0);
  }, [audioRef, animationRef, setIsPlaying, setProgress]);

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
