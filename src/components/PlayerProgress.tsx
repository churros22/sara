
import React from "react";

interface PlayerProgressProps {
  progress: number;
  duration: number;
  formatTime: (time: number) => string;
  handleProgressChange: (newProgress: number) => void;
}

const PlayerProgress = ({ 
  progress, 
  duration, 
  formatTime, 
  handleProgressChange 
}: PlayerProgressProps) => {
  return (
    <div className="space-y-2">
      <input
        type="range"
        min="0"
        max={duration || 0}
        value={progress}
        onChange={(e) => handleProgressChange(parseFloat(e.target.value))}
        className="w-full h-2 rounded-full appearance-none bg-primary/20 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
      />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{formatTime(progress)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default PlayerProgress;
