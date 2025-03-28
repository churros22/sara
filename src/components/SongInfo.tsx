
interface SongInfoProps {
  song: {
    title: string;
    artist: string;
    cover: string;
  };
}

const SongInfo = ({ song }: SongInfoProps) => {
  return (
    <>
      <div className="relative w-full aspect-square overflow-hidden rounded-lg shadow-md mx-auto animate-float">
        <img 
          src={song.cover} 
          alt={`${song.title} cover`}
          className="w-full h-full object-cover"
          loading="eager" // Force eager loading for faster display
          decoding="async" // Use async decoding for performance
        />
      </div>
      
      <div className="text-center">
        <h3 className="text-xl font-bold truncate">{song.title}</h3>
        <p className="text-muted-foreground">{song.artist}</p>
      </div>
    </>
  );
};

export default SongInfo;
