import classNames from 'classnames'
import styles from './WallBricks.module.scss'

const WallBricks = ({ children, className, ...props }) => {
  return (
    <div className={classNames(styles['wall-bricks'], className)} {...props}>
      {children}
    </div>
  )
}

export default WallBricks
