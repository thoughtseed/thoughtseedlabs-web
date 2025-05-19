import React, { useState, useEffect } from 'react'
import { useStore } from '../../store/useStore'
import { Howler } from 'howler'

interface VolumeSliderProps {
  initialVolume?: number
  onChange?: (volume: number) => void
  className?: string
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({
  initialVolume = 75,
  onChange,
  className = ''
}) => {
  const { soundVolume, setSoundVolume } = useStore()
  const [volume, setVolume] = useState(initialVolume)
  
  // Initialize from store if available
  useEffect(() => {
    if (typeof soundVolume === 'number') {
      setVolume(soundVolume)
    }
  }, [soundVolume])

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value)
    setVolume(newVolume)
    setSoundVolume(newVolume)
    
    // Update Howler's global volume (normalized to 0-1)
    Howler.volume(newVolume / 100)
    
    if (onChange) {
      onChange(newVolume)
    }
  }

  // Define volume icon based on level
  const getVolumeIcon = () => {
    if (volume === 0) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      )
    } else if (volume < 50) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072" />
        </svg>
      )
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M19.536 4.464a9 9 0 010 15.072" />
        </svg>
      )
    }
  }

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <div className="text-white">
        {getVolumeIcon()}
      </div>
      <div className="flex-1 relative">
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-white/20
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md
            [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white"
        />
        <div 
          className="absolute top-1 left-0 h-[4px] bg-white/60 rounded-lg pointer-events-none" 
          style={{ width: `${volume}%` }}
        />
      </div>
      <div className="text-white text-sm w-8 text-center">
        {volume}%
      </div>
    </div>
  )
}

export default VolumeSlider
