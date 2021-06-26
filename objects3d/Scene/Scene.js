import { Suspense, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import {
  Stats,
  MapControls,
  TransformControls,
  useCubeTexture,
} from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { useControls } from 'leva'
import config from '../../config'
import useQueryString from '../../hooks/useQueryString'
import GLTFWalls from '../GLTFWalls'
import Player from '../Player'
import PrimitiveObject from '@/3d/PrimitiveObject'
import CloudSound from '@/3d/CloudSound'
import { MediaTypes } from '@/helpers/constants'
import { createDefaultMedia } from '@/helpers/mock'
import styles from './scene.module.scss'

const PosHelper = () => {
  const controls = useRef(null)

  const [{ position, positionHelper }, set] = useControls(
    'helper',
    () => ({
      positionHelper: false,
      position: {
        value: {
          x: config.player.initialPos[0],
          z: config.player.initialPos[2],
        },
        step: 1,
      },
    }),
    { collapsed: true }
  )

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
      visible={positionHelper}
      enabled={positionHelper}
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
  // const camera = useRef()

  const { player, lockCamera } = useControls(
    'view',
    {
      player: true,
      lockCamera: false,
      // cameraPos: button(() => console.warn(camera.current)),
    },
    { collapsed: true }
  )

  // useEffect(() => {
  //   if (!camera.current || player) return
  //   camera.current.rotation.set(-1.2, -0.55, -0.9)
  //   camera.current.position.set(-125, 55, 30)
  // }, [camera, player])

  if (player) return <Player />

  return (
    <>
      {/**<PerspectiveCamera ref={camera} />**/}
      <MapControls enabled={!player && !lockCamera} />
      <PosHelper visible={lockCamera} />
    </>
  )
}

const Environment = () => {
  const { hdri } = useControls(
    'environment',
    { hdri: true },
    { collapsed: true }
  )

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

  useControls(
    'material',
    {
      color: {
        value: '#00ff00',
        onChange: (value) => (defaultMaterial.color = new THREE.Color(value)),
      },
      wireframe: {
        value: false,
        onChange: (value) => (defaultMaterial.wireframe = value),
      },
      transparent: {
        value: false,
        onChange: (value) => (defaultMaterial.transparent = value),
      },
      opacity: {
        value: 1,
        onChange: (value) => (defaultMaterial.opacity = value),
      },
      visible: {
        value: true,
        onChange: (value) => (defaultMaterial.visible = value),
      },
    },
    { collapsed: true }
  )

  const defaultMaterial = useRef(
    new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
    })
  ).current

  const bloomConfig = useControls(
    'bloom',
    {
      intensity: 3,
      luminanceThreshold: {
        value: 0.0025,
        step: 0.0005,
      },
      luminanceSmoothing: {
        value: 0.025,
        step: 0.005,
      },
      height: 200,
    },
    { collapsed: true }
  )

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

        <PrimitiveObject
          path="/gltf/12316_Goggles_v1_L3.obj"
          position={[-65, 1, 10]}
          material={defaultMaterial}
          bloomProps={bloomConfig}
          media={createDefaultMedia({
            id: 1,
            type: MediaTypes.TEXT,
            title: 'The Labyrinth of Crete:\nThe Myth Of The\nMinotaur',
            caption:
              'HTTPS://WWW.EXPLORECRETE.COM/HISTORY/LABYRINTH MINOTAUR.HTM',
          })}
        />

        <PrimitiveObject
          path="/gltf/10285_Fire Extinguisher_v3_iterations-2.obj"
          position={[-60, 1, 10]}
          material={defaultMaterial}
          bloomProps={bloomConfig}
          media={createDefaultMedia({
            id: 1,
            type: MediaTypes.VIDEO,
            title: 'The Labyrinth of Crete:\nThe Myth Of The\nMinotaur',
            caption:
              'HTTPS://WWW.EXPLORECRETE.COM/HISTORY/LABYRINTH MINOTAUR.HTM',
          })}
        />

        <PrimitiveObject
          log
          path="/gltf/Gameboy.obj"
          scale={100}
          position={[-70, 1, 10]}
          material={defaultMaterial}
          bloomProps={bloomConfig}
          media={createDefaultMedia({
            id: 1,
            type: MediaTypes.IMAGE,
            title: 'The Labyrinth of Crete:\nThe Myth Of The\nMinotaur',
            caption:
              'HTTPS://WWW.EXPLORECRETE.COM/HISTORY/LABYRINTH MINOTAUR.HTM',
          })}
        />

        <CloudSound />
      </Suspense>
    </Canvas>
  )
}

export default Scene
