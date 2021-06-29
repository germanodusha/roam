import { useRef, useMemo } from 'react'
import { PositionalAudio, useGLTF } from '@react-three/drei'
import { useControls, button } from 'leva'
import useFocusOnNear from '@/hooks/useFocusOnNear'
import contentCoordinatesSounds from '@/data/contentCoordinatesSounds'
import { useStore } from '../../store'
import { MediaTypes } from '../../helpers/constants'
import {
  createDefaultInteraction,
  createDefaultMedia,
} from '../../helpers/mock'

const CloudSound = ({ position, trackId, cloudNodes }) => {
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

  const cloud = useMemo(() => {
    return Object.values(cloudNodes).map((mesh) => mesh.clone())
  }, [cloudNodes])

  return (
    <group ref={object} position={position}>
      <PositionalAudio
        autoplay={false}
        loop
        ref={audio}
        url={`/content/faixa${trackId}.mp3`}
      />

      <group position={[-0.5, 0.5, -0.5]}>
        {cloud.map((mesh) => (
          <primitive key={mesh.uuid} object={mesh} />
        ))}
      </group>
    </group>
  )
}

const CloudsWrapper = () => {
  const { nodes } = useGLTF('/gltf/fluffy-cloud/scene.gltf')

  return contentCoordinatesSounds.map((coordinate, i) => {
    return (
      <CloudSound
        key={coordinate.id}
        trackId={i + 1}
        position={[coordinate.x, 1, coordinate.z]}
        cloudNodes={nodes}
      />
    )
  })
}

export default CloudsWrapper
