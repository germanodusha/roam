import { useEffect, useRef, useMemo } from 'react'
import { PositionalAudio, useGLTF } from '@react-three/drei'
import useFocusOnNear from '@/hooks/useFocusOnNear'
import contentCoordinatesSounds from '@/data/contentCoordinatesSounds'
import contentExtras from '@/data/contentExtras'
import { useStore } from '../../store'
import MediaFactory from '@/helpers/mediaFactory'
import { createDefaultInteraction } from '@/helpers/mock'

const CloudSound = ({ media, position, cloudNodes }) => {
  const { muted } = useStore(({ state }) => state.game)
  const { onChangeInteraction } = useStore((state) => state.actions)
  const object = useRef()
  const audio = useRef()

  useFocusOnNear({
    ref: object,
    onFocus: () => onChangeInteraction(createDefaultInteraction({ media })),
    onDefocus: () => onChangeInteraction(null),
  })

  useEffect(() => {
    if (!audio.current) return
    if (!muted) {
      audio.current.muted = false
      audio.current.play()
    }
  }, [audio, muted])

  const cloud = useMemo(() => {
    return Object.values(cloudNodes).map((mesh) => mesh.clone())
  }, [cloudNodes])

  if (!media) return null
  return (
    <group ref={object} position={position}>
      <PositionalAudio
        autoplay={false}
        loop
        muted
        ref={audio}
        url={media.src}
      />

      <group position={[-0.5, 0.5, -0.5]}>
        {cloud.map((mesh) => {
          if (mesh.type !== 'Mesh') return null
          return <primitive key={mesh.uuid} object={mesh} />
        })}
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
