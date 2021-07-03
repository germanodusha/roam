import { useFrame } from '@react-three/fiber'

const useFloatingAnimation = (ref) => {
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.position.y = -0.2 + Math.sin(state.clock.elapsedTime) * 0.2
    ref.current.rotation.y = ref.current.rotation.y += delta * 0.4
  })

  return null
}

export default useFloatingAnimation
