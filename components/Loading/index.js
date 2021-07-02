import { useRef, useEffect } from 'react'
import { useProgress } from '@react-three/drei'
import classNames from 'classnames'
import WallBricks from '@/components/WallBricks'
import { useStore } from '../../store'
import styles from './Loading.module.scss'

const Loading = () => {
  const audio = useRef()
  const { init } = useStore((state) => state.actions)
  const { game } = useStore((state) => state.state)
  const { active, loaded, progress } = useProgress()

  const isLoading = active || loaded === 0

  const onClick = () => {
    if (!isLoading) init()
  }

  useEffect(() => {
    if (!audio.current) return
    audio.current.volume = 0.15
  }, [audio])

  if (!game.muted) {
    return <audio ref={audio} autoPlay loop src="/content/bgsound.mp3" />
  }

  return (
    <WallBricks
      onClick={onClick}
      className={classNames(styles['loading'], {
        [styles['loading__pointer']]: !isLoading,
      })}
    >
      {isLoading ? parseInt(progress) + '%' : <span>enter</span>}
    </WallBricks>
  )
}

export default Loading
