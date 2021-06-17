import styles from './VideoMedia.module.scss'

const VideoMedia = () => {
  return (
    <div className={styles['video']}>
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
