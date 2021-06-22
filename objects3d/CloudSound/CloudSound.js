import { useEffect, useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  PositionalAudio,
  Billboard,
  Cloud,
  useTexture,
} from '@react-three/drei'
import { useControls, button } from 'leva'
import CloudImage from '@react-three/drei/assets/cloud.base64'
import config from '../../config'

function Cloud2({
  opacity = 0.5,
  speed = 0.4,
  width = 1,
  length = 0.2,
  segments = 10,
  dir = 1,
  ...props
}) {
  const group = useRef()
  const texture = useTexture(CloudImage)
  const clouds = useMemo(
    () =>
      [...new Array(segments)].map((_, index) => ({
        x: width - Math.random() * width,
        y: width - Math.random() * width,
        scale:
          Math.sin(((index + 1) / segments) * Math.PI) *
          ((0.2 + Math.random()) * 4) *
          0.5,
        density: Math.max(0.2, Math.random()),
        rotation: Math.max(0.002, 0.005 * Math.random()) * speed,
      })),
    [width, segments, speed]
  )

  useFrame((state) =>
    group.current?.children.forEach((cloud, index) => {
      cloud.rotation.z += clouds[index].rotation * dir
      cloud.scale.setScalar(
        clouds[index].scale +
          (((1 + Math.sin(state.clock.getElapsedTime() / 10)) / 2) * index) / 10
      )
    })
  )

  return (
    <group {...props}>
      <group ref={group}>
        {clouds.map(({ x, y, scale, density }, index) => (
          <Billboard
            key={index}
            scale={[scale, scale, scale]}
            position={[x, y, -index * length]}
            lockZ
          >
            <meshStandardMaterial
              map={texture}
              transparent
              opacity={scale * 1.5 * density * opacity}
              depthTest // ={false}
            />
          </Billboard>
        ))}
      </group>
    </group>
  )
}

const CloudSound = () => {
  const audio = useRef()

  useControls({
    play: button(() => {
      alert('play')

      audio.current.play()
    }),
  })

  useEffect(() => {
    console.log(audio, 3)
  }, [audio])

  return (
    <group position={config.player.initialPos}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial wireframe />
      </mesh>

      <PositionalAudio
        autoplay={false}
        loop
        ref={audio}
        url="/assets/acdc.mp3"
      />
    </group>
  )
}

export default CloudSound
