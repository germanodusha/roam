import { useCallback, useState, useMemo } from 'react'
import classNames from 'classnames'
import Keycap from '@/components/Keycap'
import styles from './Hud.module.scss'

const Hud = () => {
  return (
    <div className={styles["hud"]}>
      <div
        className={classNames(
          styles["hud__section"],
          styles["hud__logo"],
        )}
      >
        <img src="/assets/images/logo-nf.png" />
      </div>

      <div
        className={classNames(
          styles["hud__section"],
          styles["hud__stats"],
        )}
      >
        2
        <img src="/assets/images/stats-contents-visited.png" />

        18
        <img src="/assets/images/stats-tracks-visited.png" />
      </div>

      <div
        className={classNames(
          styles["hud__section"],
          styles["hud__icon"],
        )}
      >
        // TODO icon
      </div>

      <div
        className={classNames(
          styles["hud__section"],
          styles["hud__controls-move"],
        )}
      >
        <Keycap value="W" />
        <Keycap value="A" />
        <Keycap value="S" />
        <Keycap value="D" />
      </div>

      <div
        className={classNames(
          styles["hud__section"],
          styles["hud__controls-look"],
        )}
      >
        <Keycap value="E" />
        <Keycap value="R" />
        <Keycap value="Q" />
        <Keycap value="F" />
      </div>

      <div
        className={classNames(
          styles["hud__section"],
          styles["hud__guide"],
        )}
      >
        press <Keycap value="Q" bordered /> for key guide
      </div>

      {false && (
        <div
          className={classNames(
            styles["hud__section"],
            styles["hud__interaction"],
          )}
        >
          interaction
        </div>
      )}
    </div>
  )
}

export default Hud
