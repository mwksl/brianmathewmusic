'use client';

import { useEffect } from 'react';

export default function AudioPlayer() {
  useEffect(() => {
    // Function to handle play event for HTML5 audio controls
    function handlePlay(e: Event) {
      const audio = e.target as HTMLAudioElement;
      const currentId = audio.id;
      const container = audio.closest('.audio-container') as HTMLElement;
      const loadingIndicator = container?.querySelector('.loading-indicator') as HTMLElement;
      
      if (loadingIndicator) {
        loadingIndicator.style.display = 'flex';
      }
      
      // Pause all other audio elements
      document.querySelectorAll('audio').forEach((otherAudio) => {
        if (otherAudio.id !== currentId && !otherAudio.paused) {
          otherAudio.pause();
        }
      });
    }
    
    // Function to handle playing state
    function handlePlaying(e: Event) {
      const audio = e.target as HTMLAudioElement;
      const container = audio.closest('.audio-container') as HTMLElement;
      const loadingIndicator = container?.querySelector('.loading-indicator') as HTMLElement;
      
      if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
      }
    }
    
    // Function to handle pause state
    function handlePause(e: Event) {
      const audio = e.target as HTMLAudioElement;
      const container = audio.closest('.audio-container') as HTMLElement;
      const loadingIndicator = container?.querySelector('.loading-indicator') as HTMLElement;
      
      if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
      }
    }
    
    // Add event listeners to audio elements
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('playing', handlePlaying);
      audio.addEventListener('pause', handlePause);
    });
    
    // Create loading indicators for each audio element
    audioElements.forEach(audio => {
      const container = document.createElement('div');
      container.className = 'audio-container relative';
      audio.parentNode?.insertBefore(container, audio);
      container.appendChild(audio);
      
      const loadingIndicator = document.createElement('div');
      loadingIndicator.className = 'loading-indicator';
      loadingIndicator.style.display = 'none';
      loadingIndicator.style.position = 'absolute';
      loadingIndicator.style.top = '0';
      loadingIndicator.style.left = '0';
      loadingIndicator.style.width = '100%';
      loadingIndicator.style.height = '100%';
      loadingIndicator.style.backgroundColor = 'rgba(178, 92, 101, 0.1)';
      loadingIndicator.style.justifyContent = 'center';
      loadingIndicator.style.alignItems = 'center';
      loadingIndicator.style.borderRadius = '4px';
      loadingIndicator.style.zIndex = '10';
      loadingIndicator.innerHTML = '<div style="width: 20px; height: 20px; border: 2px solid #b25c65; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>';
      container.appendChild(loadingIndicator);
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
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    // Cleanup function
    return () => {
      audioElements.forEach(audio => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('playing', handlePlaying);
        audio.removeEventListener('pause', handlePause);
        
        // Remove the container and revert to original DOM structure
        const container = audio.closest('.audio-container');
        if (container && container.parentNode) {
          container.parentNode.insertBefore(audio, container);
          container.parentNode.removeChild(container);
        }
      });
      
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return null; // This component doesn't render anything visually
}
