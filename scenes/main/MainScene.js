import { Suspense, useMemo } from 'react'
import * as THREE from 'three'
import { Sky, Stats, useGLTF, Box } from '@react-three/drei'
import { Canvas } from 'react-three-fiber'
import { Physics, useBox } from '@react-three/cannon'
import { Cube, Ground, Player } from '../../components'
import styles from './main.module.scss'

const Wall = ({ geometry, material }) => {
  const [args, position] = useMemo(() => {
    const { boundingBox } = geometry
    const box = new THREE.Box3(boundingBox.min, boundingBox.max)
    const size = box.getSize(new THREE.Vector3())
    const parameter = box.getCenter(new THREE.Vector3())

    return [size.toArray(), parameter.toArray()]
  }, [geometry])

  useBox(() => ({ position, args, type: 'Static' }))

  return (
    <>
      <mesh geometry={geometry} material={material} />
      <Box position={position} args={args}>
        <meshBasicMaterial color="red" wireframe />
      </Box>
    </>
  )
}

const Maze = () => {
  const { nodes, materials } = useGLTF('/gltf/maze_v1.glb')

  const idsNodes = useMemo(() => Object.keys(nodes), [nodes])

  return idsNodes.map((id) => {
    const node = nodes[id]
    if (node.type !== 'Mesh') return null

    return (
      <Wall
        //
        key={node.uuid}
        geometry={node.geometry}
        material={materials.Granite_}
      />
    )
  })
}

const MainScene = () => {
  return (
    <Canvas className={styles.scene} shadowMap>
      <Suspense fallback={null}>
        <Stats />
        {/* <PerspectiveCamera makeDefault position={[0, 5, 0]} /> */}
        {/* <MapControls /> */}
        <Sky
          distance={450000}
          sunPosition={[0, 1, 0]}
          turbidity={8}
          azimuth={0.25}
          inclination={0}
        />
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[10, 10, 10]}
          intensity={1}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        <Physics>
          <Ground />
          <Cube position={[-2, 1, -6]} />
          <Cube position={[0, 1, -5]} />
          <Cube position={[2, 1, -6]} />
          <Player />
          <Maze />
        </Physics>
      </Suspense>
    </Canvas>
  )
}

export default MainScene
