
interface SongInfoProps {
  song: {
    title: string;
    artist: string;
    cover: string;
    lyrics?: string;
  };
}

const SongInfo = ({ song }: SongInfoProps) => {
  return (
    <>
      <div className="relative w-full aspect-square overflow-hidden rounded-lg mx-auto animate-float pixel-border">
        <div className="absolute inset-0 bg-gradient-to-br from-sara-retro1/10 to-sara-retro3/10 z-10"></div>
        <img 
          src={song.cover} 
          alt={`${song.title} cover`}
          className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
          loading="eager"
          decoding="async"
        />
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-black/50 backdrop-blur-sm z-20"></div>
      </div>
      
      <div className="text-center mt-3">
        <h3 className="text-xl font-bold font-pixel truncate pixel-shadow animate-pulse-gentle">{song.title}</h3>
        <p className="text-muted-foreground font-pixel animate-fade-in">{song.artist}</p>
      </div>
    </>
  );
};

export default SongInfo;
