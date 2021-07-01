import classNames from 'classnames'
import styles from './VideoMedia.module.scss'

const VideoMedia = ({ media }) => {
  return (
    <div
      className={classNames(styles['video'], {
        [styles['video-show']]: true,
      })}
    >
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${media.src}?autoplay=1`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>
  )
}

export default VideoMedia
