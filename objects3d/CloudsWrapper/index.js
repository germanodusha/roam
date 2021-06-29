import { useRef, useMemo } from 'react'
import { PositionalAudio, useGLTF } from '@react-three/drei'
import { useControls, button } from 'leva'
import useFocusOnNear from '@/hooks/useFocusOnNear'
import contentCoordinatesSounds from '@/data/contentCoordinatesSounds'
import contentExtras from '@/data/contentExtras'
import { useStore } from '../../store'
import MediaFactory from '@/helpers/mediaFactory'
import { createDefaultInteraction } from '@/helpers/mock'

const CloudSound = ({ media, position, cloudNodes }) => {
  const { onChangeInteraction } = useStore((state) => state.actions)
  const object = useRef()
  const audio = useRef()

  useControls(
    'sound',
    {
      play: button(() => {
        audio.current.play()
      }),
    },
    { collapsed: true }
  )

  useFocusOnNear({
    ref: object,
    onFocus: () => onChangeInteraction(createDefaultInteraction({ media })),
    onDefocus: () => onChangeInteraction(null),
  })

  const cloud = useMemo(() => {
    return Object.values(cloudNodes).map((mesh) => mesh.clone())
  }, [cloudNodes])

  return (
    <group ref={object} position={position}>
      <PositionalAudio autoplay={false} loop ref={audio} url={media.src} />

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
    const media = MediaFactory(contentExtras[i])

    return (
      <CloudSound
        key={coordinate.id}
        position={[coordinate.x, 1, coordinate.z]}
        cloudNodes={nodes}
        media={media}
      />
    )
  })
}

export default CloudsWrapper
