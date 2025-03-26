
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white">
      <div className="container py-8">
        <div className="flex items-center mb-12">
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
            <h1 className="text-3xl font-bold">Saratify</h1>
          </div>
        </div>

        <MusicPlayer songs={songs} />

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
