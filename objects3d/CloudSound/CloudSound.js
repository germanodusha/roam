import {
  // useEffect,
  useRef,
} from 'react'
// import * as THREE from 'three'
import { PositionalAudio, useGLTF } from '@react-three/drei'
import { useControls, button } from 'leva'
import config from '../../config'
import useFocusOnNear from '@/hooks/useFocusOnNear'
import { useStore } from '../../store'
import { MediaTypes } from '../../helpers/constants'
import {
  createDefaultInteraction,
  createDefaultMedia,
} from '../../helpers/mock'

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
  const { onChangeInteraction } = useStore((state) => state.actions)
  const object = useRef()
  const audio = useRef()

  useControls(
    'sound',
    {
      play: button(() => {
        alert('play')

        audio.current.play()
      }),
    },
    { collapsed: true }
  )

  useFocusOnNear({
    ref: object,
    onFocus: () =>
      onChangeInteraction(
        createDefaultInteraction({
          media: createDefaultMedia({
            id: 1,
            type: MediaTypes.TRACK,
            artist: 'SIMON GRAB DEAFBRICK DUMA',
            track: 'Title Track #1',
          }),
        })
      ),
    onDefocus: () => onChangeInteraction(null),
  })

  return (
    <group ref={object} position={initialPos}>
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
