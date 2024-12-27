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
}

export const useStore = create<StoreState>((set) => ({
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
        isCompleted: newIsCompleted
      };
    }),
  isCompleted: false,
  totalWaypoints: 9,
  progress: 0
}))

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
