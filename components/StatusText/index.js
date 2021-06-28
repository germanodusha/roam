import classNames from 'classnames'
import styles from './StatusText.module.scss'

const StatusText = ({ red, children }) => {
  return (
    <span
      className={classNames(styles['status'], { [styles['status-red']]: red })}
    >
      {children}
    </span>
  )
}

export default StatusText
