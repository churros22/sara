
import { useState, useEffect } from "react";
import { Song } from "@/types/audio";

export function useSaratifyCache() {
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);
  
  // Songs data with corrected relative paths
  const songs: Song[] = [
    {
      id: "1",
      title: "Happy Birthday",
      artist: "churros",
      src: "./assets/audio/arabic_sara.mp3",
      cover: "./assets/images/sara_7.jpg",
      lyrics: "not really lyrics"
    },
    {
      id: "2",
      title: "You Are Amazing",
      artist: "tame impala",
      src: "./assets/audio/sara_impala.mp3",
      cover: "./assets/images/sara_1.jpg",
      lyrics: "the less i know the better"
    },
    {
      id: "3",
      title: "Memories",
      artist: "cameleon",
      src: "./assets/audio/sara_poem.mp3",
      cover: "./assets/images/sara_2.jpg",
      lyrics: "lila."
    }
  ];

  useEffect(() => {
    // Check if assets are already loaded
    const cacheKey = "saratify-assets-loaded";
    const assetsLoaded = localStorage.getItem(cacheKey);
    
    if (assetsLoaded === "true") {
      setIsAssetsLoaded(true);
    }
  }, []);

  return {
    songs,
    isAssetsLoaded
  };
}
