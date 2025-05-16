import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';
import { cn } from '../utils/helper-functions.js';

export const AudioControls = () => {
  const { isMuted, toggleMute } = useAudio();

  return (
    <div className="audio-controls">
      <button
        onClick={toggleMute}
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center",
          "border border-white/20 transition-colors",
          isMuted && "muted"
        )}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX size={20} className="text-black/80" />
        ) : (
          <Volume2 size={20} className="text-black/80" />
        )}
      </button>
    </div>
  );
};


