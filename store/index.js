import create from 'zustand'
import produce, { original } from 'immer'
import { MediaTypes } from '@/helpers/constants'

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
    nearInteraction: null,
    active: false,
    medias: [],
    achievements: [],
    counter: {
      main: 0,
      extra: 0,
    },
    activeMedia: false,
    glow: {},
  }

  return {
    state: initialState,
    actions: {
      // game
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

      // media
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

      // near interaction
      onChangeInteraction: (interaction) => {
        setState(({ state }) => {
          state.nearInteraction = interaction
        })
      },

      // player
      onMove: (direction, value) => {
        setState(({ state }) => {
          state.movement[direction] = value
        })
      },

      // glow
      addGlow: (meshs) => {
        meshs.forEach((mesh) => {
          if (mesh.current.type !== 'Mesh') return
          setState(({ state }) => {
            state.glow[mesh.current.id] = mesh.current
          })
        })
      },
    },
  }
})
