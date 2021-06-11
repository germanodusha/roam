import classNames from 'classnames'
import styles from './Hud.module.scss'
console.log(styles)

const Hud = () => {
  return (
    <div className={styles["hud"]}>
      <div className={classNames(styles["hud__section"], styles["hud__logo"])}>
        novas frequencias
      </div>

      <div className={classNames(styles["hud__section"], styles["hud__stats"])}>
        2/18
      </div>

      <div className={classNames(styles["hud__section"], styles["hud__icon"])}>
        icon
      </div>

      <div className={classNames(styles["hud__section"], styles["hud__controls-move"])}>
        wasd
      </div>

      <div className={classNames(styles["hud__section"], styles["hud__controls-look"])}>
        /\
        {"<>"}
        \/
      </div>

      <div className={classNames(styles["hud__section"], styles["hud__guide"])}>
        press S for key guide
      </div>
    </div>
  )
}

export default Hud
