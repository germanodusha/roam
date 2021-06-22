import { Suspense, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useThree, useLoader } from '@react-three/fiber'
import {
  Stats,
  PerspectiveCamera,
  MapControls,
  TransformControls,
} from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { useControls, button } from 'leva'
import config from '../../config'
import useQueryString from '../../hooks/useQueryString'
import GLTFWalls from '../GLTFWalls'
import Player from '../Player'
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
  const camera = useRef()

  const { playerEnabled, lockCamera } = useControls({
    playerEnabled: true,
    lockCamera: false,
    cameraPos: button(() => console.warn(camera.current)),
  })

  useEffect(() => {
    if (!camera.current || playerEnabled) return
    camera.current.rotation.set(-1.2, -0.55, -0.9)
    camera.current.position.set(-125, 55, 30)
  }, [camera, playerEnabled])

  return (
    <>
      <PerspectiveCamera makeDefault ref={camera} />

      {playerEnabled ? (
        <Player />
      ) : (
        <>
          <MapControls enabled={!lockCamera} />
          <PosHelper visible={lockCamera} />
        </>
      )}
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

const Scene = () => {
  const [controlsEnabled] = useQueryString({ key: 'showcontrols' })

  return (
    <Canvas className={styles.scene} shadowMap>
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
      </Suspense>
    </Canvas>
  )
}

export default Scene
