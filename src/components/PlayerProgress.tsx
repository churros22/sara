
import { Slider } from "@/components/ui/slider";

interface PlayerProgressProps {
  progress: number;
  duration: number;
  formatTime: (time: number) => string;
  handleProgressChange: (newProgress: number) => void;
}

const PlayerProgress = ({ progress, duration, formatTime, handleProgressChange }: PlayerProgressProps) => {
  // Calculate percentage for custom styling
  const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;
  
  return (
    <div className="space-y-1.5">
      <div className="relative h-1 bg-white/20 rounded-full w-full group cursor-pointer"
           onClick={(e) => {
             const rect = e.currentTarget.getBoundingClientRect();
             const offsetX = e.clientX - rect.left;
             const newProgress = (offsetX / rect.width) * duration;
             handleProgressChange(newProgress);
           }}>
        <div 
          className="absolute left-0 top-0 h-full bg-white group-hover:bg-[#1DB954] rounded-full transition-colors"
          style={{ width: `${progressPercentage}%` }}
        ></div>
        <div 
          className="absolute h-3 w-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity -translate-y-1/3"
          style={{ left: `${progressPercentage}%`, transform: 'translateX(-50%) translateY(-25%)' }}
        ></div>
      </div>
      
      <div className="flex justify-between text-xs text-white/70">
        <span>{formatTime(progress)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default PlayerProgress;
