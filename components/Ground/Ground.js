import { usePlane } from '@react-three/cannon'

function Ground() {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }))

  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial color="#f5f5f5" attach="material" />
    </mesh>
  )
}

export default Ground
