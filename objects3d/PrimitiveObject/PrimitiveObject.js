import { MTLLoader, OBJLoader } from 'three-stdlib'
import { useLoader } from '@react-three/fiber'

const PrimitiveObject = () => {
  const materials = useLoader(MTLLoader, '/gltf/12316_Goggles_v1_L3.mtl')

  const object = useLoader(
    OBJLoader,
    '/gltf/12316_Goggles_v1_L3.obj',
    (loader) => {
      materials.preload()
      loader.setMaterials(materials)
    }
  )

  return (
    <primitive
      position={[-62, 1, 12]}
      scale={[0.005, 0.005, 0.005]}
      object={object}
    />
  )
}

export default PrimitiveObject
