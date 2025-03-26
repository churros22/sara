
import { useNavigate } from "react-router-dom";
import MusicPlayer from "@/components/MusicPlayer";

const Saratify = () => {
  const navigate = useNavigate();

  // Placeholder songs - these will be replaced with actual songs from the assets folder
  const songs = [
    {
      id: "1",
      title: "Happy Birthday",
      artist: "For Sara",
      src: "/assets/audio/song1.mp3",
      cover: "/assets/images/cover1.jpg",
      lyrics: "Happy birthday to you\nHappy birthday to you\nHappy birthday dear Sara\nHappy birthday to you!\n\nMay all your wishes come true today and always."
    },
    {
      id: "2",
      title: "You Are Amazing",
      artist: "Sara's Admirers",
      src: "/assets/audio/song2.mp3",
      cover: "/assets/images/cover2.jpg",
      lyrics: "You're amazing just the way you are\nYour smile lights up the entire room\nYour kindness touches everyone around you\nNever change, you're perfect as you are."
    },
    {
      id: "3",
      title: "Memories",
      artist: "Friends of Sara",
      src: "/assets/audio/song3.mp3",
      cover: "/assets/images/cover3.jpg",
      lyrics: "Remember all the good times\nAll the laughter we've shared\nEvery moment with you\nIs a treasure beyond compare."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Spotify-like header */}
      <div className="sticky top-0 z-10 bg-black/95 px-4 py-3 flex items-center">
        <button
          onClick={() => navigate("/")}
          className="p-2 rounded-full hover:bg-white/10 transition-colors mr-4 text-white"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
          </svg>
        </button>
        <div className="flex items-center">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#1DB954"/>
            <path d="M17.9 10.9C14.7 9 9.35 8.8 6.3 9.75C5.8 9.9 5.3 9.6 5.15 9.15C5 8.65 5.3 8.15 5.75 8C9.3 6.95 15.15 7.15 18.85 9.35C19.3 9.6 19.45 10.15 19.2 10.6C18.95 11 18.4 11.15 17.9 10.9ZM17.8 13.7C17.55 14.05 17.1 14.2 16.75 13.95C14.05 12.3 9.95 11.8 6.8 12.8C6.4 12.9 5.95 12.7 5.85 12.3C5.75 11.9 5.95 11.45 6.35 11.35C10 10.25 14.5 10.8 17.55 12.65C17.9 12.85 18.05 13.35 17.8 13.7ZM16.6 16.45C16.4 16.75 16.05 16.85 15.75 16.65C13.4 15.2 10.45 14.9 6.95 15.7C6.6 15.8 6.3 15.55 6.2 15.25C6.1 14.9 6.35 14.6 6.65 14.5C10.45 13.65 13.75 14 16.4 15.6C16.7 15.75 16.8 16.15 16.6 16.45Z" fill="white"/>
          </svg>
          <h1 className="text-2xl font-bold ml-2">Saratify</h1>
        </div>
      </div>

      <div className="container py-8 max-w-5xl mx-auto">
        {/* Custom player section */}
        <div className="bg-gray-900/70 rounded-lg p-6 shadow-lg">
          <MusicPlayer songs={songs} />
        </div>

        <div className="mt-12 text-center text-sm text-white/70">
          <p>
            To add your own songs, place audio files in the '/assets/audio/' folder, cover images in the '/assets/images/' folder, and update the songs array in the Saratify.tsx file.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Saratify;
