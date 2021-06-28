import classNames from 'classnames'
import styles from './ImageMedia.module.scss'

const STORAGE_URL = '/content'

const ImageMedia = ({ appear }) => {
  return (
    <div
      className={classNames(styles['img-media'], {
        [styles['img-media-show']]: appear,
      })}
    >
      <img src={`${STORAGE_URL}/Favela da Rocinha2-M2.png`} />
    </div>
  )
}

export default ImageMedia
