import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OBJLoader } from 'three-stdlib'
import { useLoader } from '@react-three/fiber'
import { EffectComposer, SelectiveBloom } from '@react-three/postprocessing'
import useFocusOnNear from '@/hooks/useFocusOnNear'
import { useStore } from '../../store'
import { createDefaultInteraction } from '@/helpers/mock'

const PrimitiveObject = ({
  position,
  path,
  material,
  bloomProps,
  media,
  log = false,
  scale = 1,
}) => {
  const { onChangeInteraction } = useStore((state) => state.actions)
  const [selected, setSelected] = useState(undefined)
  const ref = useRef(null)
  const lightRef = useRef()
  const object = useLoader(OBJLoader, path)

  useEffect(() => {
    console.warn(ref)
  }, [log, ref])

  useEffect(() => {
    if (!ref.current) return undefined

    const meshes = ref.current.children
      .filter((children) => children.type === 'Mesh')
      .map((mesh) => {
        mesh.material = material
        return { current: mesh }
      })

    setSelected(meshes)
  }, [ref, material])

  useFocusOnNear({
    ref: ref,
    onFocus: () => onChangeInteraction(createDefaultInteraction({ media })),
    onDefocus: () => onChangeInteraction(null),
  })

  return (
    <group>
      <ambientLight
        layers={10}
        color={new THREE.Color(0, 1, 0)}
        intensity={1}
        ref={lightRef}
      />

      <primitive
        ref={ref}
        position={position}
        scale={[0.005 * scale, 0.005 * scale, 0.005 * scale]}
        object={object}
      />

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

export default PrimitiveObject
