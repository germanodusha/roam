import { useState, useEffect, useRef } from 'react'
import { useFullscreen } from 'react-use'
import { isMobile } from 'react-device-detect'
import Hud from '@/components/Hud'
import MediaCenter from '@/components/MediaCenter'
import Loading from '@/components/Loading'
import { Scene } from '../objects3d'

const Index = () => {
  const ref = useRef(null)
  const [fullscreen, toggleFullscreen] = useState(false)

  useFullscreen(ref, fullscreen, { onClose: () => toggleFullscreen(false) })

  useEffect(() => {
    if (!isMobile) return

    const forceFullscreen = () => {
      if (fullscreen) return
      toggleFullscreen(true)
    }

    window.addEventListener('click', forceFullscreen)

    return () => {
      window.removeEventListener('click', forceFullscreen)
    }
  }, [fullscreen, toggleFullscreen])

  const onLoad = () => {
    if (!isMobile) return
    if (fullscreen) return
    toggleFullscreen(true)
  }

  return (
    <div ref={ref}>
      <Scene />
      <Hud
        isFullscreen={fullscreen}
        disableFullscreen={() => toggleFullscreen(false)}
      />
      {/**showLocker && <div>locker</div>**/}
      <MediaCenter />
      <Loading toggleFullscreen={onLoad} />
    </div>
  )
}

export default Index
