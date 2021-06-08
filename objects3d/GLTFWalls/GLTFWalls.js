import { useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { useGLTF, useHelper } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { useBox } from '@react-three/cannon'
import { VertexNormalsHelper } from 'three-stdlib'

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
    <mesh ref={mesh} geometry={geometry} material={node.material} castShadow>
      {children}
    </mesh>
  )
}

const GLTFWalls = ({ path, showCollisions }) => {
  const { nodes, materials } = useGLTF(path)

  // const [base, bump, normal, ao, rough] = useLoader(THREE.TextureLoader, [
  //   '/materials/grass/basecolor.jpg',
  //   '/materials/grass/height.png',
  //   '/materials/grass/normal.jpg',
  //   '/materials/grass/ambientOcclusion.jpg',
  //   '/materials/grass/roughness.jpg',
  // ])

  // useEffect(() => {
  //   const repeatX = 0.015
  //   const repeatY = 0.015
  //   ;[base, bump, normal, ao, rough].forEach((texture) => {
  //     texture.wrapS = THREE.RepeatWrapping
  //     texture.wrapT = THREE.RepeatWrapping
  //     texture.repeat.set(repeatX, repeatY)
  //     console.log(32323, texture)
  //   })
  // }, [base, bump, normal, ao, rough])

  const idsNodes = useMemo(() => Object.keys(nodes), [nodes])

  // useEffect(() => {
  //   if (materials?.Granite_) {
  //     materials.Granite_.map.wrapS = THREE.RepeatWrapping
  //     materials.Granite_.map.wrapT = THREE.RepeatWrapping
  //     materials.Granite_.map.repeat.set(5, 5)
  //   }
  // }, [materials])

  return idsNodes.map((id) => {
    const node = nodes[id]
    if (node.type !== 'Mesh') return null

    return (
      <Wall
        key={node.uuid}
        geometry={node.geometry}
        node={node}
        showCollisions={showCollisions}
        material={materials.Granite_}
      >
        {/**<meshPhysicalMaterial
          attach="material"
          fog
          metalness={0}
          map={base}
          bumpMap={bump}
          aoMap={ao}
          normalMap={normal}
          roughness={1}
          roughnessMap={rough}
        />**/}
      </Wall>
    )
  })
}

export default GLTFWalls
