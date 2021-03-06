import { renderHook, act } from '@testing-library/react-hooks'
import { createDefaultMedia, createDefaultInteraction } from '@/helpers/mock'
import { MediaTypes } from '@/helpers/constants'
import { useStore } from '@/store'

describe('test store', () => {
  let store

  beforeEach(() => {
    store = renderHook(() => useStore()).result
  })

  afterEach(() => {
    act(() => {
      store.current.actions.reset()
    })
  })

  describe('media', () => {
    it('should init with false activeMedia', () => {
      expect(store.current.state.activeMedia).toBe(false)
    })

    it('should create achievement', () => {
      const mediaAudio = createDefaultMedia({
        id: 1,
        type: MediaTypes.AUDIO,
        src: 'https://google.com',
      })
      const mediaText = createDefaultMedia({
        id: 2,
        type: MediaTypes.TEXT,
        content: ['text one', 'text two', 'text three'],
      })
      const mediaVideo = createDefaultMedia({
        id: 3,
        type: MediaTypes.VIDEO,
        src: 'https://youtube.com',
      })

      // act(() => store.current.actions.openMedia(mediaAudio))
      // expect(store.current.state.achievements).toHaveLength(1)
      // expect(store.current.state.achievements).toContainEqual(mediaAudio)

      act(() => store.current.actions.openMedia({ media: mediaAudio }))
      act(() => store.current.actions.openMedia({ media: mediaAudio }))
      expect(store.current.state.achievements).toHaveLength(1)

      act(() => store.current.actions.openMedia({ media: mediaText }))
      expect(store.current.state.achievements).toHaveLength(2)
      expect(store.current.state.achievements).toContainEqual(mediaText)

      act(() => store.current.actions.openMedia({ media: mediaVideo }))
      expect(store.current.state.achievements).toHaveLength(3)
      expect(store.current.state.achievements).toContainEqual(mediaVideo)
    })

    it('should test media counter', () => {
      const mediaVideo = createDefaultMedia({
        id: 1,
        type: MediaTypes.VIDEO,
        src: 'https://youtube.com',
      })
      const mediaText = createDefaultMedia({
        id: 2,
        type: MediaTypes.TEXT,
        content: ['text one', 'text two', 'text three'],
      })
      // const mediaTrack = createDefaultMedia({
      //   id: 4,
      //   type: MediaTypes.TRACK,
      //   src: 'https://youtube.com',
      // })

      act(() => store.current.actions.openMedia({ media: mediaVideo }))
      expect(store.current.state.counter.extra).toBe(1)
      expect(store.current.state.counter.main).toBe(0)
      act(() => store.current.actions.openMedia({ media: mediaVideo }))
      expect(store.current.state.counter.extra).toBe(1)
      expect(store.current.state.counter.main).toBe(0)

      // act(() => store.current.actions.openMedia(mediaTrack))
      // expect(store.current.state.counter.extra).toBe(1)
      // expect(store.current.state.counter.main).toBe(1)

      act(() => store.current.actions.openMedia({ media: mediaText }))
      expect(store.current.state.counter.extra).toBe(2)
      expect(store.current.state.counter.main).toBe(0)
    })

    it('should toggle media text', () => {
      expect(store.current.state.activeMedia).toBe(false)

      const type = MediaTypes.TEXT
      const content = ['text one', 'text two', 'text three']
      const media = createDefaultMedia({ type, content })

      act(() => {
        store.current.actions.openMedia(media)
      })
      expect(store.current.state.activeMedia.type).toBe('text')

      expect(store.current.state.activeMedia.content).toHaveLength(
        content.length
      )
      expect(store.current.state.activeMedia.content).toBe(content)

      act(() => {
        store.current.actions.closeMedia()
      })
      expect(store.current.state.activeMedia).toBe(false)
    })

    it('should toggle media video', () => {
      expect(store.current.state.activeMedia).toBe(false)

      const type = MediaTypes.VIDEO
      const src = 'https://youtube.com'
      const media = createDefaultMedia({ type, src })

      act(() => {
        store.current.actions.openMedia(media)
      })
      expect(store.current.state.activeMedia.type).toBe('video')

      expect(store.current.state.activeMedia.src).toBe(src)

      act(() => {
        store.current.actions.closeMedia()
      })
      expect(store.current.state.activeMedia).toBe(false)
    })

    it('should toggle media image', () => {
      expect(store.current.state.activeMedia).toBe(false)

      const type = MediaTypes.IMAGE
      const src = 'https://blog.com'
      const media = createDefaultMedia({ type, src })

      act(() => {
        store.current.actions.openMedia(media)
      })
      expect(store.current.state.activeMedia.type).toBe('image')

      expect(store.current.state.activeMedia.src).toBe(src)

      act(() => {
        store.current.actions.closeMedia()
      })
      expect(store.current.state.activeMedia).toBe(false)
    })
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

      act(() => {
        store.current.actions.onMove('forward', true)
      })
      expect(store.current.state.movement).toStrictEqual({
        ...initialMovement,
        forward: true,
      })

      act(() => {
        store.current.actions.onMove('forward', false)
      })
      expect(store.current.state.movement).toStrictEqual(initialMovement)
    })

    it('toggle move backward', () => {
      expect(store.current.state.movement).toStrictEqual(initialMovement)

      act(() => {
        store.current.actions.onMove('backward', true)
      })
      expect(store.current.state.movement).toStrictEqual({
        ...initialMovement,
        backward: true,
      })

      act(() => {
        store.current.actions.onMove('backward', false)
      })
      expect(store.current.state.movement).toStrictEqual(initialMovement)
    })

    it('toggle move right', () => {
      expect(store.current.state.movement).toStrictEqual(initialMovement)

      act(() => {
        store.current.actions.onMove('right', true)
      })
      expect(store.current.state.movement).toStrictEqual({
        ...initialMovement,
        right: true,
      })

      act(() => {
        store.current.actions.onMove('right', false)
      })
      expect(store.current.state.movement).toStrictEqual(initialMovement)
    })

    it('toggle move left', () => {
      expect(store.current.state.movement).toStrictEqual(initialMovement)

      act(() => {
        store.current.actions.onMove('left', true)
      })
      expect(store.current.state.movement).toStrictEqual({
        ...initialMovement,
        left: true,
      })

      act(() => {
        store.current.actions.onMove('left', false)
      })
      expect(store.current.state.movement).toStrictEqual(initialMovement)
    })

    it('should combine movements', () => {
      act(() => {
        store.current.actions.onMove('forward', true)
      })
      expect(store.current.state.movement).toStrictEqual({
        ...initialMovement,
        forward: true,
      })

      act(() => {
        store.current.actions.onMove('right', true)
      })
      expect(store.current.state.movement).toStrictEqual({
        ...initialMovement,
        forward: true,
        right: true,
      })

      act(() => {
        store.current.actions.onMove('right', false)
      })
      expect(store.current.state.movement).toStrictEqual({
        ...initialMovement,
        forward: true,
      })

      act(() => {
        store.current.actions.onMove('left', true)
      })
      expect(store.current.state.movement).toStrictEqual({
        ...initialMovement,
        forward: true,
        left: true,
      })

      act(() => {
        store.current.actions.onMove('left', false)
      })
      expect(store.current.state.movement).toStrictEqual({
        ...initialMovement,
        forward: true,
      })

      act(() => {
        store.current.actions.onMove('forward', false)
      })
      expect(store.current.state.movement).toStrictEqual(initialMovement)
    })

    it.todo('should jump?')
  })

  describe('object interaction', () => {
    it('should toggle interacion modal', () => {
      expect(store.current.state.nearInteraction).toBe(null)

      const objectInteraction = createDefaultInteraction({ media: {} })
      act(() => {
        store.current.actions.onChangeInteraction(objectInteraction)
      })
      expect(store.current.state.nearInteraction).toStrictEqual(
        objectInteraction
      )
      expect(store.current.state.nearInteraction).toHaveProperty('title')
      expect(store.current.state.nearInteraction).toHaveProperty('media')
      expect(store.current.state.nearInteraction).toHaveProperty('showDismiss')

      act(() => {
        store.current.actions.onChangeInteraction(null)
      })
      expect(store.current.state.nearInteraction).toStrictEqual(null)
    })

    it.todo('should close near interaction when open media')
    it.todo('should delay for open next near interaction')
    it.todo('should ignore interaction')
  })

  describe('key guide', () => {
    it.todo('should open key guide')
    it.todo('should close key guide')
  })
})
