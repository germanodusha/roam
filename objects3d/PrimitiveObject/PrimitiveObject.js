import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { MTLLoader, OBJLoader } from 'three-stdlib'
import { useLoader } from '@react-three/fiber'
import { EffectComposer, SelectiveBloom } from '@react-three/postprocessing'
import useFocusOnNear from '@/hooks/useFocusOnNear'
import { useStore } from '../../store'
import {
  createDefaultInteraction,
  createDefaultMedia,
} from '../../helpers/mock'
import { MediaTypes } from '../../helpers/constants'

const PrimitiveObject = ({ position }) => {
  const { onChangeInteraction } = useStore((state) => state.actions)
  const materials = useLoader(MTLLoader, '/gltf/12316_Goggles_v1_L3.mtl')

  const object = useLoader(
    OBJLoader,
    '/gltf/12316_Goggles_v1_L3.obj',
    (loader) => {
      materials.preload()
      loader.setMaterials(materials)
    }
  )

  const [selected, setSelected] = useState(undefined)
  const ref = useRef(null)
  const lightRef = useRef()

  useEffect(() => {
    if (!ref.current) return undefined

    ref.current.children[0].material.color = new THREE.Color('green')
    ref.current.children[1].material.color = new THREE.Color('green')

    setSelected([
      { current: ref.current.children[0] },
      { current: ref.current.children[1] },
    ])
  }, [ref])

  useFocusOnNear({
    ref: ref,
    onFocus: () =>
      onChangeInteraction(
        createDefaultInteraction({
          media: createDefaultMedia({
            id: 1,
            type: MediaTypes.TEXT,
            content: ['adsdssd'],
          }),
        })
      ),
    onDefocus: () => onChangeInteraction(null),
  })

  return (
    <>
      <ambientLight layers={10} color="green" intensity={0.5} ref={lightRef} />

      <primitive
        ref={ref}
        position={position}
        scale={[0.005, 0.005, 0.005]}
        object={object}
      />

      <EffectComposer>
        <SelectiveBloom
          selection={selected}
          intensity={4}
          luminanceThreshold={0.0025}
          luminanceSmoothing={0.025}
          height={200}
          lights={[lightRef]}
        />
      </EffectComposer>
    </>
  )
}

export default PrimitiveObject
