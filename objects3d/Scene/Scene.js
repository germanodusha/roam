import { Suspense, useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
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
import { useStore } from '../../store'
import objects from '@/data/objects'
import medias from '@/data/medias'
import positions from '@/data/positions'
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
  const { player, lockCamera } = useControls(
    'view',
    {
      player: true,
      lockCamera: false,
    },
    { collapsed: true }
  )

  if (player) return <Player />

  return (
    <>
      <MapControls enabled={!player && !lockCamera} />
      <PosHelper visible={lockCamera} />
    </>
  )
}

const Environment = () => {
  const { glow } = useStore((state) => state.state)
  const lightRef = useRef()

  const selected = useMemo(
    () => Object.values(glow).map((mesh) => ({ current: mesh })),
    [glow]
  )

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

export default Scene
