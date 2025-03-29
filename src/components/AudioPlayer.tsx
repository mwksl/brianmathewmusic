'use client';

import { useEffect } from 'react';

export default function AudioPlayer() {
  useEffect(() => {
    // Function to handle play event for HTML5 audio controls
    function handlePlay(e: Event) {
      const audio = e.target as HTMLAudioElement;
      const currentId = audio.id;
      
      // Pause all other audio elements
      document.querySelectorAll('audio').forEach((otherAudio) => {
        if (otherAudio.id !== currentId && !otherAudio.paused) {
          otherAudio.pause();
        }
      });
    }
    
    // Add event listeners to audio elements
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
      audio.addEventListener('play', handlePlay);
    });

    // Add custom CSS to style the audio controls
    const style = document.createElement('style');
    style.textContent = `
      audio {
        width: 100%;
      }
      
      audio::-webkit-media-controls-panel {
        background-color: rgba(178, 92, 101, 0.05);
        border-radius: 4px;
      }
      
      audio::-webkit-media-controls-play-button {
        background-color: #b25c65;
        border-radius: 50%;
        width: 30px;
        height: 30px;
      }
      
      audio::-webkit-media-controls-current-time-display,
      audio::-webkit-media-controls-time-remaining-display {
        color: #b25c65;
        font-weight: 500;
      }
      
      audio::-webkit-media-controls-timeline {
        background-color: #e0d5c8;
        border-radius: 2px;
        height: 4px;
        margin: 0 10px;
      }
      
      audio::-webkit-media-controls-timeline-container {
        padding: 0 5px;
      }
    `;
    document.head.appendChild(style);

    // Cleanup function
    return () => {
      audioElements.forEach(audio => {
        audio.removeEventListener('play', handlePlay);
      });
      
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return null; // This component doesn't render anything visually
}
