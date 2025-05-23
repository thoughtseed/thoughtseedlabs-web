import { Howl, Howler } from 'howler';
import { useEffect, useRef, useCallback } from 'react';
import { useStore } from '../store/useStore';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Audio groups for better control
type AudioGroup = {
  sound: Howl;
  baseVolume: number;
  fadeTime: number;
};

interface AudioGroups {
  bgm: AudioGroup;
  ui: AudioGroup;
  waypoints: AudioGroup;
}

interface AudioState {
  waypointSoundsEnabled: boolean;
  toggleSoundsEnabled: boolean;
  isMuted: boolean;
  fadeDuration: number;
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set) => ({
      waypointSoundsEnabled: true,
      toggleSoundsEnabled: true,
      isMuted: false,
      fadeDuration: 2000, // 2 seconds fade duration
    }),
    {
      name: 'audio-storage',
    }
  )
);

const AUDIO_CONFIG = {
  bgm: {
    src: '/audio/Digital-Snowfall.wav',
    baseVolume: 0.15, // Reduced base volume
    fadeTime: 3000, // 3 second fade
    startDelay: 1000, // 1 second delay before starting fade in
  },
  ui: {
    src: '/audio/Mindful-Touch.mp3',
    baseVolume: 0.4,
    fadeTime: 150, // Quick fade for UI sounds
  },
  waypoint: {
    src: '/audio/Subtle-Touches.mp3',
    baseVolume: 0.7,
    fadeTime: 300,
  },
};

export const useAudio = () => {
  const audioGroupsRef = useRef<AudioGroups | null>(null);
  const bgmInitializedRef = useRef(false);
  const fadeTimeoutRef = useRef<number | null>(null);
  const soundInstancesRef = useRef<Howl[]>([]);  // Track all sound instances

  // Keep Howler's global mute state in sync with our store
  useEffect(() => {
    const unsubscribe = useAudioStore.subscribe((state) => {
      Howler.mute(state.isMuted);
    });

    // Set initial state
    Howler.mute(useAudioStore.getState().isMuted);

    return () => unsubscribe();
  }, []);

  // Function to safely create and track a Howl instance
  const createTrackedHowl = useCallback((config: any) => {
    const sound = new Howl(config);
    soundInstancesRef.current.push(sound);
    return sound;
  }, []);

  // Initialize audio groups
  useEffect(() => {
    if (bgmInitializedRef.current) return;

    const isMuted = useAudioStore.getState().isMuted;
    const { soundVolume } = useStore.getState();
    
    // Apply global volume from store (normalized to 0-1)
    const volumeMultiplier = soundVolume / 100;
    Howler.volume(volumeMultiplier);

    // Create audio groups with initial setup
    audioGroupsRef.current = {
      bgm: {
        sound: createTrackedHowl({
          src: [AUDIO_CONFIG.bgm.src],
          volume: 0, // Start at 0 for fade in
          loop: true,
          autoplay: false,
          html5: true,
          format: ['wav'],
          onload: function() {
            // Skip compressor setup for now as it's causing errors
            // We'll use Howler's built-in volume controls instead
          }
        }),
        baseVolume: AUDIO_CONFIG.bgm.baseVolume * volumeMultiplier,
        fadeTime: AUDIO_CONFIG.bgm.fadeTime,
      },
      ui: {
        sound: createTrackedHowl({
          src: [AUDIO_CONFIG.ui.src],
          volume: AUDIO_CONFIG.ui.baseVolume * volumeMultiplier,
        }),
        baseVolume: AUDIO_CONFIG.ui.baseVolume * volumeMultiplier,
        fadeTime: AUDIO_CONFIG.ui.fadeTime,
      },
      waypoints: {
        sound: createTrackedHowl({
          src: [AUDIO_CONFIG.waypoint.src],
          volume: AUDIO_CONFIG.waypoint.baseVolume * volumeMultiplier,
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
        }),
        baseVolume: AUDIO_CONFIG.waypoint.baseVolume * volumeMultiplier,
        fadeTime: AUDIO_CONFIG.waypoint.fadeTime,
      }
    };

    // Initialize BGM with fade in
    fadeTimeoutRef.current = window.setTimeout(() => {
      if (audioGroupsRef.current && !bgmInitializedRef.current) {
        const { sound, baseVolume, fadeTime } = audioGroupsRef.current.bgm;
        sound.play();
        sound.fade(0, baseVolume, fadeTime);
        bgmInitializedRef.current = true;
      }
    }, AUDIO_CONFIG.bgm.startDelay);

    return () => {
      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, [createTrackedHowl]);
  
  // Listen for sound volume changes
  useEffect(() => {
    const unsubscribe = useStore.subscribe((state) => {
      if (audioGroupsRef.current && state.soundVolume !== undefined) {
        const volumeMultiplier = state.soundVolume / 100;
        
        // Update global volume
        Howler.volume(volumeMultiplier);
        
        // Update all audio groups' base volumes
        if (audioGroupsRef.current.bgm) {
          audioGroupsRef.current.bgm.baseVolume = AUDIO_CONFIG.bgm.baseVolume * volumeMultiplier;
        }
        if (audioGroupsRef.current.ui) {
          audioGroupsRef.current.ui.baseVolume = AUDIO_CONFIG.ui.baseVolume * volumeMultiplier;
        }
        if (audioGroupsRef.current.waypoints) {
          audioGroupsRef.current.waypoints.baseVolume = AUDIO_CONFIG.waypoint.baseVolume * volumeMultiplier;
        }
      }
    });
    
    return () => unsubscribe();
  }, []);

  // Cleanup all sound instances when the hook unmounts
  useEffect(() => {
    return () => {
      // Clean up any audio resources
      soundInstancesRef.current.forEach(sound => {
        if (sound.playing()) {
          sound.stop();
        }
        sound.unload();
      });
      soundInstancesRef.current = [];
      
      if (audioGroupsRef.current) {
        Object.values(audioGroupsRef.current).forEach(group => {
          if (group.sound.playing()) {
            group.sound.stop();
          }
          // Unload should already happen via soundInstancesRef cleanup, but added for safety
          group.sound.unload();
        });
        audioGroupsRef.current = null;
      }
    };
  }, []);

  const toggleMute = useCallback(() => {
    const isMuted = useAudioStore.getState().isMuted;
    const newMutedState = !isMuted;
    
    // Use Howler's global mute
    Howler.mute(newMutedState);
    
    useAudioStore.setState({ 
      isMuted: newMutedState,
      toggleSoundsEnabled: true
    });
  }, []);

  const playToggleSound = useCallback(() => {
    if (!audioGroupsRef.current?.ui.sound || 
        !useAudioStore.getState().toggleSoundsEnabled || 
        useAudioStore.getState().isMuted) return;

    // Temporarily reduce BGM volume for UI sound
    const bgm = audioGroupsRef.current.bgm;
    const ui = audioGroupsRef.current.ui;
    
    bgm.sound.fade(bgm.sound.volume(), bgm.baseVolume * 0.3, 100);
    ui.sound.volume(ui.baseVolume);
    ui.sound.play();
    
    // Restore BGM volume after UI sound
    setTimeout(() => {
      bgm.sound.fade(bgm.sound.volume(), bgm.baseVolume, 500);
    }, 200);
  }, []);

  const playWaypointSound = useCallback((position: { x: number; y: number; z: number }) => {
    if (!audioGroupsRef.current?.waypoints.sound || 
        !useAudioStore.getState().waypointSoundsEnabled) return;
    
    const waypoints = audioGroupsRef.current.waypoints;
    const bgm = audioGroupsRef.current.bgm;
    
    // Duck BGM volume for waypoint sound
    bgm.sound.fade(bgm.sound.volume(), bgm.baseVolume * 0.4, 200);
    
    waypoints.sound.pos(position.x, position.y, position.z);
    waypoints.sound.volume(waypoints.baseVolume);
    waypoints.sound.play();
    
    // Restore BGM volume after waypoint sound
    setTimeout(() => {
      bgm.sound.fade(bgm.sound.volume(), bgm.baseVolume, 600);
    }, 400);
  }, []);

  return {
    playToggleSound,
    playWaypointSound,
    toggleMute,
    isMuted: useAudioStore((state) => state.isMuted),
  };
};
