import { Suspense, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import {
  useCubeTexture,
  Stats,
  PerspectiveCamera,
  MapControls,
} from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { useControls } from 'leva'
import config from '../../config'
import useQueryString from '../../hooks/useQueryString'
import GLTFWalls from '../GLTFWalls'
import Player from '../Player'
import PrimitiveObject from '@/3d/PrimitiveObject'
import styles from './scene.module.scss'

const View = () => {
  const { player } = useControls({ player: true })

  if (player) return <Player />

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 5, 0]} />
      <MapControls />
    </>
  )
}

const Environment = () => {
  const { hdri } = useControls({ hdri: true })

  const cubeMap = useCubeTexture(
    ['px.png', 'nx.png', 'ny.png', 'py.png', 'pz.png', 'nz.png'],
    { path: '/assets/images/' }
  )

  useEffect(() => {
    if (!cubeMap) return
    cubeMap.flipY = true
    cubeMap.encoding = THREE.sRGBEncoding
  }, [cubeMap])

  return (
    <group>
      <ambientLight intensity={1} color="white" position={[10, 10, -100]} />
      <ambientLight intensity={0.4} color="blue" position={[10, 10, -100]} />
      <mesh visible={hdri}>
        <sphereGeometry args={[150]} />
        <meshBasicMaterial envMap={cubeMap} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

const Scene = () => {
  const [controlsEnabled] = useQueryString({ key: 'showcontrols' })

  return (
    <Canvas
      gl={{ clearColor: new THREE.Color(0, 0, 0) }}
      className={styles.scene}
      shadowMap
    >
      <Suspense fallback={null}>
        {controlsEnabled && <Stats />}

        <Environment />

        <Physics>
          <View />
          <GLTFWalls
            path={config.maze.gltf}
            showCollisions={config.maze.showCollisions}
          />
        </Physics>
        <PrimitiveObject position={[-65, 1, 10]} />
      </Suspense>
    </Canvas>
  )
}

export default Scene
