import React from 'react'
import { useStore, getRandomQuote } from '../store/useStore'
import Modal from './Modal.tsx'

export const AchievementIcon = () => {
  const { 
    showAchievementIcon, 
    showAchievementModal,
    setShowAchievementModal
  } = useStore()

  if (!showAchievementIcon) return null

  const handleClick = () => {
    setShowAchievementModal(true)
  }

  return (
    <>
      <div 
        onClick={handleClick}
        className="fixed bottom-24 right-8 w-12 h-12 cursor-pointer
          flex items-center justify-center
          bg-blue-500/30 backdrop-blur-md
          rounded-full border border-white/20
          shadow-lg hover:scale-110
          transition-all duration-300 ease-in-out
          animate-pulse hover:animate-none
          group"
      >
        {/* Trophy Icon */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-white group-hover:text-yellow-300 transition-colors"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
        
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md -z-10 animate-glow"></div>
      </div>

      {/* Achievement Modal */}
      {showAchievementModal && (
        <Modal
          isOpen={showAchievementModal}
          onClose={() => setShowAchievementModal(false)}
          title="Journey Completed!"
        >
          <div className="p-6 text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-blue-500/30 rounded-full flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-12 w-12 text-yellow-300"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <p className="text-white/90 text-lg italic">
              {getRandomQuote()}
            </p>
            <p className="text-white/70">
              You've discovered all the waypoints and completed your journey through the winter wonderland.
            </p>
          </div>
        </Modal>
      )}
    </>
  )
}

export default AchievementIcon
