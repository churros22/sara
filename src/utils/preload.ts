
import { Song } from "@/types/audio";

// Define the songs that need to be preloaded
const preloadSongs: Song[] = [
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

// Images to preload - changed from absolute paths to relative paths
const imagesToPreload = [
  "./assets/images/sara_1.jpg",
  "./assets/images/sara_2.jpg",
  "./assets/images/sara_3.jpg",
  "./assets/images/sara_4.jpg",
  "./assets/images/sara_5.jpg",
  "./assets/images/sara_7.jpg",
  "./assets/images/sara_8.jpg",
];

// Track preload status
let preloadStarted = false;
let preloadCompleted = false;

export const preloadAssets = () => {
  // Check if already completed
  if (preloadCompleted) {
    console.log("Assets already preloaded completely");
    return;
  }
  
  // Prevent duplicate preloading
  if (preloadStarted) {
    console.log("Assets already being preloaded");
    return;
  }
  
  preloadStarted = true;
  console.log("Starting asset preload");

  let imagesLoaded = 0;
  let audioLoaded = 0;
  
  // Helper to check if all assets are loaded
  const checkAllLoaded = () => {
    if (imagesLoaded === imagesToPreload.length && audioLoaded === preloadSongs.length) {
      console.log("All assets preloaded successfully!");
      preloadCompleted = true;
      localStorage.setItem("saratify-assets-preloaded", "true");
    }
  };

  // Preload images in the background
  imagesToPreload.forEach(imageSrc => {
    const img = new Image();
    img.onload = () => {
      console.log(`Image preloaded: ${imageSrc}`);
      imagesLoaded++;
      checkAllLoaded();
    };
    img.onerror = (e) => {
      console.error(`Failed to preload image: ${imageSrc}`, e);
      // Count as loaded even if it failed, to avoid blocking
      imagesLoaded++;
      checkAllLoaded();
    };
    img.src = imageSrc;
  });

  // Preload audio files in the background
  preloadSongs.forEach(song => {
    const audio = new Audio();
    audio.preload = "auto";
    
    audio.oncanplaythrough = () => {
      console.log(`Audio preloaded: ${song.title}`);
      audioLoaded++;
      checkAllLoaded();
      // Clean up event listener
      audio.oncanplaythrough = null;
    };
    
    audio.onerror = (e) => {
      console.error(`Failed to preload audio: ${song.title}`, e);
      // Count as loaded even if it failed, to avoid blocking
      audioLoaded++;
      checkAllLoaded();
    };
    
    audio.src = song.src;
    audio.load();
  });
};

// Export the songs for reuse
export const getSaratifySongs = (): Song[] => preloadSongs;
