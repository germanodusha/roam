import { useBox } from '@react-three/cannon'

function Cube({ position }) {
  const [ref] = useBox(() => ({ position }))

  return (
    <mesh ref={ref} castShadow>
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial color="#ff8484" attach="material" />
    </mesh>
  )
}

export default Cube
