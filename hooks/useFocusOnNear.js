import { useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

const useFrocusOnNear = ({
  ref,
  centerTolerance = 0.4,
  distanceTolerance = 3,
  onFocus,
  onDefocus,
} = {}) => {
  const { camera } = useThree()
  const [isFocus, setFocus] = useState(false)

  useFrame(() => {
    if (!ref.current) return

    const meshPosition = ref.current.position

    const positionScreenSpace = meshPosition.clone().project(camera)
    positionScreenSpace.setZ(0)
    const isNear = camera.position.distanceTo(meshPosition) < distanceTolerance
    const isCloseToCenter = positionScreenSpace.length() < centerTolerance

    if (!isFocus && isCloseToCenter && isNear) {
      setFocus(true)
      if (typeof onFocus === 'function') onFocus()
      console.log('centered')
    }
    if (isFocus && (!isCloseToCenter || !isNear)) {
      setFocus(false)
      if (typeof onDefocus === 'function') onDefocus()
      console.log('uncentered')
    }
  })

  return { isFocus }
}

export default useFrocusOnNear
