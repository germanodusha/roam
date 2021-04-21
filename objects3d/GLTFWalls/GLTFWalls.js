import { useMemo } from 'react'
import * as THREE from 'three'
import { useGLTF, Box } from '@react-three/drei'
import { useBox } from '@react-three/cannon'

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

const GLTFWalls = ({ path }) => {
  const { nodes, materials } = useGLTF(path)

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

export default GLTFWalls
