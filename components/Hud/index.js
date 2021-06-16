import { useCallback, useState, useMemo } from 'react'
import classNames from 'classnames'
import { useStore } from '../../store'
import Keycap from '@/components/Keycap'
import styles from './Hud.module.scss'

const Hud = () => {
  const { onMove } = useStore((store) => store.actions)
  const { movement } = useStore((store) => store.state)

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
        <div className={styles["hud__controls-move__w"]}>
          <Keycap value="W" active={movement.forward} />
        </div>
        <div className={styles["hud__controls-move__asd"]}>
          <Keycap value="A" active={movement.left} />
          <Keycap value="S" active={movement.backward} />
          <Keycap value="D" active={movement.right} />
        </div>
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
