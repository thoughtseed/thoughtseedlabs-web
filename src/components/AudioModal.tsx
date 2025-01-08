import React from 'react'
import { useStore } from '../store/useStore'
import { useAudio } from '../hooks/useAudio'
import Modal from './Modal'
import { useAudioStore } from '../hooks/useAudio'

export const AudioModal = () => {
  const { showAudioModal, setShowAudioModal } = useStore()
  const { toggleMute } = useAudio()

  const handleContinue = (withSound: boolean) => {
    if (!withSound) {
      // If user chooses no sound, disable all sounds first, then mute
      useAudioStore.setState({
        waypointSoundsEnabled: false,
        toggleSoundsEnabled: false
      });
      if (!useAudioStore.getState().isMuted) {
        toggleMute();
      }
    } else {
      // If user chooses sound, enable all sounds and ensure unmuted
      useAudioStore.setState({
        waypointSoundsEnabled: true,
        toggleSoundsEnabled: true
      });
      if (useAudioStore.getState().isMuted) {
        toggleMute();
      }
    }
    setShowAudioModal(false);
  };

  if (!showAudioModal) return null

  return (
    <Modal 
      isOpen={showAudioModal} 
      onClose={() => {}} 
      title="Welcome to the Experience"
      className="bg-black/40 w-[90%]"
    >
      <div className="prose prose-invert max-w-none px-4 sm:px-6">
        <p className="text-base sm:text-lg leading-relaxed mb-6 text-center">
          This is an immersive audio-visual journey through a winter wonderland. 
          Would you like to continue with sound?
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => handleContinue(true)}
            className="w-full sm:w-auto px-6 py-4 sm:py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm
              text-white rounded-lg transition-all duration-200 ease-in-out
              border border-white/20 text-base sm:text-sm font-medium
              shadow-[0_0_15px_rgba(255,255,255,0.1)]
              hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Continue with Sound
          </button>
          <button
            onClick={() => handleContinue(false)}
            className="w-full sm:w-auto px-6 py-4 sm:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm
              text-white/80 rounded-lg transition-all duration-200 ease-in-out
              border border-white/10 text-base sm:text-sm font-medium
              shadow-[0_0_15px_rgba(255,255,255,0.1)]
              hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Continue without Sound
          </button>
        </div>
        <p className="text-xs sm:text-sm text-white/60 text-center mt-8 sm:mt-6">
          You can toggle sound at any time using the audio controls
        </p>
      </div>
    </Modal>
  )
}

export default AudioModal
