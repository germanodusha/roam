import create from 'zustand'
import produce, { original } from 'immer'

const media = {
  id: 1,
  type: 'audio', // audio | video | text | track
  title: 'title',
  track: 'a',
  album: '',
  src: 'https://google.com',
  model3d: 'something',
}

export const useStore = create((set) => {
  const setState = (fn) => set(produce(fn))

  const initialState = {
    loading: true,
    movement: {
      forward: false,
      backward: false,
      left: false,
      right: false,
      jump: false,
    },
    active: false,
    medias: [],
    achievements: [],
    activeMedia: false,
  }

  return {
    state: initialState,
    actions: {
      reset: () => {
        set({ state: { ...initialState } })
      },
      init: () => {
        console.log('listeners go here')
      },
      onLoaded: () => {
        setState(({ state }) => {
          state.activeMedia = activeMedia
        })
      },
      openMedia: (activeMedia) => {
        setState(({ state }) => {
          state.activeMedia = activeMedia
        })
      },
      closeMedia: () => {
        setState(({ state }) => {
          state.activeMedia = false
        })
      },
      onMove: (direction, value) => {
        setState(({ state }) => {
          state.movement[direction] = value
        })
      },
    },
  }
})
