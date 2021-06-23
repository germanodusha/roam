import styles from './ImageMedia.module.scss'

const STORAGE_URL = '/content'

const ImageMedia = ({ imageWithGlow }) => {
  return (
    <div className={styles['img-media']}>
      {imageWithGlow ? (
        <img src={`${STORAGE_URL}/Favela da Rocinha-M1.png`} />
      ) : (
        <img src={`${STORAGE_URL}/Favela da Rocinha2-M2.png`} />
      )}
    </div>
  )
}

export default ImageMedia
