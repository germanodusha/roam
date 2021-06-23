import classNames from 'classnames'
import { useStore } from '../../store'
import Keycap from '@/components/Keycap'
import styles from './Hud.module.scss'

const StatusText = ({ red, children }) => {
  return (
    <span
      className={classNames(styles['status'], { [styles['status-red']]: red })}
    >
      {children}
    </span>
  )
}

const HudSection = ({ children, className }) => (
  <div className={classNames(styles['hud__section'], className)}>
    {children}
  </div>
)

const Hud = () => {
  const { openMedia, onChangeInteraction } = useStore((store) => store.actions)
  const { movement, counter, nearInteraction } = useStore(
    (store) => store.state
  )

  return (
    <div className={styles['hud']}>
      <HudSection className={styles['hud__logo']}>
        <img src="/assets/images/logo-nf.png" />
      </HudSection>

      <HudSection className={styles['hud__stats']}>
        <span>{counter.main}</span>
        <img src="/assets/images/stats-contents-visited.png" />

        <div className={styles['hud__stats__spacer']} />

        <span>{counter.extra}</span>
        <img src="/assets/images/stats-tracks-visited.png" />
      </HudSection>

      <HudSection className={styles['hud__icon']}>// TODO icon</HudSection>

      <HudSection className={styles['hud__controls-move']}>
        <div className={styles['hud__controls-move__w']}>
          <Keycap value="W" active={movement.forward} />
        </div>
        <div className={styles['hud__controls-move__asd']}>
          <Keycap value="A" active={movement.left} />
          <Keycap value="S" active={movement.backward} />
          <Keycap value="D" active={movement.right} />
        </div>
      </HudSection>

      <HudSection className={styles['hud__controls-look']}>
        <Keycap value="E" />
        <Keycap value="R" />
        <Keycap value="Q" />
        <Keycap value="F" />
      </HudSection>

      {nearInteraction ? (
        <HudSection className={styles['hud__interaction']}>
          <h1>{nearInteraction.title}</h1>
          <div>
            <StatusText red>Press</StatusText>
            <Keycap
              inverted
              bordered
              small
              value="F"
              onKeyDown={() => openMedia(nearInteraction.media)}
              className={styles['hud__interaction__keycap']}
            />
            <StatusText red>to open it or</StatusText>
            <Keycap
              inverted
              bordered
              small
              value="Q"
              onKeyDown={() => onChangeInteraction(null)}
              className={styles['hud__interaction__keycap']}
            />
            <StatusText red>to ignore</StatusText>
          </div>
        </HudSection>
      ) : (
        <HudSection className={styles['hud__guide']}>
          <StatusText>press</StatusText>
          <Keycap value="Q" bordered small />
          <StatusText>for key guide</StatusText>
        </HudSection>
      )}
    </div>
  )
}

export default Hud
