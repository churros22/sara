
import { Slider } from "@/components/ui/slider";

interface PlayerProgressProps {
  progress: number;
  duration: number;
  formatTime: (time: number) => string;
  handleProgressChange: (newProgress: number) => void;
}

const PlayerProgress = ({ progress, duration, formatTime, handleProgressChange }: PlayerProgressProps) => {
  return (
    <div className="space-y-1.5">
      <Slider
        value={[progress]}
        min={0}
        max={duration || 100}
        step={0.1}
        onValueChange={(values) => handleProgressChange(values[0])}
        className="w-full"
      />
      
      <div className="flex justify-between text-xs text-white/70">
        <span>{formatTime(progress)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default PlayerProgress;
