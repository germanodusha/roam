import { useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

const useFrocusOnNear = ({
  ref,
  centerTolerance = 1,
  distanceTolerance = 2,
  onFocus,
  onDefocus,
} = {}) => {
  const { camera } = useThree()
  const [isFocus, setFocus] = useState(false)

  useFrame(() => {
    if (!ref.current) return

    const meshPosition = ref.current.position

    const positionScreenSpace = meshPosition.clone().project(camera)
    const isNear = camera.position.distanceTo(meshPosition) < distanceTolerance
    const isCloseToCenter = positionScreenSpace.length() < centerTolerance

    if (!isFocus && isCloseToCenter && isNear) {
      setFocus(true)
      if (typeof onFocus === 'function') onFocus()
    }
    if (isFocus && (!isCloseToCenter || !isNear)) {
      setFocus(false)
      if (typeof onDefocus === 'function') onDefocus()
    }
  })

  return { isFocus }
}

export default useFrocusOnNear
