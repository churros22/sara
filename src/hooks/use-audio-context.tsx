
import { createContext, useContext, useState, useEffect } from 'react';

interface Song {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover: string; // Added cover property
  lyrics?: string;
}

interface AudioContextType {
  songs: Song[];
  currentSongIndex: number;
  isPlaying: boolean;
  progress: number;
  duration: number;
  togglePlayPause: () => void;
  handleProgressChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Updated parameter type
  nextSong: () => void;
  prevSong: () => void;
  formatTime: (time: number) => string;
  stopAndReset: () => void; // Added stopAndReset function
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioContext must be used within an AudioProvider");
  }
  return context;
};

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [songs, setSongs] = useState<Song[]>([
    {
      id: "1",
      title: "Arabic Birthday Song",
      artist: "Unknown",
      src: "/assets/audio/arabic_sara.mp3",
      cover: "/assets/images/sara_1.jpg", // Added cover image
      lyrics: `يا سارة عيد ميلاد سعيد
      كل عام وأنتِ بخير
      يا رب تكون أيامك كلها سعادة
      وتتحقق كل أمانيكِ
      
      اليوم يوم فرح وهنا
      نحتفل بوجودكِ بيننا
      يا أغلى الناس وأحلى من الورد
      عيد ميلاد سعيد يا سارة
      
      يا سارة يا نور العيون
      يا بهجة القلب الحنون
      الله يجعل أيامك كلها خير
      وتكوني دائمًا في سرور
      
      يا سارة عيد ميلاد سعيد
      كل عام وأنتِ بخير
      يا رب تكون أيامك كلها سعادة
      وتتحقق كل أمانيكِ`
    },
    {
      id: "2",
      title: "Sara",
      artist: "Tame Impala",
      src: "/assets/audio/sara_impala.mp3",
      cover: "/assets/images/sara_2.jpg", // Added cover image
      lyrics: `[Verse 1]
      It's always the same
      I'm stuck in a dream
      I can't get away
      From this overwhelming feeling
      
      [Chorus]
      Sara, oh Sara
      Why do you haunt me?
      Sara, oh Sara
      I can't break free
      
      [Verse 2]
      I try to move on
      But you're always there
      In every song
      In every breath of air
      
      [Chorus]
      Sara, oh Sara
      Why do you haunt me?
      Sara, oh Sara
      I can't break free
      
      [Bridge]
      Is this my fate?
      To always be with you
      Even when you're gone
      I don't know what to do
      
      [Chorus]
      Sara, oh Sara
      Why do you haunt me?
      Sara, oh Sara
      I can't break free
      
      [Outro]
      Sara, oh Sara
      I'm lost without you
      Sara, oh Sara
      Please come back to me`
    },
    {
      id: "3",
      title: "A Poem for Sara",
      artist: "GPT-4",
      src: "/assets/audio/sara_poem.mp3",
      cover: "/assets/images/sara_3.jpg", // Added cover image
      lyrics: `In realms of thought, where dreams reside,
      A name emerges, with grace as its guide.
      Sara, a beacon, both gentle and bright,
      Illuminating pathways, with radiant light.
      
      With a heart so tender, and spirit so free,
      She dances through life, with glee.
      A tapestry woven, of kindness and care,
      Sara's essence, beyond compare.
      
      In moments of challenge, her strength takes flight,
      A warrior's courage, in darkest night.
      With unwavering resolve, she conquers all,
      An inspiration to stand, when others fall.
      
      Her laughter echoes, a melodious song,
      Bringing joy to hearts, where shadows throng.
      A symphony of warmth, in every embrace,
      Sara's presence, a comforting space.
      
      So let us celebrate, this soul so rare,
      Sara, a treasure beyond all compare.
      May her journey be blessed, with love and with cheer,
      And may happiness follow, year after year.`
    },
  ]);
  
  const [currentSongIndex, setCurrentSongIndex] = useState(() => {
    // Load from localStorage if available, otherwise default to 0
    const savedIndex = localStorage.getItem('currentSongIndex');
    return savedIndex ? parseInt(savedIndex) : 0;
  });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  
  // Initialize audio element once on mount
  useEffect(() => {
    const audio = new Audio();
    setAudioElement(audio);
    
    // Set initial audio source
    audio.src = songs[currentSongIndex].src;
    audio.load();
    
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);
  
  // Set up audio event listeners
  useEffect(() => {
    if (!audioElement) return;
    
    const handleTimeUpdate = () => {
      setProgress(audioElement.currentTime);
    };
    
    const handleDurationChange = () => {
      setDuration(audioElement.duration);
    };
    
    const handleEnded = () => {
      nextSong();
    };
    
    audioElement.addEventListener('timeupdate', handleTimeUpdate);
    audioElement.addEventListener('durationchange', handleDurationChange);
    audioElement.addEventListener('ended', handleEnded);
    
    return () => {
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      audioElement.removeEventListener('durationchange', handleDurationChange);
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, [audioElement]);
  
  // Effect to save currentSongIndex to localStorage
  useEffect(() => {
    localStorage.setItem('currentSongIndex', currentSongIndex.toString());
  }, [currentSongIndex]);
  
  // Effect to update audio source when song changes
  useEffect(() => {
    if (!audioElement) return;
    
    audioElement.src = songs[currentSongIndex].src;
    audioElement.load();
    
    if (isPlaying) {
      const playPromise = audioElement.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Audio playback error:", error);
          setIsPlaying(false);
        });
      }
    }
  }, [currentSongIndex, songs]);
  
  // Effect to handle play/pause state
  useEffect(() => {
    if (!audioElement) return;
    
    if (isPlaying) {
      const playPromise = audioElement.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Audio playback error:", error);
          setIsPlaying(false);
        });
      }
    } else {
      audioElement.pause();
    }
  }, [isPlaying, audioElement]);
  
  // Effect to stop music on logout
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'saraAccessGranted' && e.newValue !== 'true') {
        setIsPlaying(false);
        if (audioElement) {
          audioElement.pause();
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [audioElement]);
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioElement) return;
    const newProgress = parseFloat(e.target.value);
    audioElement.currentTime = newProgress;
    setProgress(newProgress);
  };
  
  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };
  
  const prevSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Add stopAndReset function
  const stopAndReset = () => {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
    setIsPlaying(false);
  };
  
  return (
    <AudioContext.Provider
      value={{
        songs,
        currentSongIndex,
        isPlaying,
        progress,
        duration,
        togglePlayPause,
        handleProgressChange,
        nextSong,
        prevSong,
        formatTime,
        stopAndReset,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export default AudioContext;
