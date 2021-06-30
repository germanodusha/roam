import classNames from 'classnames'
import styles from './ImageMedia.module.scss'

const STORAGE_URL = ''

const ImageMedia = ({ appear, media }) => {
  return (
    <div
      className={classNames(styles['img-media'], {
        [styles['img-media-show']]: appear,
      })}
    >
      <img src={`${STORAGE_URL}${media.src}`} />
    </div>
  )
}

export default ImageMedia
