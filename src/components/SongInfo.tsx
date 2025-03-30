
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
      {/* Album art with improved iPhone compatibility */}
      <div className="relative aspect-square overflow-hidden rounded-lg mb-4 shadow-lg">
        <img 
          src={song.cover} 
          alt={`${song.title} cover`}
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
      </div>
      
      {/* Song details */}
      <div className="px-2">
        <h3 className="text-xl font-bold text-white truncate">{song.title}</h3>
        <p className="text-white/70 text-sm">{song.artist}</p>
      </div>
    </div>
  );
};

export default SongInfo;
