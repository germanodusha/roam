import { Suspense, useCallback, useEffect, useState } from 'react'
import { Sky, Stats, PerspectiveCamera, MapControls } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { Controls, useControl } from 'react-three-gui'
import { useRouter } from 'next/router'
import config from '../../config'
import GLTFWalls from '../GLTFWalls'
import Ground from '../Ground'
import Player from '../Player'
import styles from './scene.module.scss'

const useControlsEnabled = () => {
  const [controlsEnabled, setControlsEnabled] = useState(false)
  const { query, push } = useRouter()

  useEffect(() => {
    const key = 'showcontrols'

    const hascontrolsEnabled = Object.keys(query).some((i) => i === key)
    if (!hascontrolsEnabled) {
      setControlsEnabled(false)
      return
    }

    const shouldHide = query[key] === 'false'
    if (shouldHide) {
      setControlsEnabled(false)
      return
    }

    setControlsEnabled(true)
  }, [query])

  const hideControls = useCallback(() => {
    push('.', '.', { shallow: false })
  }, [push])

  return [controlsEnabled, hideControls]
}

const View = ({ controlsEnabled, hideControls }) => {
  const showFps = useControl('Show FPS', {
    type: 'boolean',
    group: 'View',
    value: true,
  })

  const playerEnabled = useControl('Enabled', {
    type: 'boolean',
    group: 'Player',
    value: true,
  })

  useControl('Close', {
    type: 'button',
    onClick: hideControls,
  })

  return (
    <>
      {playerEnabled ? (
        <Player />
      ) : (
        <>
          <PerspectiveCamera makeDefault position={[0, 5, 0]} />
          <MapControls />
        </>
      )}

      {controlsEnabled && showFps && (
        <Stats
          // 0 FPS; 1 latency; 2 memory
          showPanel={0}
          className={styles.stats}
        />
      )}
    </>
  )
}

const Environment = () => {
  return (
    <>
      <Sky
        //
        distance={450000}
        sunPosition={[10, 100, 10]}
        turbidity={8}
        azimuth={0.25}
        inclination={0}
      />
      <ambientLight intensity={0.5} color="white" position={[10, 10, -100]} />
      <directionalLight
        castShadow
        position={[10, 10, 10]}
        intensity={5}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        color="blue"
      />
    </>
  )
}

const Scene = () => {
  const [controlsEnabled, hideControls] = useControlsEnabled()

  return (
    <Controls.Provider>
      <Controls.Canvas className={styles.scene} shadowMap>
        <Suspense fallback={null}>
          <Environment />

          <Physics>
            <Ground />
            <View controlsEnabled={controlsEnabled} hideControls={hideControls} />
            <GLTFWalls path={config.maze.gltf} showCollisions={config.maze.showCollisions} />
          </Physics>
        </Suspense>
      </Controls.Canvas>

      {controlsEnabled && <Controls {...config.GUIControls} />}
    </Controls.Provider>
  )
}

export default Scene
