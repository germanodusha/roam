import { renderHook, act } from '@testing-library/react-hooks'
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
    it.todo('should interact with object to main track')
    it.todo('should close main track')

    it.todo('should interact with object to open audio')
    it.todo('should ignore object audio')
    it.todo('should close audio modal')

    it.todo('should interact with object to open text')
    it.todo('should ignore object text')
    it.todo('should close text modal')

    it.todo('should interact with object to open video')
    it.todo('should ignore object video')
    it.todo('should close video modal')
  })

  describe('intro game', () => {
    it.todo('should show intro - title')
    it.todo('should show intro - description')
    it.todo('should show intro - key guide')
    it.todo('should enter the game')
  })

  describe('player movements', () => {
    it('should move forward', () => {
      expect(true).toBe(false)
    })

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

