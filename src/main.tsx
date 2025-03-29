
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './components/ui/animations.css'

// Preload audio files
const preloadAudio = (urls: string[]) => {
  urls.forEach(url => {
    const audio = new Audio();
    audio.src = url;
  });
};

// Preload important assets
preloadAudio([
  '/assets/audio/arabic_sara.mp3',
  '/assets/audio/sara_impala.mp3',
  '/assets/audio/sara_poem.mp3'
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
