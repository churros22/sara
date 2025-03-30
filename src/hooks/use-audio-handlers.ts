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
      
      // Instead of directly assigning to animationRef.current, we store the ID locally
      // and the parent component will control setting/accessing the ref value
      const id = requestAnimationFrame(updateProgress);
      
      // This is a workaround - we're not actually setting the ref directly,
      // just returning the ID for the parent component to use
      return id;
    };
    
    // Start the animation and return the ID
    return updateProgress();
  }, [audioRef, setProgress]);

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
    const newIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(newIndex);
  }, [setCurrentSongIndex, songs.length, currentSongIndex]);

  const nextSong = useCallback(() => {
    const newIndex = currentSongIndex === songs.length - 1 ? 0 : currentSongIndex + 1;
    setCurrentSongIndex(newIndex);
  }, [setCurrentSongIndex, songs.length, currentSongIndex]);

  const stopAndReset = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setProgress(0);
    
    // Use a callback for cancelling animation frame
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
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
