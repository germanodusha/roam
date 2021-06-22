import { Suspense, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useThree, useLoader } from '@react-three/fiber'
import {
  Stats,
  PerspectiveCamera,
  MapControls,
  TransformControls,
  useCubeTexture,
} from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { useControls, button } from 'leva'
import config from '../../config'
import useQueryString from '../../hooks/useQueryString'
import GLTFWalls from '../GLTFWalls'
import Player from '../Player'
import PrimitiveObject from '@/3d/PrimitiveObject'
import styles from './scene.module.scss'

const PosHelper = () => {
  const controls = useRef(null)

  const [{ position }, set] = useControls(() => ({
    position: {
      value: { x: config.player.initialPos[0], z: config.player.initialPos[2] },
      step: 1,
    },
  }))

  useEffect(() => {
    if (!controls.current) return

    const updateLeva = (dragging) => {
      if (dragging.value) return

      set({
        position: {
          x: controls.current.positionStart.x + controls.current.offset.x,
          z: controls.current.positionStart.z + controls.current.offset.z,
        },
      })
    }

    controls.current.addEventListener('dragging-changed', updateLeva)

    return () => {
      if (!controls.current) return
      controls.current.removeEventListener('dragging-changed', updateLeva)
    }
  }, [controls, set])

  return (
    <TransformControls
      enabled
      showX
      showY={false}
      showZ
      size={0.5}
      position={[position.x, 1.5, position.z]}
      ref={controls}
    >
      <mesh>
        <meshBasicMaterial color={new THREE.Color('red')} wireframe />
        <sphereGeometry args={[0.7]} />
      </mesh>
    </TransformControls>
  )
}

const View = () => {
  const { player } = useControls({ player: true })
  const camera = useRef()

  const { player, lockCamera } = useControls({
    player: true,
    lockCamera: false,
    cameraPos: button(() => console.warn(camera.current)),
  })

  useEffect(() => {
    if (!camera.current || playerEnabled) return
    camera.current.rotation.set(-1.2, -0.55, -0.9)
    camera.current.position.set(-125, 55, 30)
  }, [camera, playerEnabled])

  if (player) return <Player />

  return (
    <>
      <PerspectiveCamera makeDefault ref={camera} />
      <MapControls enabled={!playerEnabled && !lockCamera} />
      <PosHelper visible={lockCamera} />
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
