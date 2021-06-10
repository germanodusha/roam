import { useEffect } from 'react'
import * as THREE from 'three'
import { useThree, useLoader } from '@react-three/fiber'

const ComplexMaterial = ({
  path,
  repeatX,
  repeatY,
  aoMapIntensity = 5,
  baseColorPath,
  bumpScale = 10,
  displacementPath,
  normal = 1,
  normalPath,
  ambientOcclusionPath,
  roughness = 5,
  roughnessPath,
}) => {
  const { scene } = useThree()

  const [base, bump, normalMap, ao, rough] = useLoader(THREE.TextureLoader, [
    `${path}${baseColorPath}`,
    `${path}${displacementPath}`,
    `${path}${normalPath}`,
    `${path}${ambientOcclusionPath}`,
    `${path}${roughnessPath}`,
  ])

  useEffect(() => {
    ;[base, bump, normalMap, ao, rough].forEach((texture) => {
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(repeatX, repeatY)
    })
  }, [repeatY, repeatX, base, bump, normalMap, ao, rough])

  return (
    <meshPhysicalMaterial
      attach="material"
      map={base}
      bumpScale={bumpScale}
      bumpMap={bump}
      aoMapIntensity={aoMapIntensity}
      aoMap={ao}
      normal={normal}
      normalMap={normalMap}
      roughness={roughness}
      roughnessMap={rough}
      envMap={scene.background}
    />
  )
}

export default ComplexMaterial
