
import { Song } from "@/types/audio";

// Define the songs that need to be preloaded
const preloadSongs: Song[] = [
  {
    id: "1",
    title: "Happy Birthday",
    artist: "churros",
    src: "/assets/audio/arabic_sara.mp3",
    cover: "/assets/images/sara_7.jpg",
    lyrics: "not really lyrics"
  },
  {
    id: "2",
    title: "You Are Amazing",
    artist: "tame impala",
    src: "/assets/audio/sara_impala.mp3",
    cover: "/assets/images/sara_1.jpg",
    lyrics: "the less i know the better"
  },
  {
    id: "3",
    title: "Memories",
    artist: "cameleon",
    src: "/assets/audio/sara_poem.mp3",
    cover: "/assets/images/sara_2.jpg",
    lyrics: "lila."
  }
];

// Images to preload
const imagesToPreload = [
  "/assets/images/sara_1.jpg",
  "/assets/images/sara_2.jpg",
  "/assets/images/sara_3.jpg",
  "/assets/images/sara_4.jpg",
  "/assets/images/sara_5.jpg",
  "/assets/images/sara_7.jpg",
  "/assets/images/sara_8.jpg",
];

// Track preload status
let preloadStarted = false;

export const preloadAssets = () => {
  // Prevent duplicate preloading
  if (preloadStarted) {
    console.log("Assets already being preloaded");
    return;
  }
  
  preloadStarted = true;
  console.log("Starting asset preload");

  // Preload images in the background
  imagesToPreload.forEach(imageSrc => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => console.log(`Image preloaded: ${imageSrc}`);
  });

  // Preload audio files in the background
  preloadSongs.forEach(song => {
    const audio = new Audio();
    audio.preload = "auto";
    audio.src = song.src;
    audio.load();
    
    audio.oncanplaythrough = () => {
      console.log(`Audio preloaded: ${song.title}`);
      // Clean up event listener
      audio.oncanplaythrough = null;
    };
  });

  // Mark that preloading has started
  localStorage.setItem("saratify-assets-preloaded", "true");
};

// Export the songs for reuse
export const getSaratifySongs = (): Song[] => preloadSongs;
