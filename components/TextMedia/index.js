import { Scrollbars } from 'react-custom-scrollbars'
import classNames from 'classnames'
import MediaCover from '../MediaCover'
import styles from './TextMedia.module.scss'
import useDesappearState from '@/hooks/useDesappearState'

const TextMedia = ({ showCover, media = {} }) => {
  const [cover, appearCover] = useDesappearState({ stateToPersist: showCover })
  const [text, appearText] = useDesappearState({ stateToPersist: !showCover })

  return (
    <div className={styles['text-media']}>
      {cover && (
        <MediaCover
          show={appearCover}
          title={media?.title}
          caption={media?.caption}
          className={styles['text-media__cover']}
        />
      )}

      {text && (
        <Scrollbars
          universal
          className={classNames(styles['text-media__content'], {
            [styles['text-media__content-show']]: appearText,
          })}
        >
          {media?.content.map((content) => (
            <p>{content}</p>
          ))}
        </Scrollbars>
      )}
    </div>
  )
}

export default TextMedia
