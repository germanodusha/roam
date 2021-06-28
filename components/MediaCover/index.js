import classNames from 'classnames'
import styles from './MediaCover.module.scss'

const MediaCover = ({ show, title, caption, className }) => {
  return (
    <div
      className={classNames(
        styles['cover'],
        { [styles['cover-show']]: show },
        className
      )}
    >
      <div className={styles['cover__title']}>
        <h1>{title}</h1>
      </div>
      <span>{caption}</span>
    </div>
  )
}

export default MediaCover
