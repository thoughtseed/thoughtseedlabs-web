import { Howl, HowlOptions } from 'howler';
import { useEffect, useRef, useCallback } from 'react';
import { useStore } from '../store/useStore';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AudioState {
  bgmVolume: number;
  waypointSoundsEnabled: boolean;
  toggleSoundsEnabled: boolean;
  isMuted: boolean;
}

// Extend HowlOptions to include pannerAttr
interface ExtendedHowlOptions extends HowlOptions {
  pannerAttr?: {
    panningModel: 'HRTF' | 'equalpower';
    distanceModel: 'inverse' | 'linear' | 'exponential';
    refDistance: number;
    maxDistance: number;
    rolloffFactor: number;
    coneInnerAngle: number;
    coneOuterAngle: number;
    coneOuterGain: number;
  };
}

// Audio store for managing global audio states with persistence
export const useAudioStore = create<AudioState>()(
  persist(
    (set) => ({
      bgmVolume: 0.3, // Set to 30%
      waypointSoundsEnabled: true,
      toggleSoundsEnabled: true,
      isMuted: false,
    }),
    {
      name: 'audio-storage',
    }
  )
);

const AUDIO_CONFIG = {
  bgm: {
    src: '/audio/Digital-Snowfall.mp3',
    volume: 0.3, // 30% volume
    fadeTime: 2000,
  },
  toggle: {
    src: '/audio/Mindful-Touch.mp3',
    volume: 0.7,
  },
  waypoint: {
    src: '/audio/Subtle-Touches.mp3',
    volume: 0.6,
  },
};

export const useAudio = () => {
  const bgmRef = useRef<Howl | null>(null);
  const toggleSoundRef = useRef<Howl | null>(null);
  const waypointSoundRef = useRef<Howl | null>(null);
  const bgmInitializedRef = useRef(false);

  // Initialize sounds
  useEffect(() => {
    if (bgmInitializedRef.current) return;

    const isMuted = useAudioStore.getState().isMuted;
    const initialVolume = isMuted ? 0 : AUDIO_CONFIG.bgm.volume;

    // Initialize Howl instances
    bgmRef.current = new Howl({
      src: [AUDIO_CONFIG.bgm.src],
      volume: initialVolume,
      loop: true,
      autoplay: false,
    } as ExtendedHowlOptions);

    toggleSoundRef.current = new Howl({
      src: [AUDIO_CONFIG.toggle.src],
      volume: isMuted ? 0 : AUDIO_CONFIG.toggle.volume,
    } as ExtendedHowlOptions);

    waypointSoundRef.current = new Howl({
      src: [AUDIO_CONFIG.waypoint.src],
      volume: isMuted ? 0 : AUDIO_CONFIG.waypoint.volume,
      pannerAttr: {
        panningModel: 'HRTF',
        distanceModel: 'inverse',
        refDistance: 1,
        maxDistance: 10000,
        rolloffFactor: 1,
        coneInnerAngle: 360,
        coneOuterAngle: 360,
        coneOuterGain: 0
      }
    } as ExtendedHowlOptions);

    // Initialize BGM state based on mute status
    const timer = setTimeout(() => {
      if (bgmRef.current && !bgmInitializedRef.current) {
        if (!isMuted) {
          bgmRef.current.play();
          bgmRef.current.volume(AUDIO_CONFIG.bgm.volume);
        } else {
          // If muted, load but don't play
          bgmRef.current.load();
        }
        bgmInitializedRef.current = true;
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      bgmRef.current?.unload();
      toggleSoundRef.current?.unload();
      waypointSoundRef.current?.unload();
    };
  }, []);

  const toggleMute = useCallback(() => {
    if (!bgmRef.current) return;
    
    const isMuted = useAudioStore.getState().isMuted;
    const newMutedState = !isMuted;
    
    if (newMutedState) {
      // When muting - stop all sounds completely
      bgmRef.current.stop();
      bgmRef.current.volume(0);
      if (toggleSoundRef.current) {
        toggleSoundRef.current.stop();
        toggleSoundRef.current.volume(0);
      }
      if (waypointSoundRef.current) {
        waypointSoundRef.current.stop();
        waypointSoundRef.current.volume(0);
      }
    } else {
      // When unmuting - start fresh with correct volumes
      bgmRef.current.volume(AUDIO_CONFIG.bgm.volume);
      bgmRef.current.play();
      if (toggleSoundRef.current) toggleSoundRef.current.volume(AUDIO_CONFIG.toggle.volume);
      if (waypointSoundRef.current) waypointSoundRef.current.volume(AUDIO_CONFIG.waypoint.volume);
    }
    
    useAudioStore.setState({ 
      isMuted: newMutedState,
      toggleSoundsEnabled: !newMutedState // Disable toggle sounds when muted
    });
  }, []);

  const playToggleSound = useCallback(() => {
    // Don't play toggle sound if muted or if it's a mute toggle action
    if (!toggleSoundRef.current || !useAudioStore.getState().toggleSoundsEnabled || useAudioStore.getState().isMuted) return;
    toggleSoundRef.current.play();
  }, []);

  const playWaypointSound = useCallback((position: { x: number; y: number; z: number }) => {
    if (!waypointSoundRef.current || !useAudioStore.getState().waypointSoundsEnabled) return;
    
    waypointSoundRef.current.pos(position.x, position.y, position.z);
    waypointSoundRef.current.play();
  }, []);

  return {
    playToggleSound,
    playWaypointSound,
    toggleMute,
    isMuted: useAudioStore((state) => state.isMuted),
  };
};
