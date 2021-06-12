import { renderHook, act } from '@testing-library/react-hooks'
import { createDefaultMedia } from '../helpers/mock'
import { MediaTypes } from '../helpers/constants'
import { useStore } from './'

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
    // it('should move forward', () => {
    //   expect(true).toBe(false)
    // })

    it.todo('should move forward')
    it.todo('should move backward')
    it.todo('should move right')
    it.todo('should move left')
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

