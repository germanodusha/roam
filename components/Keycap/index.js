import classNames from 'classnames'
import styles from './Keycap.module.scss'
import useKeyPressEvent from '../../hooks/useKeyPressEvent'

const Keycap = ({
  small = false,
  value,
  active,
  bordered,
  className,
  onClick = () => {},
  onKeyDown = () => {},
  onKeyUp = () => {},
}) => {
  useKeyPressEvent({ key: value, onKeyDown, onKeyUp })

  return (
    <div
      onClick={onClick}
      onMouseUp={onKeyUp}
      onMouseDown={onKeyDown}
      onTouchEnd={onKeyUp}
      onTouchStart={onKeyDown}
      className={classNames(
        styles['keycap'],
        {
          [styles['keycap-bordered']]: bordered,
          [styles['keycap-active']]: active,
          [styles['keycap-bordered-active']]: bordered && active,
          [styles['keycap-small']]: small,
        },
        className
      )}
    >
      <span
        className={classNames(styles['keycap__inner'], {
          [styles['keycap__inner-bordered']]: bordered,
        })}
      >
        {value.toUpperCase()}
      </span>
    </div>
  )
}

export default Keycap
