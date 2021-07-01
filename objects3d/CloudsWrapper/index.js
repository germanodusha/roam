import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import {
  Html,
  // PositionalAudio,
  // useGLTF
} from '@react-three/drei'
import { useAudio } from 'react-use'
import useFocusOnNear from '@/hooks/useFocusOnNear'
import contentCoordinatesSounds from '@/data/contentCoordinatesSounds'
import contentExtras from '@/data/contentExtras'
import { useStore } from '../../store'
import MediaFactory from '@/helpers/mediaFactory'
import { createDefaultInteraction } from '@/helpers/mock'

const CloudSound = ({ media, position }) => {
  const ref = useRef()
  // const { muted } = useStore(({ state }) => state.game)
  const { onChangeInteraction, addGlow } = useStore((state) => state.actions)
  const object = useRef()

  // const { isFocus } =
  useFocusOnNear({
    ref: object,
    onFocus: () => {
      onChangeInteraction(createDefaultInteraction({ media }))
      controls.play()
    },
    onDefocus: () => {
      onChangeInteraction(null)
      controls.pause()
    },
    distanceTolerance: 1.5,
  })

  const [audio, state, controls] = useAudio({
    src: media?.src,
    crossOrigin: 'anonymous',
    loop: true,
    autoPlay: false,
    muted: false,
  })

  useEffect(() => {
    console.log(2, state)
  }, [state])

  // useEffect(() => {
  //   if (!audio.current) return

  //   if (isFocus) {
  //     console.log(audio, 4)
  //     audio.current.muted = false
  //     audio.current
  //       .play()
  //       .catch(() => console.warn('failed to play audioPlayer background'))
  //   } else {
  //     audio.current.muted = true
  //     audio.current.pause()
  //   }
  // }, [audio, isFocus])

  // useEffect(() => {
  //   if (!audio.current) return
  //   if (!muted) {
  //     audio.current.muted = false
  //     audio.current.play()
  //   }
  // }, [audio, muted])

  // const cloud = useMemo(() => {
  //   return Object.values(cloudNodes).map((mesh) => mesh.clone())
  // }, [cloudNodes])

  useEffect(() => {
    if (!ref.current) return
    addGlow([ref])
  }, [ref, addGlow])

  if (!media) return null
  return (
    <group ref={object} position={position}>
      <Html>{audio}</Html>
      {/**
      <Html>
        <audio
          crossOrigin="anonymous"
          ref={audio}
          src={media.src}
          loop
          autoPlay={false}
          muted
          onCanPlay={() => {
            console.log('on can play')
            setCanplay(true)
          }}
        />
      </Html>
      **/}
      {/**
      <PositionalAudio
        autoplay={false}
        loop
        muted
        ref={audio}
        url={media.src}
      />
      **/}

      <mesh ref={ref}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial
          wireframeLinewidth={4}
          color={new THREE.Color(0, 1, 0)}
          wireframe
        />
      </mesh>

      {/**
      <group position={[-0.5, 0.5, -0.5]}>
        {cloud.map((mesh) => {
          if (mesh.type !== 'Mesh') return null
          return <primitive key={mesh.uuid} object={mesh} />
        })}
      </group>
      **/}
    </group>
  )
}

const CloudsWrapper = () => {
  // const { nodes } = useGLTF('/gltf/fluffy-cloud/scene.gltf')

  return contentCoordinatesSounds.map((coordinate, i) => {
    const media = MediaFactory(contentExtras[i])

    return (
      <CloudSound
        key={coordinate.id}
        position={[coordinate.x, 1, coordinate.z]}
        // cloudNodes={nodes}
        media={media}
      />
    )
  })
}

export default CloudsWrapper
