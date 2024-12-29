import { create } from 'zustand'

interface StoreState {
  texture: string
  setTexture: (texture: string) => void
  waypointsVisible: boolean
  setWaypointsVisible: (visible: boolean) => void
  instructionsVisible: boolean
  setInstructionsVisible: (visible: boolean) => void
  visitedWaypoints: string[]
  addVisitedWaypoint: (waypoint: string) => void
  isCompleted: boolean
  totalWaypoints: number
  progress: number
  // Audio preferences
  audioEnabled: boolean
  setAudioEnabled: (enabled: boolean) => void
  showAudioModal: boolean
  setShowAudioModal: (show: boolean) => void
  // Achievement notification
  showAchievementIcon: boolean
  setShowAchievementIcon: (show: boolean) => void
  showAchievementModal: boolean
  setShowAchievementModal: (show: boolean) => void
  // Quotes system
  currentQuoteIndex: number
  setCurrentQuoteIndex: (index: number) => void
}

const quotes = [
  "Every footprint in the snow leads to a new discovery.",
  "In the depths of winter, I finally learned there was in me an invincible summer.",
  "The journey through the snow reveals the warmth within.",
  "Each step forward is a story waiting to be told.",
  "In silence, the snow speaks volumes.",
  "The path less traveled is often covered in snow.",
  "Winter whispers secrets to those who listen.",
  "Every snowflake falls exactly where it's meant to.",
  "The greatest adventures often begin in the coldest moments.",
  "Through the frost, we find our clearest reflections."
]

export const useStore = create<StoreState>((set) => ({
  // Existing state
  texture: '/images/Origami 1.jpeg',
  setTexture: (texture) => set({ texture }),
  waypointsVisible: false,
  setWaypointsVisible: (visible) => set({ waypointsVisible: visible }),
  instructionsVisible: true,
  setInstructionsVisible: (visible) => set({ instructionsVisible: visible }),
  visitedWaypoints: [],
  addVisitedWaypoint: (waypoint) => 
    set((state) => {
      if (state.visitedWaypoints.includes(waypoint)) {
        return state;
      }
      const newVisitedWaypoints = [...state.visitedWaypoints, waypoint];
      const newProgress = (newVisitedWaypoints.length / state.totalWaypoints) * 100;
      const newIsCompleted = newVisitedWaypoints.length === state.totalWaypoints;
      
      return {
        visitedWaypoints: newVisitedWaypoints,
        progress: newProgress,
        isCompleted: newIsCompleted,
        showAchievementIcon: newIsCompleted
      };
    }),
  isCompleted: false,
  totalWaypoints: 9,
  progress: 0,
  // Audio preferences
  audioEnabled: false,
  setAudioEnabled: (enabled) => set({ audioEnabled: enabled }),
  showAudioModal: true,
  setShowAudioModal: (show) => set({ showAudioModal: show }),
  // Achievement notification
  showAchievementIcon: false,
  setShowAchievementIcon: (show) => set({ showAchievementIcon: show }),
  showAchievementModal: false,
  setShowAchievementModal: (show) => set({ showAchievementModal: show }),
  // Quotes system
  currentQuoteIndex: 0,
  setCurrentQuoteIndex: (index) => set({ currentQuoteIndex: index })
}))

export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length)
  useStore.getState().setCurrentQuoteIndex(randomIndex)
  return quotes[randomIndex]
}

// Add keyboard event listener
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e) => {
    const store = useStore.getState()
    const key = e.key.toLowerCase()
    
    // Check for any direction key
    if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
      if (!store.waypointsVisible) {
        useStore.getState().setWaypointsVisible(true)
      }
      if (store.instructionsVisible) {
        useStore.getState().setInstructionsVisible(false)
      }
    }
  })
}
