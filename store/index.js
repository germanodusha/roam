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
    player: {
      position: [0, 0, 0],
    },
    movement: {
      forward: false,
      backwards: false,
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
      openMedia: (activeMedia) => {
        setState(({ state }) => { state.activeMedia = activeMedia })
      },
      closeMedia: () => {
        setState(({ state }) => { state.activeMedia = initialState.activeMedia })
      }
    },
  }
})
