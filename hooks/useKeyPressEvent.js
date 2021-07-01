import { useState, useEffect } from 'react'

export default function useKeyPressEvent({
  key: targetKey,
  onKeyDown,
  onKeyUp,
}) {
  const [keyPressed, setKeyPressed] = useState(false)

  useEffect(() => {
    function downHandler({ key, ...e }) {
      if (!targetKey) return
      if (
        key === targetKey ||
        key === targetKey.toLowerCase() ||
        key === targetKey.toUpperCase()
      ) {
        setKeyPressed(true)
        if (typeof onKeyDown === 'function') onKeyDown(e)
      }
    }

    function upHandler({ key, ...e }) {
      if (!targetKey) return
      if (
        key === targetKey ||
        key === targetKey.toLowerCase() ||
        key === targetKey.toUpperCase()
      ) {
        setKeyPressed(false)
        if (typeof onKeyUp === 'function') onKeyUp(e)
      }
    }

    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [targetKey, onKeyDown, onKeyUp])

  return keyPressed
}
