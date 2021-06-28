import { Suspense, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useThree, useLoader } from '@react-three/fiber'
import {
  Stats,
  MapControls,
  TransformControls,
  useCubeTexture,
} from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { EffectComposer, SelectiveBloom } from '@react-three/postprocessing'
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
  const lightRef = useRef()

  const selected = []

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

  const bloomProps = useControls(
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
    <group>
      <ambientLight ref={lightRef} intensity={0.7} color="blue" />
      <pointLight position={[0, 500, 0]} color="white" />
      <mesh visible={hdri}>
        <sphereGeometry args={[150]} />
        <meshBasicMaterial envMap={cubeMap} side={THREE.DoubleSide} />
      </mesh>

      <EffectComposer>
        <SelectiveBloom
          selection={selected}
          lights={[lightRef]}
          {...bloomProps}
        />
      </EffectComposer>
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
      shininess: {
        value: 100,
        onChange: (value) => (defaultMaterial.shininess = value),
      },
      emissive: {
        value: '#00ff00',
        onChange: (value) =>
          (defaultMaterial.emissive = new THREE.Color(value)),
      },
      emissiveIntensity: {
        value: 0.5,
        onChange: (value) => (defaultMaterial.emissiveIntensity = value),
      },
      fog: {
        value: true,
        onChange: (value) => (defaultMaterial.fog = value),
      },
      reflectivity: {
        value: 1,
        onChange: (value) => (defaultMaterial.reflectivity = value),
      },
      refractionRatio: {
        value: 0.98,
        onChange: (value) => (defaultMaterial.refractionRatio = value),
      },
      specular: {
        value: '#ffffff',
        onChange: (value) =>
          (defaultMaterial.specular = new THREE.Color(value)),
      },
    },
    { collapsed: true }
  )

  const defaultMaterial = useRef(
    new THREE.MeshPhongMaterial({ side: THREE.FrontSide })
  ).current

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

        {positions.map((position, i) => {
          const object = objects[i]
          const media = medias[i]

          if (!object) return null

          return (
            <PrimitiveObject
              key={object.path}
              scale={object.scale || 1}
              path={object.path}
              position={position}
              material={defaultMaterial}
              media={media}
            />
          )
        })}

        <CloudSound />
      </Suspense>
    </Canvas>
  )
}

const medias = [
  null,

  createDefaultMedia({
    id: 1,
    type: MediaTypes.TEXT,
    title: 'The Labyrinth of Crete:\nThe Myth Of The\nMinotaur',
    caption: 'HTTPS://WWW.EXPLORECRETE.COM/HISTORY/LABYRINTH MINOTAUR.HTM',
  }),

  createDefaultMedia({
    id: 1,
    type: MediaTypes.VIDEO,
    title: 'The Labyrinth of Crete:\nThe Myth Of The\nMinotaur',
    caption: 'HTTPS://WWW.EXPLORECRETE.COM/HISTORY/LABYRINTH MINOTAUR.HTM',
  }),

  createDefaultMedia({
    id: 1,
    type: MediaTypes.IMAGE,
    title: 'The Labyrinth of Crete:\nThe Myth Of The\nMinotaur',
    caption: 'HTTPS://WWW.EXPLORECRETE.COM/HISTORY/LABYRINTH MINOTAUR.HTM',
  }),
]

const objects = [
  {
    path: '/gltf/10139_GardeningGloves_v1_L3.obj',
    scale: 0.02,
  },
  {
    path: '/gltf/10285_Fire Extinguisher_v3_iterations-2.obj',
    scale: 0.02,
  },
  {
    path: '/gltf/10778_Toilet_V2.obj',
    scale: 0.05,
  },
  {
    path: '/gltf/11801_Watch_v1_l2.obj',
  },
  {
    path: '/gltf/12316_Goggles_v1_L3.obj',
    scale: 0.005,
  },
  {
    path: '/gltf/12979_rain_jacket_ adult_v1_l2.obj',
    scale: 0.02,
  },
  {
    path: '/gltf/13604_Drill_Press_v1_L2.obj',
    scale: 0.005,
  },
  {
    path: '/gltf/13642_Polo_Boots_v1_L2.obj',
    scale: 0.01,
  },
  {
    path: '/gltf/14096_Table_Top_Charcoal_Grill_v1_l3.obj',
    scale: 0.005,
  },
  {
    path: '/gltf/17341_Tote_bag_womens_V1.obj',
    scale: 0.01,
  },
  {
    path: '/gltf/19769_Medieval_Neck_Collar_v1.obj',
    scale: 0.025,
  },
  {
    path: '/gltf/book.obj',
    scale: 0.025,
  },
  {
    path: '/gltf/box.obj',
    scale: 0.001,
  },
  // {
  //   path: '/gltf/casco desert.obj',
  //   scale: 0.06,
  // },
  {
    path: '/gltf/Gameboy.obj',
    scale: 0.5,
  },
  {
    path: '/gltf/Hair Trimmer.obj',
    scale: 0.3,
  },
  {
    path: '/gltf/helmet.obj',
    scale: 0.03,
  },
  {
    path: '/gltf/Knife.obj',
    scale: 0.1,
  },
  {
    path: '/gltf/LegoBricks3.obj',
    scale: 0.03,
  },
  {
    path: '/gltf/microwave.obj',
    scale: 0.04,
  },
  {
    path: '/gltf/NBA BASKETBALL.obj',
    scale: 0.03,
  },
  {
    path: '/gltf/Pill Bottle.obj',
    scale: 0.0005,
  },
  {
    path: '/gltf/TimeWarner_SA_remote.obj',
    scale: 0.005,
  },
  {
    path: '/gltf/vase.obj',
    scale: 0.004,
  },
]

const positions = [
  // front
  [-57, 1, 10],
  [-60, 1, 10],
  [-63, 1, 10],
  [-66, 1, 10],
  [-69, 1, 10],
  [-72, 1, 10],
  [-75, 1, 10],
  [-78, 1, 10],
  [-81, 1, 10],
  [-84, 1, 10],
  [-87, 1, 10],
  [-90, 1, 10],
  [-93, 1, 10],
  [-96, 1, 10],

  // back
  [-57, 1, 14],
  [-60, 1, 14],
  [-63, 1, 14],
  [-66, 1, 14],
  [-69, 1, 14],
  [-72, 1, 14],
  [-75, 1, 14],
  [-78, 1, 14],
  [-81, 1, 14],
  [-84, 1, 14],
  [-87, 1, 14],
  [-90, 1, 14],
  [-93, 1, 14],
  [-96, 1, 14],
]

export default Scene
