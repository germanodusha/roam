import { Suspense, useEffect, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useThree, useLoader } from '@react-three/fiber'
import { PerspectiveCamera, MapControls } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import config from '../../config'
import useQueryString from '../../hooks/useQueryString'
import GLTFWalls from '../GLTFWalls'
import Ground from '../Ground'
import Player from '../Player'
import styles from './scene.module.scss'

const View = ({ hideControls }) => {
  const [playerEnabled] = useState(true)

  if (playerEnabled) return <Player />

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 5, 0]} />
      <MapControls />
    </>
  )
}

const Environment = () => {
  const { scene } = useThree()
  const hdri = useLoader(THREE.TextureLoader, '/hdri.jpeg')

  useEffect(() => {
    if (!hdri) return

    hdri.encoding = THREE.sRGBEncoding
    hdri.mapping = THREE.EquirectangularReflectionMapping
    scene.background = hdri
  }, [scene, hdri])

  return (
    <group>
      <ambientLight intensity={1} color="white" position={[10, 10, -100]} />
      <ambientLight intensity={0.4} color="blue" position={[10, 10, -100]} />
    </group>
  )
}

const Scene = () => {
  const [controlsEnabled, hideControls] = useQueryString({ key: 'showcontrols' })

  return (
    <Canvas className={styles.scene} shadowMap>
      <Suspense fallback={null}>
        <Environment />

        <Physics>
          <Ground />
          <View controlsEnabled={controlsEnabled} hideControls={hideControls} />
          <GLTFWalls path={config.maze.gltf} showCollisions={config.maze.showCollisions} />
        </Physics>
      </Suspense>
    </Canvas>
  )
}

export default Scene
