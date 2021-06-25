import classNames from 'classnames'
import styles from './VideoMedia.module.scss'

const VideoMedia = ({ appear }) => {
  return (
    <div
      className={classNames(styles['video'], {
        [styles['video-show']]: appear,
      })}
    >
      <iframe
        src="https://www.youtube-nocookie.com/embed/gEPmA3USJdI"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>
  )
}

export default VideoMedia
