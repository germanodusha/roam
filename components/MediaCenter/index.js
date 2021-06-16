import styles from './MediaCenter.module.scss'
import { useStore } from '../../store'
import { createDefaultMedia } from '../../helpers/mock'
import { MediaTypes } from '../../helpers/constants'
import AudioMedia from '../AudioMedia'
import TextMedia from '../TextMedia'
import LinkMedia from '../LinkMedia'
import VideoMedia from '../VideoMedia'

const MediaCenterWapper = {
  [MediaTypes.AUDIO]: AudioMedia,
  [MediaTypes.TEXT]: TextMedia,
  [MediaTypes.LINK]: LinkMedia,
  [MediaTypes.VIDEO]: VideoMedia,
  [undefined]: () => null,
}

const MediaCenter = () => {
  const { closeMedia, openMedia } = useStore((store) => store.actions)
  const { activeMedia } = useStore((store) => store.state)

  const onOpenMedia = (type) => () => {
    openMedia(createDefaultMedia({
      type,
      ...type === MediaTypes.TEXT && {
        content: [
          'texto',
          '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
          '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
          'texto2',
        ],
      },
    }))
  }

  const Media = MediaCenterWapper[activeMedia.type]

  return (
    <>
      {activeMedia && Media && (
        <div className={styles["media"]}>
          <div className={styles["media-glow"]}>
            <Media />
          </div>
        </div>
      )}

      <div className={styles["media__dev"]}>
        {activeMedia ? (
          <button onClick={closeMedia}>close</button>
        ) : (
          <>
            <button onClick={onOpenMedia(MediaTypes.AUDIO)}>audio</button>
            <button onClick={onOpenMedia(MediaTypes.TEXT)}>text</button>
            <button onClick={onOpenMedia(MediaTypes.LINK)}>link</button>
            <button onClick={onOpenMedia(MediaTypes.VIDEO)}>video</button>
          </>
        )}
      </div>
    </>
  )
}

export default MediaCenter

