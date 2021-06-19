import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { MTLLoader, OBJLoader } from 'three-stdlib'
import { useLoader } from '@react-three/fiber'
import { EffectComposer, SelectiveBloom } from '@react-three/postprocessing'
// import useFocusOnNear from '@/hooks/useFocusOnNear'

const PrimitiveObject = ({ position }) => {
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

  // const [selected, setSelected] = useState(undefined)

  // const onFocus = (r) => {
  //   if (!r.current) return

  //   r.current.children[0].material.color = new THREE.Color('green')
  //   r.current.children[1].material.color = new THREE.Color('green')

  //   setSelected([
  //     { current: r.current.children[0] },
  //     { current: r.current.children[1] },
  //   ])
  // }

  // const onDefocus = (r) => {
  //   if (!r.current) return

  //   r.current.children[0].material.color = new THREE.Color()
  //   r.current.children[1].material.color = new THREE.Color()

  //   setSelected(undefined)
  // }

  // useFocusOnNear({
  //   ref: ref2,
  //   onFocus: () => onFocus(ref2),
  //   onDefocus: () => onDefocus(ref2),
  // })

  // useFocusOnNear({
  //   ref: ref3,
  //   onFocus: () => onFocus(ref3),
  //   onDefocus: () => onDefocus(ref3),
  // })

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
