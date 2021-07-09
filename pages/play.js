import { useState, useEffect, useRef } from 'react'
import { useFullscreen } from 'react-use'
import Hud from '@/components/Hud'
import MediaCenter from '@/components/MediaCenter'
import Loading from '@/components/Loading'
import useIsMobile from '@/hooks/useIsMobile'
import { Scene } from '../objects3d'

const Index = () => {
  const ref = useRef(null)
  const [fullscreen, toggleFullscreen] = useState(false)
  const isMobile = useIsMobile()

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
  }, [fullscreen, toggleFullscreen, isMobile])

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
