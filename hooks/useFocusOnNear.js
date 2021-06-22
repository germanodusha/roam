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
    }
    if (isFocus && (!isCloseToCenter || !isNear)) {
      setFocus(false)
      if (typeof onDefocus === 'function') onDefocus()
    }
  })

  return { isFocus }
}

const ExampleUsage = () => {
  const ref = useRef()
  const { isFocus } = useFocusOnNear({ ref })

  return (
    <mesh ref={ref} position={[10.4, 1, -125]}>
      <boxGeometry attach="geometry" />
      <meshBasicMaterial attach="material" color={isFocus ? 'red' : 'gray'} />
    </mesh>
  )
}

export default useFrocusOnNear
