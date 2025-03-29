import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAudioContext } from "@/hooks/use-audio-context";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  BookText,
  CalendarHeart,
  Camera,
  FileVideo2,
  Github,
  Heart,
  Image,
  Music2,
  Puzzle,
  Video,
} from "lucide-react";

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const { songs, currentSongIndex, isPlaying, togglePlayPause } =
    useAudioContext();
  const { toast } = useToast();

  const applications = [
    {
      id: "saratify",
      name: "Saratify",
      description: "Listen to Sara's favorite songs.",
      icon: <Music2 className="h-5 w-5" />,
      path: "/saratify",
    },
    {
      id: "saranterest",
      name: "Saranterest",
      description: "A collection of Sara's memories.",
      icon: <Image className="h-5 w-5" />,
      path: "/saranterest",
    },
    {
      id: "saraprise",
      name: "Saraprise",
      description: "A special surprise for Sara.",
      icon: <Heart className="h-5 w-5" />,
      path: "/saraprise",
    },
    {
      id: "googolu",
      name: "Googolu",
      description: "Explore Sara's favorite websites.",
      icon: <BookText className="h-5 w-5" />,
      path: "/googolu",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("saraAccessGranted");
    window.dispatchEvent(new Event("storage"));
    navigate("/");
    toast({
      title: "👋 Goodbye!",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sara-purple/20 via-background to-sara-pink/20 py-8 px-4">
      <div className="container max-w-6xl mx-auto text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold font-pixel pixel-shadow text-primary mb-4">
            Welcome, Sara!
          </h1>
          <p className="text-lg text-muted-foreground font-vt323 mb-8">
            Explore the applications below:
          </p>
        </div>

        <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {applications.map((app) => (
            <Link
              key={app.id}
              to={app.path}
              className="glass rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <div className="mr-3 text-primary">{app.icon}</div>
                  <h3 className="text-xl font-semibold font-pixel pixel-shadow">
                    {app.name}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground font-vt323">
                  {app.description}
                </p>
                <div className="flex-grow"></div>
                <div className="mt-4">
                  <button className="px-4 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg font-pixel text-sm transition-colors">
                    Explore
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 animate-fade-in">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500 text-white rounded-lg font-pixel text-sm hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
