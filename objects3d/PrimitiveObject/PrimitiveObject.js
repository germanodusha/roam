import { useEffect, useRef } from 'react'
import { OBJLoader } from 'three-stdlib'
import { useLoader } from '@react-three/fiber'
import useFocusOnNear from '@/hooks/useFocusOnNear'
import { useStore } from '../../store'
import { createDefaultInteraction } from '@/helpers/mock'

const PrimitiveObject = ({
  position,
  path,
  material,
  media,
  log = false,
  scale = 1,
}) => {
  const { onChangeInteraction, addGlow } = useStore((state) => state.actions)
  const ref = useRef(null)
  const object = useLoader(OBJLoader, path)

  useEffect(() => {
    if (log) console.warn(ref)
  }, [log, ref])

  useEffect(() => {
    if (!ref.current) return undefined

    const meshes = ref.current.children
      .filter((children) => children.type === 'Mesh')
      .map((mesh) => {
        mesh.material = material
        return { current: mesh }
      })

    addGlow(meshes)
  }, [ref, material, addGlow])

  useFocusOnNear({
    ref: ref,
    onFocus: () => onChangeInteraction(createDefaultInteraction({ media })),
    onDefocus: () => onChangeInteraction(null),
  })

  return (
    <primitive
      ref={ref}
      position={position}
      scale={[1 * scale, 1 * scale, 1 * scale]}
      object={object}
    />
  )
}

export default PrimitiveObject
