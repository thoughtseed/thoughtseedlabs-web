import React, { useState, useEffect } from 'react'
import { useStore } from '../store/useStore'
import { useAudio } from '../hooks/useAudio'
import Modal from './Modal'
import { useAudioStore } from '../hooks/useAudio'
import { useEdgeConfig } from '../hooks/useEdgeConfig'
import VolumeSlider from './ui/VolumeSlider'
import TutorialWaypointDemo from './TutorialWaypointDemo'
import { Howler } from 'howler'

export const AudioModal = () => {
  const { 
    showAudioModal, 
    setShowAudioModal,
    tutorialStep,
    setTutorialStep,
    setTutorialCompleted,
    setSoundVolume
  } = useStore()
  
  const { toggleMute } = useAudio()
  const { config, loading } = useEdgeConfig()
  const [highlightedWaypoint, setHighlightedWaypoint] = useState(0)
  
  // Animation for highlighting different waypoints in the demo
  useEffect(() => {
    if (tutorialStep === 2) {
      const interval = setInterval(() => {
        setHighlightedWaypoint(prev => (prev + 1) % 5)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [tutorialStep])

  useEffect(() => {
    if (!loading && config?.audio) {
      // Apply default audio settings from Edge Config
      useAudioStore.setState({
        waypointSoundsEnabled: config.audio.autoPlay,
        toggleSoundsEnabled: config.audio.autoPlay,
        isMuted: !config.audio.autoPlay
      })
    }
  }, [config, loading])

  const handleCompleteTutorial = (withSound: boolean) => {
    const volume = withSound ? 75 : 0
    
    // Update sound settings
    setSoundVolume(volume)
    Howler.volume(volume / 100)
    
    if (!withSound) {
      // If user chooses no sound, disable all sounds first, then mute
      useAudioStore.setState({
        waypointSoundsEnabled: false,
        toggleSoundsEnabled: false,
        isMuted: true
      })
      if (!useAudioStore.getState().isMuted) {
        toggleMute()
      }
    } else {
      // If user chooses sound, enable all sounds and ensure unmuted
      useAudioStore.setState({
        waypointSoundsEnabled: true,
        toggleSoundsEnabled: true,
        isMuted: false
      })
      if (useAudioStore.getState().isMuted) {
        toggleMute()
      }
    }
    
    setTutorialCompleted(true)
    setShowAudioModal(false)
  }

  const nextStep = () => {
    if (tutorialStep < 3) {
      setTutorialStep(tutorialStep + 1)
    } else {
      handleCompleteTutorial(true)
    }
  }

  const prevStep = () => {
    if (tutorialStep > 0) {
      setTutorialStep(tutorialStep - 1)
    }
  }

  if (!showAudioModal) return null
  
  // Modal titles for each step
  const titles = [
    "Welcome to Thoughtseed",
    "Sound Preferences",
    "Discover Waypoints",
    "Ready to Explore"
  ]

  const renderStepContent = () => {
    switch(tutorialStep) {
      case 0:
        return (
          <>
            <div className="relative mb-6 h-[130px] overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 opacity-80"></div>
              <div className="absolute inset-0 bg-[url('/images/texture2.png')] opacity-40 mix-blend-overlay"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-3xl font-bold text-white tracking-tight">
                  Begin Your Journey
                </h2>
              </div>
            </div>
            <p className="text-base sm:text-lg leading-relaxed mb-6 text-center">
              Welcome to an immersive exploration of boundaries and innovation. 
              Thoughtseed invites you to venture across disciplines and discover 
              the intersections where new ideas flourish.
            </p>
            <p className="text-base leading-relaxed mb-6 text-center text-white/80">
              This brief guide will help you navigate the experience and unlock 
              its full potential. Are you ready to begin?
            </p>
          </>
        );
        
      case 1:
        return (
          <>
            <div className="mb-6 relative">
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-10">
                <div className="w-32 h-32 rounded-full bg-white animate-pulse"></div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">Enhance Your Experience</h3>
              <p className="text-base leading-relaxed mb-8 text-center">
                Sound is an essential part of the Thoughtseed experience, creating an 
                atmosphere that guides your exploration and signals discoveries.
              </p>
              
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 mb-6 border border-white/10">
                <h4 className="text-lg font-medium mb-4 text-center">Adjust Sound Volume</h4>
                <VolumeSlider className="mb-4" />
                <div className="flex gap-2 flex-wrap">
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
                    <span className="text-sm">Waypoint signals</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse"></div>
                    <span className="text-sm">Ambient soundscape</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="text-sm">Interaction feedback</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
        
      case 2:
        return (
          <>
            <h3 className="text-xl font-semibold mb-2 text-center">Navigate The Experience</h3>
            <p className="text-base leading-relaxed mb-4 text-center">
              Thoughtseed's world is organized as a series of interactive <span className="text-blue-300 font-medium">waypoints</span> that 
              you can discover and explore.
            </p>
            
            <div className="mb-6">
              <TutorialWaypointDemo highlightIndex={highlightedWaypoint} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div className="bg-white/5 backdrop-blur-md rounded-lg p-3 border border-white/10">
                <h4 className="font-medium mb-1">How to Find Waypoints</h4>
                <p className="text-sm text-white/80">
                  Waypoints become visible as you navigate the space. Move toward glowing 
                  points to reveal their purpose.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-lg p-3 border border-white/10">
                <h4 className="font-medium mb-1">Interactive Menu Items</h4>
                <p className="text-sm text-white/80">
                  Each waypoint is a gateway to content. Click on waypoints to explore 
                  different aspects of Thoughtseed's work.
                </p>
              </div>
            </div>
          </>
        );
        
      case 3:
        return (
          <>
            <div className="relative mb-6 h-[130px] overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-70"></div>
              <div className="absolute inset-0 bg-[url('/images/texture3.jpeg')] opacity-30 mix-blend-overlay"></div>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
                  Discovery Awaits
                </h2>
                <p className="text-sm text-white/80 max-w-md text-center">
                  Not all paths are visible at first glance
                </p>
              </div>
            </div>
            <p className="text-base leading-relaxed mb-4 text-center">
              Thoughtseed exists at the crossroads of technology, art, science, and design. 
              Your exploration will reveal unexpected connections and hidden insights.
            </p>
            <div className="bg-white/5 backdrop-blur-md rounded-lg p-4 border border-white/10 mb-6">
              <h4 className="font-medium mb-2 text-center">Hidden Elements</h4>
              <div className="flex justify-center gap-4 mb-2">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/30'}`}
                  ></div>
                ))}
              </div>
              <p className="text-sm text-white/80 text-center">
                Some waypoints reveal themselves only after others have been discovered. 
                Venture beyond the obvious to find all sacred geometries.
              </p>
            </div>
          </>
        );
        
      default:
        return null;
    }
  }

  return (
    <Modal 
      isOpen={showAudioModal} 
      onClose={() => {}} 
      title={titles[tutorialStep]}
      className="bg-black/40 w-[90%] max-w-2xl"
    >
      <div className="prose prose-invert max-w-none px-4 py-2 sm:px-6">
        {/* Step content */}
        <div className="min-h-[350px]">
          {renderStepContent()}
        </div>
        
        {/* Step indicators */}
        <div className="flex justify-center space-x-2 my-4">
          {[0, 1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step === tutorialStep
                  ? 'w-8 bg-white'
                  : step < tutorialStep
                  ? 'w-4 bg-white/60'
                  : 'w-4 bg-white/20'
              }`}
            />
          ))}
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={prevStep}
            className={`px-5 py-2 rounded-lg transition-all duration-200 
              ${tutorialStep === 0 
                ? 'opacity-0 cursor-default' 
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
              }`}
            disabled={tutorialStep === 0}
          >
            Back
          </button>
          
          <div className="flex space-x-4">
            {tutorialStep === 3 && (
              <button
                onClick={() => handleCompleteTutorial(false)}
                className="px-5 py-2 bg-white/10 hover:bg-white/20 
                  text-white/80 rounded-lg transition-all duration-200 
                  border border-white/10 text-sm"
              >
                Continue without Sound
              </button>
            )}
            
            <button
              onClick={nextStep}
              className="px-5 py-2 bg-white/20 hover:bg-white/30 
                text-white rounded-lg transition-all duration-200 
                border border-white/20 text-sm
                shadow-[0_0_15px_rgba(255,255,255,0.1)]
                hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              {tutorialStep < 3 ? 'Continue' : 'Begin Experience with Sound'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default AudioModal
