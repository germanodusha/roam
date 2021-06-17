import create from 'zustand'
import produce, { original } from 'immer'
import { MediaTypes } from '@/helpers/constants'

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
    counter: {
      main: 0,
      extra: 0,
    },
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

          if (!original(state.achievements).includes(activeMedia)) {
            state.achievements.push(activeMedia)

            if (activeMedia.type === MediaTypes.TRACK) {
              state.counter.main += 1
            } else {
              state.counter.extra += 1
            }
          }
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
