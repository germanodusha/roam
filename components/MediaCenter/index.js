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
import MediaCover from '@/components/MediaCover'
import texto1 from '@/data/texts/texto1.md'
import texto2 from '@/data/texts/texto2.md'
import texto3 from '@/data/texts/texto3.md'
import texto4 from '@/data/texts/texto4.md'
import texto5 from '@/data/texts/texto5.md'
import texto6 from '@/data/texts/texto6.md'
import texto7 from '@/data/texts/texto7.md'
import texto8 from '@/data/texts/texto8.md'
import texto9 from '@/data/texts/texto9.md'
import texto10 from '@/data/texts/texto10.md'
import texto11 from '@/data/texts/texto11.md'

const markdowns = {
  'texto1.md': texto1,
  'texto2.md': texto2,
  'texto3.md': texto3,
  'texto4.md': texto4,
  'texto5.md': texto5,
  'texto6.md': texto6,
  'texto7.md': texto7,
  'texto8.md': texto8,
  'texto9.md': texto9,
  'texto10.md': texto10,
  'texto11.md': texto11,
}

const TextStatus = ({}) => {
  return (
    <div
      className={classNames(
        styles['media__status'],
        styles['media__status__actions']
      )}
    >
      <StatusText>press</StatusText>
      <Keycap value="f" bordered small />
      <StatusText>for content</StatusText>
    </div>
  )
}

const ToggleCover = ({ onNextPage }) => {
  return (
    <div
      className={classNames(
        styles['media__status'],
        styles['media__status__actions']
      )}
    >
      <StatusText>press</StatusText>
      <Keycap value="f" bordered small onKeyDown={onNextPage} />
      <StatusText>for content</StatusText>
    </div>
  )
}

const MediaCenterWapper = {
  [MediaTypes.IMAGE]: ImageMedia,
  [MediaTypes.TEXT]: TextMedia,
  [MediaTypes.VIDEO]: VideoMedia,
  [undefined]: () => null,
}

const MediaCenterStatus = {
  ['hide-cover']: ToggleCover,
  [MediaTypes.IMAGE]: ToggleCover,
  [MediaTypes.TEXT]: TextStatus,
  [MediaTypes.VIDEO]: () => null,
  [undefined]: () => null,
}

const MediaCenter = () => {
  const [showCover, setShowCover] = useState(true)
  const { closeMedia } = useStore((store) => store.actions)
  const { activeMedia } = useStore((store) => store.state)
  const [state, show] = useDesappearState({ stateToPersist: activeMedia })
  const [cover, appearCover] = useDesappearState({ stateToPersist: showCover })
  const [content, appearContent] = useDesappearState({
    stateToPersist: !showCover,
  })

  const Media = state.media ? MediaCenterWapper[state.media.type] : undefined

  const getStatus = () => {
    if (!state.media) return MediaCenterStatus[undefined]
    if (state.media.type === MediaTypes.VIDEO)
      return MediaCenterStatus[undefined]
    if (state.media.type === MediaTypes.TEXT && !showCover)
      return MediaCenterStatus[undefined]
    if (cover) return MediaCenterStatus['hide-cover']
    return MediaCenterStatus[state.media.type]
  }
  const Status = getStatus()

  const onNextPage = () => setShowCover((v) => !v)

  const onClose = () => {
    closeMedia()
    setShowCover(true)
  }

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
        <Keycap value="e" bordered small onKeyDown={onClose} />
        <StatusText>to go back to the maze</StatusText>
      </div>

      <Status onNextPage={onNextPage} />

      <div className={styles['media-glow']}>
        <div className={styles['media__wrapper']}>
          {cover && (
            <MediaCover
              show={appearCover}
              title={state?.media?.title}
              caption={state?.media?.caption}
              className={styles['media__wrapper__cover']}
              media={state.media}
            />
          )}

          {cover && state?.media?.type === MediaTypes.VIDEO && (
            <Media
              appear={appearContent}
              media={state?.media}
              {...(state?.media?.type === MediaTypes.TEXT ? { markdowns } : {})}
            />
          )}

          {content && (
            <Media
              appear={appearContent}
              media={state?.media}
              {...(state?.media?.type === MediaTypes.TEXT ? { markdowns } : {})}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default MediaCenter
