import {
  // useEffect,
  useRef,
} from 'react'
// import * as THREE from 'three'
import { PositionalAudio, useGLTF } from '@react-three/drei'
import { useControls, button } from 'leva'
import config from '../../config'

const Cloud = () => {
  const {
    nodes,
    // materials
  } = useGLTF('/gltf/fluffy-cloud/scene.gltf')

  // useEffect(() => {
  //   const green = new THREE.Color(0, 1, 0)

  //   Object.keys(materials).map((id) => {
  //     const material = materials[id]
  //     console.log(material)
  //     material.color = green
  //     material.emissive = green
  //     material.emissiveColor = green
  //   })
  // }, [materials])

  return (
    <group position={[-0.5, 0.5, -0.5]}>
      {Object.keys(nodes).map((id) => (
        <primitive key={id} object={nodes[id]} />
      ))}
    </group>
  )
}

const initialPos = config.player.initialPos
initialPos[1] = 0.7

const CloudSound = () => {
  const audio = useRef()

  useControls({
    play: button(() => {
      alert('play')

      audio.current.play()
    }),
  })

  return (
    <group position={initialPos}>
      <PositionalAudio
        autoplay={false}
        loop
        ref={audio}
        url="/assets/acdc.mp3"
      />

      <Cloud />
    </group>
  )
}

export default CloudSound
