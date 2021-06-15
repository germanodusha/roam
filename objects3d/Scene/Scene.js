import { Suspense, useEffect, useState, useRef } from 'react'
import * as THREE from 'three'
import { MTLLoader, OBJLoader } from 'three-stdlib'
import { Canvas, useThree, useLoader } from '@react-three/fiber'
import { Stats, PerspectiveCamera, MapControls } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import config from '../../config'
import useQueryString from '../../hooks/useQueryString'
import useFocusOnNear from '../../hooks/useFocusOnNear'
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
  const hdri = useLoader(THREE.TextureLoader, '/assets/images/hdri-8k.jpg')

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

const InteractiveCube = () => {
  const ref = useRef()
  const { isFocus } = useFocusOnNear({ ref })

  return (
    <mesh ref={ref} position={[10.4, 1, -125]}>
      <boxGeometry attach="geometry" />
      <meshBasicMaterial attach="material" color={isFocus ? 'red' : 'gray'} />
    </mesh>
  )
}

const Scene = () => {
  const [controlsEnabled, hideControls] = useQueryString({ key: 'showcontrols' })

  return (
    <Canvas className={styles.scene} shadowMap>
      <Suspense fallback={null}>
        <Stats />
        <Environment />

        <InteractiveCube />
        <Physics>
          {/**<Ground />**/}
          <View controlsEnabled={controlsEnabled} hideControls={hideControls} />
          <GLTFWalls path={config.maze.gltf} showCollisions={config.maze.showCollisions} />
        </Physics>
        <GoggleObj />
        {/**<Maze />**/}
      </Suspense>
    </Canvas>
  )
}

const Maze = () => {
  const materials = useLoader(MTLLoader, '/gltf/labirinto.mtl', (loader) => {
    console.log(11, 'loaded mtl', loader)
  })

  const object = useLoader(OBJLoader, '/gltf/labirinto.obj', (loader) => {
    console.log(11, 'loaded obj', loader)
    materials.preload()
    loader.setMaterials(materials)
  })

  return (
    <primitive
      position={[9.8, 2, -124]}
      object={object}
    />
  )
}

const GoggleObj = () => {
  const materials = useLoader(MTLLoader, '/gltf/12316_Goggles_v1_L3.mtl', (loader) => {
    console.log(11, 'loaded mtl', loader)
  })

  const object = useLoader(OBJLoader, '/gltf/12316_Goggles_v1_L3.obj', (loader) => {
    console.log(11, 'loaded obj', loader)
    materials.preload()
    loader.setMaterials(materials)
  })

  return (
    <primitive
      position={[-62, 2, 32]}
      scale={[0.005, 0.005, 0.005]}
      object={object}
      color="red"
    />
  )

}
export default Scene
