
import { Heart } from "lucide-react";

/**
 * Interface for the SongInfo component props
 * @property {object} song - The song object containing title, artist, and cover image
 */
interface SongInfoProps {
  song: {
    title: string;
    artist: string;
    cover: string;
  };
}

/**
 * SongInfo Component
 * Displays information about a song including album art, title, and artist
 * 
 * @param {SongInfoProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const SongInfo = ({ song }: SongInfoProps) => {
  return (
    <div className="flex flex-col">
      {/* Album art container with hover effects */}
      <div className="relative aspect-square overflow-hidden rounded-lg mb-4 shadow-lg group">
        <img 
          src={song.cover} 
          alt={`${song.title} cover`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="eager"
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 group-hover:opacity-80 transition-opacity"></div>
        
        {/* Like button overlay that appears on hover */}
        <button 
          className="absolute bottom-3 right-3 bg-black/40 hover:bg-black/60 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all"
          aria-label="Like song"
        >
          <Heart size={16} className="text-white" />
        </button>
      </div>
      
      {/* Song details */}
      <h3 className="text-xl font-bold text-white truncate">{song.title}</h3>
      <p className="text-white/70 text-sm hover:text-[#1DB954] cursor-pointer transition-colors">{song.artist}</p>
      
      {/* Album info with year */}
      <div className="mt-4 text-xs text-white/50">
        <div className="flex justify-between">
          <span>From the album of saranade</span>
          <span>2025</span>
        </div>
      </div>
    </div>
  );
};

export default SongInfo;
