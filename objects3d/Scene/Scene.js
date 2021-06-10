import { Suspense, useCallback, useEffect, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useThree, useLoader } from '@react-three/fiber'
import { PerspectiveCamera, MapControls } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { OBJLoader } from 'three-stdlib'
import { useRouter } from 'next/router'
import config from '../../config'
import GLTFWalls from '../GLTFWalls'
import Ground from '../Ground'
import Player from '../Player'
import ComplexMaterial from '../ComplexMaterial'
import styles from './scene.module.scss'

const useControlsEnabled = () => {
  const [controlsEnabled, setControlsEnabled] = useState(false)
  const { query, push } = useRouter()

  useEffect(() => {
    const key = 'showcontrols'

    const hascontrolsEnabled = Object.keys(query).some((i) => i === key)
    if (!hascontrolsEnabled) {
      setControlsEnabled(false)
      return
    }

    const shouldHide = query[key] === 'false'
    if (shouldHide) {
      setControlsEnabled(false)
      return
    }

    setControlsEnabled(true)
  }, [query])

  const hideControls = useCallback(() => {
    push('.', '.', { shallow: false })
  }, [push])

  return [controlsEnabled, hideControls]
}

const View = ({ controlsEnabled, hideControls }) => {
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

const TestObj = () => {
  // const materials = useLoader(MTLLoader, mtlUrl)
  const object = useLoader(OBJLoader, '/gltf/TimeWarner_SA_remote.obj', (loader) => {
    console.log(11, 'loaded', loader)
    // materials.preload()
    // loader.setMaterials(materials)
  })

  return (
    <primitive
      //
      position={[9.8, 2, -124]}
      scale={[0.005, 0.005, 0.005]}
      object={object}
    />
  )
}

const Scene = () => {
  const [controlsEnabled, hideControls] = useControlsEnabled()

  return (
    <Canvas className={styles.scene} shadowMap>
      <Suspense fallback={null}>
        <Environment />

        <TestObj />
        <SampleGrass />
        <SampleGround />

        <Physics>
          <Ground />
          <View controlsEnabled={controlsEnabled} hideControls={hideControls} />
          <GLTFWalls path={config.maze.gltf} showCollisions={config.maze.showCollisions} />
        </Physics>
      </Suspense>
    </Canvas>
  )
}

const SampleGround = () => {
  const { scene } = useThree()

  const [base, bump, normal, ao, rough] = useLoader(THREE.TextureLoader, [
    '/materials/stone-floor/basecolor.jpg',
    '/materials/stone-floor/displacement.png',
    '/materials/stone-floor/normal.jpg',
    '/materials/stone-floor/ambientOcclusion.jpg',
    '/materials/stone-floor/roughness.jpg',
  ])

  useEffect(() => {
    const repeatX = 7
    const repeatY = 7

    ;[base, bump, normal, ao, rough].forEach((texture) => {
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(repeatX, repeatY)
    })
  }, [base, bump, normal, ao, rough])

  return (
    <mesh name="sample groud" position={[10.4, 0.1, -125]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry attach="geometry" args={[10, 10]} />
      <meshPhysicalMaterial
        attach="material"
        map={base}
        bumpScale={10}
        bumpMap={bump}
        aoMapIntensity={5}
        aoMap={ao}
        normal={1}
        normalMap={normal}
        roughness={5}
        roughnessMap={rough}
        envMap={scene.background}
      />
    </mesh>
  )
}

const SampleGrass = () => {
  const { scene } = useThree()

  const [base, bump, normal, ao, rough] = useLoader(THREE.TextureLoader, [
    '/materials/grass-wall/basecolor.jpg',
    '/materials/grass-wall/height.png',
    '/materials/grass-wall/normal.jpg',
    '/materials/grass-wall/ambientOcclusion.jpg',
    '/materials/grass-wall/roughness.jpg',
  ])

  useEffect(() => {
    const repeatX = 1
    const repeatY = 1

    ;[base, bump, normal, ao, rough].forEach((texture) => {
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(repeatX, repeatY)
    })
  }, [base, bump, normal, ao, rough])

  return (
    <mesh name="sample grass" position={[10.4, 1.5, -125]}>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <ComplexMaterial
        path="/materials/wall/"
        repeatX={1}
        repeatY={1}
        aoMapIntensity={5}
        baseColorPath="basecolor.jpg"
        bumpScale={10}
        displacementPath="displacement.png"
        normal={1}
        normalPath="normal.jpg"
        ambientOcclusionPath="ambientOcclusion.jpg"
        roughness={5}
        roughnessPath="roughness.jpg"
      />
    </mesh>
  )
}

export default Scene
