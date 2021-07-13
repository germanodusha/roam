import { useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import useIsMobile from '@/hooks/useIsMobile'

const useFrocusOnNear = ({
  ref,
  centerTolerance = 1,
  distanceTolerance = 2,
  onFocus,
  onDefocus,
} = {}) => {
  const isMobile = useIsMobile()
  const { camera } = useThree()
  const [isFocus, setFocus] = useState(false)

  useFrame(() => {
    if (!ref.current) return

    const meshPosition = ref.current.position

    const positionScreenSpace = meshPosition.clone().project(camera)
    const isNear = camera.position.distanceTo(meshPosition) < distanceTolerance
    const isCloseToCenter = positionScreenSpace.length() < centerTolerance

    const shouldFocus = () => {
      if (!isNear) return false
      if (isFocus) return false
      if (isMobile) return true
      return isCloseToCenter
    }

    if (shouldFocus()) {
      setFocus(true)
      if (typeof onFocus === 'function') onFocus()

      return
    }

    const shouldDefocus = () => {
      if (!isFocus) return false
      if (!isNear) return true
      if (isMobile) return false
      return !isCloseToCenter
    }

    if (shouldDefocus()) {
      setFocus(false)
      if (typeof onDefocus === 'function') onDefocus()

      return
    }
  })

  return { isFocus }
}

export default useFrocusOnNear
