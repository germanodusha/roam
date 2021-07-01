import { useProgress } from '@react-three/drei'
import classNames from 'classnames'
import { useStore } from '../../store'
import styles from './Loading.module.scss'

const Loading = () => {
  const { init } = useStore((state) => state.actions)
  const { game } = useStore((state) => state.state)
  const progressState = useProgress()
  const { active, loaded, progress } = progressState
  // const { active, loaded, progress } = useProgress()

  console.log(progressState)

  const isLoading = active || loaded === 0

  const onClick = () => {
    if (!isLoading) init()
  }

  if (!game.muted) return null
  return (
    <div
      onClick={onClick}
      className={classNames(styles['loading'], {
        [styles['loading__pointer']]: !isLoading,
      })}
    >
      {isLoading ? parseInt(progress) + '%' : <span>play</span>}
    </div>
  )
}

export default Loading
