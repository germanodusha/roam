import styles from './MediaCenter.module.scss'
import { useStore } from '../../store'
import { createDefaultMedia } from '../../helpers/mock'
import { MediaTypes } from '../../helpers/constants'
import TextMedia from '../TextMedia'
import ImageMedia from '../ImageMedia'
import VideoMedia from '../VideoMedia'

const MediaCenterWapper = {
  [MediaTypes.IMAGE]: ImageMedia,
  ['image-with-glow']: ImageMedia,
  [MediaTypes.TEXT]: TextMedia,
  [MediaTypes.VIDEO]: VideoMedia,
  [undefined]: () => null,
}

const MediaCenter = () => {
  const { closeMedia, openMedia } = useStore((store) => store.actions)
  const { activeMedia } = useStore((store) => store.state)

  const onOpenMedia = (type) => () => {
    openMedia(
      createDefaultMedia({
        type,
        ...(type === MediaTypes.TEXT && {
          content: [
            'texto',
            '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
            '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
            'texto2',
          ],
        }),
      })
    )
  }

  const Media = MediaCenterWapper[activeMedia.type]

  return (
    <>
      {activeMedia && Media && (
        <div className={styles['media']}>
          <div
            className={
              activeMedia.type !== 'image-with-glow' && styles['media-glow']
            }
          >
            <Media imageWithGlow={activeMedia.type === 'image-with-glow'} />
          </div>
        </div>
      )}

      <div className={styles['media__dev']}>
        {activeMedia ? (
          <button onClick={closeMedia}>close</button>
        ) : (
          <>
            <button onClick={onOpenMedia(MediaTypes.IMAGE)}>
              image sem glow
            </button>
            <button onClick={onOpenMedia('image-with-glow')}>
              image com glow
            </button>
            <button onClick={onOpenMedia(MediaTypes.TEXT)}>text</button>
            <button onClick={onOpenMedia(MediaTypes.VIDEO)}>video</button>
          </>
        )}
      </div>
    </>
  )
}

export default MediaCenter
