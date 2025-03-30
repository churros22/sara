
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

export const preloadAssets = () => {
  // Check if assets are already preloaded
  if (localStorage.getItem("sara-assets-preloaded") === "true") {
    console.log("Assets already preloaded");
    return;
  }

  // Preload images
  imagesToPreload.forEach(imageSrc => {
    const img = new Image();
    img.src = imageSrc;
  });

  // Preload audio files
  preloadSongs.forEach(song => {
    const audio = new Audio();
    audio.preload = "auto";
    audio.src = song.src;
    
    // We're just initiating the download, not playing
    audio.load();
    
    // Clean up
    audio.oncanplaythrough = () => {
      console.log(`Preloaded: ${song.title}`);
      audio.oncanplaythrough = null;
    };
  });

  // Mark assets as preloaded
  localStorage.setItem("sara-assets-preloaded", "true");
  console.log("Assets preloading started");
};
