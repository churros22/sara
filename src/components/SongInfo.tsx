
import { Heart } from "lucide-react";

interface SongInfoProps {
  song: {
    title: string;
    artist: string;
    cover: string;
  };
}

const SongInfo = ({ song }: SongInfoProps) => {
  return (
    <div className="flex flex-col">
      <div className="relative w-1/1">
        {/* Album art with improved iPhone compatibility */}
        <div className="relative aspect-square overflow-hidden rounded-lg mb-4 shadow-lg group">
          <img 
            src={song.cover} 
            alt={`${song.title} cover`}
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 group-hover:opacity-80 transition-opacity"></div>
          
          {/* Like button overlay */}
          <button className="absolute bottom-3 right-3 bg-black/40 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Heart size={16} className="text-white" />
          </button>
        </div>
      </div>
      
      {/* Song details with Spotify-like styling */}
      <div className="px-2">
        <h3 className="text-xl font-bold text-white truncate">{song.title}</h3>
        <p className="text-white/70 text-sm hover:text-[#1DB954] cursor-pointer transition-colors">{song.artist}</p>
      </div>
      
      {/* Additional features like album and release date */}
      <div className="mt-4 px-2 text-xs text-white/50">
        <div className="flex justify-between">
          <span>From the album of saranade</span>
          <span>2025</span>
        </div>
      </div>
    </div>
  );
};

export default SongInfo;
