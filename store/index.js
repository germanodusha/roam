import create from 'zustand'
import produce, { original } from 'immer'
import { MediaTypes } from '@/helpers/constants'

export const useStore = create((set) => {
  const setState = (fn) => set(produce(fn))

  const initialState = {
    game: {
      mouse: true,
      muted: true,
      pointerLock: { current: {} },
    },
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
        setState(({ state }) => {
          state.game.mouse = true
          state.game.muted = false
        })
      },
      enableLocker: () => {
        setState(({ state }) => {
          state.game.mouse = true
        })
      },
      disableLocker: () => {
        setState(({ state }) => {
          state.game.mouse = false
        })
      },
      onLoaded: () => {
        setState(({ state }) => {
          state.activeMedia = activeMedia
        })
      },
      cleanPointerLock: () => {
        setState(({ state }) => {
          state.game.pointerLock = { current: {} }
        })
      },
      setPointerLock: (pointerLock) => {
        setState(({ state }) => {
          state.game.pointerLock = pointerLock
        })
      },

      // media
      openMedia: (activeMedia) => {
        setState(({ state }) => {
          state.activeMedia = activeMedia

          if (!original(state.achievements).includes(activeMedia.media)) {
            state.achievements.push(activeMedia.media)
            state.counter.extra += 1
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

          if (!interaction || interaction.media.type !== MediaTypes.TRACK)
            return
          if (!original(state.achievements).includes(interaction.media)) {
            state.achievements.push(interaction.media)
            state.counter.main += 1
          }
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
