import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useGLTF} from '@react-three/drei'
import { useBox } from '@react-three/cannon'
import useTexturedMaterial from '../useTexturedMaterial'

const Wall = ({ children, material, node, geometry, showCollisions }) => {
  const mesh = useRef()

  const [args, position] = useMemo(() => {
    const { boundingBox } = geometry
    const box = new THREE.Box3(boundingBox.min, boundingBox.max)
    const size = box.getSize(new THREE.Vector3())
    const parameter = box.getCenter(new THREE.Vector3())

    return [size.toArray(), parameter.toArray()]
  }, [geometry])

  useBox(() => ({ position, args, type: 'Static' }))

  // useHelper(mesh, THREE.BoxHelper, 'yellow')
  // useHelper(mesh, VertexNormalsHelper, 1, 'green')

  return (
    <mesh
      castShadow
      // scale={[1, 0.55, 1]}
      ref={mesh}
      geometry={geometry}
      material={node.material}
    >
      {children}
    </mesh>
  )
}

const GLTFWalls = ({ path, showCollisions }) => {
  const { nodes } = useGLTF(path)

  const texturedMaterial = useTexturedMaterial({
    path: '/materials/wall/',
    repeatX: 0.01,
    repeatY: 0.01,
    aoMapIntensity: 5,
    baseColorPath: 'basecolor.jpg',
    bumpScale: 10,
    displacementPath: 'displacement.png',
    normal: 1,
    normalPath: 'normal.jpg',
    ambientOcclusionPath: 'ambientOcclusion.jpg',
    roughness: 5,
    roughnessPath: 'roughness.jpg',
  })

  const idsNodes = useMemo(() => Object.keys(nodes), [nodes])

  return idsNodes.map((id) => {
    const node = nodes[id]

    if (node.type !== 'Mesh') return null
    return (
      <Wall
        key={node.uuid}
        geometry={node.geometry}
        node={node}
        showCollisions={showCollisions}
      >
        {texturedMaterial}
      </Wall>
    )
  })
}

export default GLTFWalls
