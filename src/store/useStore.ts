import { create } from 'zustand'

interface StoreState {
  texture: string
  setTexture: (texture: string) => void
}

export const useStore = create<StoreState>((set) => ({
  texture: '/images/Origami 1.jpeg',
  setTexture: (texture) => set({ texture }),
}))
