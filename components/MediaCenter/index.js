import { useState } from 'react'
import styles from './MediaCenter.module.scss'
import classNames from 'classnames'
import { useStore } from '../../store'
import { MediaTypes } from '../../helpers/constants'
import useDesappearState from '@/hooks/useDesappearState'
import TextMedia from '@/components/TextMedia'
import ImageMedia from '@/components/ImageMedia'
import VideoMedia from '@/components/VideoMedia'
import StatusText from '@/components/StatusText'
import Keycap from '@/components/Keycap'

const MediaCenterWapper = {
  [MediaTypes.IMAGE]: ImageMedia,
  [MediaTypes.TEXT]: TextMedia,
  [MediaTypes.VIDEO]: VideoMedia,
  [undefined]: () => null,
}

const MediaCenter = () => {
  const [showCover, setShowCover] = useState(true)
  const { closeMedia } = useStore((store) => store.actions)
  const { activeMedia } = useStore((store) => store.state)
  const [state, show] = useDesappearState({ stateToPersist: activeMedia })

  const Media = state.media ? MediaCenterWapper[state.media.type] : undefined

  const onNextPage = () => setShowCover((v) => !v)

  if (!state || !Media) return null

  return (
    <div
      className={classNames(styles['media'], { [styles['media-show']]: show })}
    >
      <div
        className={classNames(
          styles['media__status'],
          styles['media__status__exit']
        )}
      >
        <StatusText>press</StatusText>
        <Keycap value="e" bordered small onKeyDown={closeMedia} />
        <StatusText>to go back to the maze</StatusText>
      </div>

      <div
        className={classNames(
          styles['media__status'],
          styles['media__status__actions']
        )}
      >
        <StatusText>use</StatusText>
        <Keycap value="f" bordered small onKeyDown={onNextPage} />
        <StatusText>for text scroll</StatusText>
      </div>

      <div className={styles['media-glow']}>
        <Media showCover={showCover} media={state?.media} />
      </div>
    </div>
  )
}

export default MediaCenter
