import classNames from 'classnames'
import styles from './Keycap.module.scss'

const Keycap = ({ small = false, value, active, bordered, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={classNames(styles['keycap'], {
        [styles['keycap-bordered']]: bordered,
        [styles['keycap-active']]: active,
        [styles['keycap-bordered-active']]: bordered && active,
      })}
    >
      <span className={styles['keycap__inner']}>{value}</span>
    </div>
  )
}

export default Keycap
