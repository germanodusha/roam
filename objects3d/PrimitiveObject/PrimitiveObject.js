import { useMemo, useState, useRef } from 'react'
import * as THREE from 'three'
import { MTLLoader, OBJLoader } from 'three-stdlib'
import { useLoader } from '@react-three/fiber'
import { EffectComposer, SelectiveBloom } from '@react-three/postprocessing'
import useFocusOnNear from '@/hooks/useFocusOnNear'

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

  const ref2 = useRef()
  const ref3 = useRef()
  const lightRef = useRef()

  const [selected, setSelected] = useState(undefined)

  const onFocus = (r) => {
    if (!r.current) return

    r.current.children[0].material.color = new THREE.Color('green')
    r.current.children[1].material.color = new THREE.Color('green')

    setSelected([
      { current: r.current.children[0] },
      { current: r.current.children[1] },
    ])
  }

  const onDefocus = (r) => {
    if (!r.current) return

    r.current.children[0].material.color = new THREE.Color()
    r.current.children[1].material.color = new THREE.Color()

    setSelected(undefined)
  }

  useFocusOnNear({
    ref: ref2,
    onFocus: () => onFocus(ref2),
    onDefocus: () => onDefocus(ref2),
  })

  useFocusOnNear({
    ref: ref3,
    onFocus: () => onFocus(ref3),
    onDefocus: () => onDefocus(ref3),
  })

  // const selected = useMemo(() => {
  //   if (!ref2.current || !ref3.current) return undefined

  //   if (!isFocus2) {
  //     ref2.current.children[0].material.color = new THREE.Color()
  //     ref2.current.children[1].material.color = new THREE.Color()
  //   }

  //   if (!isFocus3) {
  //     ref3.current.children[0].material.color = new THREE.Color()
  //     ref3.current.children[1].material.color = new THREE.Color()
  //   }

  //   if (!isFocus2 && !isFocus3) return undefined

  //   if (isFocus2) {
  //     ref2.current.children[0].material.color = new THREE.Color('green')
  //     ref2.current.children[1].material.color = new THREE.Color('green')

  //     return [
  //       { current: ref2.current.children[0] },
  //       { current: ref2.current.children[1] },
  //     ]
  //   }

  //   if (isFocus3) {
  //     ref3.current.children[0].material.color = new THREE.Color('green')
  //     ref3.current.children[1].material.color = new THREE.Color('green')

  //     return [
  //       { current: ref3.current.children[0] },
  //       { current: ref3.current.children[1] },
  //     ]
  //   }

  //   return undefined
  // }, [isFocus2, isFocus3])

  const clone = useMemo(() => object.clone(), [object])

  return (
    <>
      <ambientLight layers={10} color="green" intensity={0.5} ref={lightRef} />

      <primitive
        ref={ref2}
        position={position}
        scale={[0.005, 0.005, 0.005]}
        object={object}
      />

      <primitive
        ref={ref3}
        position={[position[0] - 10, position[1], position[2]]}
        scale={[0.005, 0.005, 0.005]}
        object={clone}
      />

      <EffectComposer>
        <SelectiveBloom
          selection={selected}
          intensity={2}
          luminanceThreshold={0.025}
          luminanceSmoothing={0.0025}
          height={300}
          lights={[lightRef]}
        />
      </EffectComposer>
    </>
  )
}

export default PrimitiveObject
