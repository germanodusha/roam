// import { useMemo } from 'react'
import Hud from '@/components/Hud'
import MediaCenter from '@/components/MediaCenter'
import Loading from '@/components/Loading'
// import { useStore } from '../store'
import { Scene } from '../objects3d'

const Index = () => {
  {
    /**
    const { pointerLock } = useStore(({ state }) => state.game)

    const showLocker = useMemo(() => {
      console.log(pointerLock)
      // const showLocker = pointerLock ? !pointerLock.current.isLocked : false
    }, [pointerLock])
  **/
  }

  return (
    <>
      <Scene />
      <Hud />
      {/**showLocker && <div>locker</div>**/}
      <MediaCenter />
      <Loading />
    </>
  )
}

export default Index
