import { renderHook, act } from '@testing-library/react-hooks'
import { createDefaultMedia } from '@/helpers/mock'
import { MediaTypes } from '@/helpers/constants'
import { useStore } from '@/store'

describe('test store', () => {
  let store

  beforeEach(() => {
    store = renderHook(() => useStore()).result
  })

  afterEach(() => {
    act(() => { store.current.actions.reset() })
  })

  describe('media', () => {
    it('should init with false activeMedia', () => {
      expect(store.current.state.activeMedia).toBe(false)
    })

    it('should toggle media audio', () => {
      expect(store.current.state.activeMedia).toBe(false)

      const type = MediaTypes.AUDIO
      const src = "https://google.com"
      const media = createDefaultMedia({ type, src })

      act(() => { store.current.actions.openMedia(media)})
      expect(store.current.state.activeMedia.type).toBe(type)

      expect(store.current.state.activeMedia.src).toBe(src)

      act(() => { store.current.actions.closeMedia() })
      expect(store.current.state.activeMedia).toBe(false)
    })

    it('should toggle media text', () => {
      expect(store.current.state.activeMedia).toBe(false)

      const type = MediaTypes.TEXT
      const content = ['text one', 'text two', 'text three']
      const media= createDefaultMedia({ type, content })

      act(() => { store.current.actions.openMedia(media)})
      expect(store.current.state.activeMedia.type).toBe(type)

      expect(store.current.state.activeMedia.content)
        .toHaveLength(content.length)
      expect(store.current.state.activeMedia.content).toBe(content)

      act(() => { store.current.actions.closeMedia() })
      expect(store.current.state.activeMedia).toBe(false)
    })

    it('should toggle media video', () => {
      expect(store.current.state.activeMedia).toBe(false)

      const type = MediaTypes.VIDEO
      const src = "https://youtube.com"
      const media = createDefaultMedia({ type, src })

      act(() => { store.current.actions.openMedia(media)})
      expect(store.current.state.activeMedia.type).toBe(type)

      expect(store.current.state.activeMedia.src).toBe(src)

      act(() => { store.current.actions.closeMedia() })
      expect(store.current.state.activeMedia).toBe(false)
    })

    it('should toggle media link', () => {
      expect(store.current.state.activeMedia).toBe(false)

      const type = MediaTypes.LINK
      const src = "https://blog.com"
      const media = createDefaultMedia({ type, src })

      act(() => { store.current.actions.openMedia(media)})
      expect(store.current.state.activeMedia.type).toBe(type)

      expect(store.current.state.activeMedia.src).toBe(src)

      act(() => { store.current.actions.closeMedia() })
      expect(store.current.state.activeMedia).toBe(false)
    })

    it.todo('should toggle main track')
  })

  describe('ignore media', () => {
    it.todo('should ignore object text')
    it.todo('should ignore object audio')
    it.todo('should ignore object video')
    it.todo('should ignore object link')
  })

  describe('init game', () => {
    it.todo('should validate init game')
  })

  describe('intro game', () => {
    it.todo('should show intro - title')
    it.todo('should show intro - description')
    it.todo('should show intro - key guide')
    it.todo('should enter the game')
  })

  describe('player movements', () => {
    const initialMovement = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      jump: false,
    }

    it('toggle move forward', () => {
      expect(store.current.state.movement).toStrictEqual(initialMovement)

      act(() => { store.current.actions.onMove('forward', true)})
      expect(store.current.state.movement).toStrictEqual({
        ...initialMovement,
        forward: true,
      })

      act(() => { store.current.actions.onMove('forward', false)})
      expect(store.current.state.movement).toStrictEqual(initialMovement)
    })

    it('toggle move backward', () => {
      expect(store.current.state.movement).toStrictEqual(initialMovement)

      act(() => { store.current.actions.onMove('backward', true)})
      expect(store.current.state.movement).toStrictEqual({
        ...initialMovement,
        backward: true,
      })

      act(() => { store.current.actions.onMove('backward', false)})
      expect(store.current.state.movement).toStrictEqual(initialMovement)
    })

    it('toggle move right', () => {
      expect(store.current.state.movement).toStrictEqual(initialMovement)

      act(() => { store.current.actions.onMove('right', true)})
      expect(store.current.state.movement).toStrictEqual({
        ...initialMovement,
        right: true,
      })

      act(() => { store.current.actions.onMove('right', false)})
      expect(store.current.state.movement).toStrictEqual(initialMovement)
    })

    it('toggle move left', () => {
      expect(store.current.state.movement).toStrictEqual(initialMovement)

      act(() => { store.current.actions.onMove('left', true)})
      expect(store.current.state.movement).toStrictEqual({
        ...initialMovement,
        left: true,
      })

      act(() => { store.current.actions.onMove('left', false)})
      expect(store.current.state.movement).toStrictEqual(initialMovement)
    })

    it('should combine movements', () => {
      act(() => { store.current.actions.onMove('forward', true)})
      expect(store.current.state.movement).toStrictEqual({
        ...initialMovement,
        forward: true,
      })

      act(() => { store.current.actions.onMove('right', true)})
      expect(store.current.state.movement).toStrictEqual({
        ...initialMovement,
        forward: true,
        right: true,
      })

      act(() => { store.current.actions.onMove('right', false)})
      expect(store.current.state.movement).toStrictEqual({
        ...initialMovement,
        forward: true,
      })

      act(() => { store.current.actions.onMove('left', true)})
      expect(store.current.state.movement).toStrictEqual({
        ...initialMovement,
        forward: true,
        left: true,
      })

      act(() => { store.current.actions.onMove('left', false)})
      expect(store.current.state.movement).toStrictEqual({
        ...initialMovement,
        forward: true,
      })

      act(() => { store.current.actions.onMove('forward', false)})
      expect(store.current.state.movement).toStrictEqual(initialMovement)
    })

    it.todo('should jump?')
  })

  describe('object interaction', () => {
    it.todo('should activate object')
    it.todo('should disable object')
    it.todo('should activate other object when some object already active')
  })

  describe('key guide', () => {
    it.todo('should open key guide')
    it.todo('should close key guide')
  })
})

