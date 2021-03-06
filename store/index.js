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
    formatedTime: '00:00',
    glow: {},
    backgroundAudio: true,
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
          state.nearInteraction = null
          state.activeMedia = activeMedia

          if (!activeMedia || !activeMedia.media) return

          if (activeMedia.media.type === MediaTypes.VIDEO) {
            state.backgroundAudio = false
          }

          if (!original(state.achievements).includes(activeMedia.media)) {
            state.achievements.push(activeMedia.media)
            state.counter.extra += 1
          }
        })
      },
      closeMedia: () => {
        setState(({ state }) => {
          state.backgroundAudio = true
          state.activeMedia = false
        })
      },
      updateTimer: (formatedTime = '00:00') => {
        setState(({ state }) => {
          state.formatedTime = formatedTime
        })
      },

      // near interaction
      onChangeInteraction: (interaction) => {
        setState(({ state }) => {
          if (!interaction) {
            state.nearInteraction = null
            state.backgroundAudio = true
            return
          }

          const hasMedia = state.activeMedia
          if (hasMedia) return

          state.nearInteraction = interaction
          state.backgroundAudio = true

          if (interaction.media.type === MediaTypes.TRACK) {
            state.backgroundAudio = false

            if (!original(state.achievements).includes(interaction.media)) {
              state.achievements.push(interaction.media)
              state.counter.main += 1
            }
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
