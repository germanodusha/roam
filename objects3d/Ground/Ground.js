import { usePlane } from '@react-three/cannon'
import useTexturedMaterial from '../useTexturedMaterial'
import config from '../../config'

function Ground() {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }))

  const texturedMaterial = useTexturedMaterial({
    path: '/materials/stone-floor/',
    repeatX: 80,
    repeatY: 80,
    aoMapIntensity: 5,
    baseColorPath: 'basecolor.jpg',
    bumpScale: 10,
    displacementPath: 'displacement.png',
    normal: 1,
    normalPath: 'normal.jpg',
    ambientOcclusionPath: 'ambientOcclusion.jpg',
    roughness: 5,
    roughnessPath: 'roughness.jpg',
  })

  return (
    <mesh ref={ref} position={[0, -0.1, 1]} receiveShadow>
      <planeBufferGeometry attach="geometry" args={config.ground.size} />
      {texturedMaterial}
    </mesh>
  )
}

export default Ground
