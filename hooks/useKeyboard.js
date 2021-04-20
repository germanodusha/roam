import { useState, useEffect } from 'react'
import KeyBindings from '../config/keybindings.json'

export default function useKeyboard() {
  const [movement, setMovement] = useState({
    forward: false,
    backwards: false,
    left: false,
    right: false,
    jump: false,
  })

  useEffect(() => {
    const onKeyDown = (event) => {
      const action = KeyBindings[event.code]
      if (action) {
        setMovement((state) => ({ ...state, [action]: true }))
      }
    }

    const onKeyUp = (event) => {
      const action = KeyBindings[event.code]
      if (action) {
        setMovement((state) => ({ ...state, [action]: false }))
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  return movement
}
