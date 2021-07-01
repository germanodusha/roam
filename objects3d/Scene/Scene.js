import { Suspense, useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import {
  Stats,
  MapControls,
  TransformControls,
  useCubeTexture,
  OrthographicCamera,
} from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { EffectComposer, SelectiveBloom } from '@react-three/postprocessing'
import { useControls, button } from 'leva'
import config from '../../config'
import useQueryString from '../../hooks/useQueryString'
import GLTFWalls from '../GLTFWalls'
import Player from '../Player'
import ObjectsWrapper from '@/3d/ObjectsWrapper'
import CloudsWrapper from '@/3d/CloudsWrapper'
import { useStore } from '../../store'
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
        step: 0.1,
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
  const camera = useRef(null)

  const { player, lockCamera } = useControls(
    'player',
    {
      player: true,
      lockCamera: false,
      cameraPos: button(() => console.warn(camera.current)),
    },
    { collapsed: true }
  )

  if (player) return <Player />

  return (
    <>
      <OrthographicCamera
        ref={camera}
        makeDefault
        position={[14.43, 67.28, 25.48]}
        quaternion={[-0.24, 0.61, 0.2]}
        rotation={[-1.33, 0.93, 1.28]}
        zoom={10}
      />
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

  const { hdri } = useControls('player', { hdri: true }, { collapsed: true })

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

      {selected.length > 0 && lightRef.current && (
        <EffectComposer>
          <SelectiveBloom
            selection={selected}
            lights={[lightRef]}
            {...bloomProps}
          />
        </EffectComposer>
      )}
    </group>
  )
}

const Scene = () => {
  const [controlsEnabled] = useQueryString({ key: 'showcontrols' })

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

        <ObjectsWrapper />
        <CloudsWrapper />
      </Suspense>
    </Canvas>
  )
}

export default Scene
