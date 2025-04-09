
import { Song } from "@/types/audio";

// Define the songs that need to be preloaded
const preloadSongs: Song[] = [
  {
    id: "1",
    title: "Happy Birthday",
    artist: "churros",
    src: "/assets/audio/sara_song_1.mp3",
    cover: "/assets/images/1744211238015.jpg",
    lyrics: "Not really lyrics, more like just a comment section xD"
  },
  {
    id: "2",
    title: "She's Amazing",
    artist: "Tame Impala",
    src: "/assets/audio/sara_impala.mp3",
    cover: "/assets/images/1744211238008.jpg",
    lyrics: "The less you know the better"
  },
  {
    id: "3",
    title: "Magical Force",
    artist: "Luke Skywalker",
    src: "/assets/audio/sara_song_2.mp3",
    cover: "/assets/images/1744211238055.jpg",
    lyrics: "Well .. Idk why I added this song 🤷🏻‍♂️"
  },
  {
    id: "4",
    title: "Saranade",
    artist: "churros",
    src: "/assets/audio/sara_song_3.mp3",
    cover: "/assets/images/1744211238024.jpg",
    lyrics: "You are all this and more"
  },
  {
    id: "5",
    title: "ها حي عليا و صايي",
    artist: "شاب ياسين تيريڨو",
    src: "/assets/audio/sara_song_4.mp3",
    cover: "/assets/images/1744211238034.jpg",
    lyrics: " شا باغي نڨولك لمّوك .. ها حي عليا و صايي"
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
  "/assets/images/sara_9.jpg",
  "/assets/images/sara_10.jpg",
  "/assets/images/sara_11.jpg",
  "/assets/images/sara_12.jpg",
  "/assets/images/sara_13.jpg",
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
