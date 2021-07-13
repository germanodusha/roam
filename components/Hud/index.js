import { useMemo, useEffect, useState } from 'react'
import classNames from 'classnames'
import { useControls } from 'leva'
import { useStore } from '../../store'
import Keycap from '@/components/Keycap'
import { MediaTypes } from '@/helpers/constants'
import useDesappearState from '@/hooks/useDesappearState'
import useIsMobile from '@/hooks/useIsMobile'
import BottomButtons from '@/components/BottomButtons'
import KeyBindings from '../../config/keybindings.json'
import styles from './Hud.module.scss'

const HudSection = ({ children, className, show }) => (
  <div
    className={classNames(
      styles['hud__section'],
      { [styles['hud__section-show']]: show },
      className
    )}
  >
    {children}
  </div>
)

const ContentDisplay = ({ media, openMedia, onChangeInteraction }) => {
  const [state, show] = useDesappearState({ stateToPersist: media })

  const buttonsData = useMemo(
    () => [
      { type: 'text', text: 'press', red: true },
      {
        type: 'key',
        value: 'F',
        onKeyDown: () => media && openMedia(media),
        className: styles['hud__interaction__keycap'],
        mobile: 'OPEN',
      },
      { type: 'text', text: 'to open it or', red: true },
      {
        type: 'key',
        value: 'E',
        onKeyDown: () => onChangeInteraction(null),
        className: styles['hud__interaction__keycap'],
        mobile: 'IGNORE',
      },
      { type: 'text', text: 'to ignore', red: true },
    ],
    [media, openMedia, onChangeInteraction]
  )

  if (!media && !show) return null

  return (
    <HudSection show={show} className={styles['hud__interaction']}>
      <h1 className={styles['red']}>{state.title}</h1>
      <BottomButtons data={buttonsData} />
    </HudSection>
  )
}

const TrackDisplay = ({ mediaTrack }) => {
  const { onChangeInteraction } = useStore((store) => store.actions)
  const [state, show] = useDesappearState({ stateToPersist: mediaTrack })
  const { formatedTime } = useStore((store) => store.state)
  const isMobile = useIsMobile()

  const disableTrack = () => onChangeInteraction(null)

  if (!mediaTrack && !show) return null
  return (
    <>
      <HudSection show={show} className={styles['hud__interaction']}>
        <h1>{state.media?.artist}</h1>
        <h3>{state.media?.title}</h3>
        <img
          src="/assets/images/Icon-Track.png"
          className={styles['hud__interaction__icon']}
        />
        <span className={styles['hud__interaction__time']}>{formatedTime}</span>
      </HudSection>

      <HudSection show={isMobile} className={styles['hud__back-btn']}>
        <Keycap
          small
          bordered
          fitContent
          value="return"
          onClick={disableTrack}
          onKeyUp={disableTrack}
          onKeyDown={disableTrack}
        />
      </HudSection>
    </>
  )
}

const Hud = ({ isFullscreen, disableFullscreen }) => {
  const isMobile = useIsMobile()
  const [media, setMedia] = useState(false)
  const [mediaTrack, setMediaTrack] = useState(false)
  const { onMove, openMedia, onChangeInteraction } = useStore(
    (store) => store.actions
  )
  const { movement, counter, activeMedia, nearInteraction } = useStore(
    (store) => store.state
  )

  useEffect(() => {
    if (!nearInteraction) {
      setMedia(false)
      setMediaTrack(false)
      return
    }
    if (!nearInteraction.media) return
    const isMediaTrack = nearInteraction.media.type === MediaTypes.TRACK
    ;(isMediaTrack ? setMediaTrack : setMedia)(nearInteraction)
  }, [nearInteraction])

  const showFullMenu = !mediaTrack && !activeMedia

  const { hud } = useControls('player', { hud: true })

  if (!hud) return null

  return (
    <div className={styles['hud']}>
      <HudSection show className={classNames(styles['hud__logo'])}>
        <img
          className={classNames({
            [styles['hud__logo-white']]: mediaTrack || activeMedia,
          })}
          src="/assets/images/logo-nf.png"
        />
      </HudSection>

      <HudSection show={showFullMenu} className={styles['hud__stats']}>
        <div>
          <span>
            {counter.main}
            <span className={styles['hud__stats--small']}>/12</span>
          </span>
          <img src="/assets/images/stats-contents-visited.png" />
        </div>

        <div className={styles['hud__stats__spacer']} />

        <div>
          <span>
            {counter.extra}
            <span className={styles['hud__stats--small']}>/51</span>
          </span>
          <img src="/assets/images/stats-tracks-visited.png" />
        </div>
      </HudSection>

      {isFullscreen && (
        <HudSection show={showFullMenu} className={styles['hud__icon']}>
          <Keycap
            small
            bordered
            active
            value="X"
            onClick={disableFullscreen}
            onKeyUp={disableFullscreen}
            onKeyDown={disableFullscreen}
          />
        </HudSection>
      )}

      <HudSection
        show={showFullMenu}
        className={classNames(styles['hud__controls-move'], {
          [styles['hud__controls-move-mobile']]: isMobile,
        })}
      >
        <div className={styles['hud__controls-move__w']}>
          <Keycap
            value={isMobile ? '<' : 'W'}
            active={movement.forward}
            onKeyUp={() => onMove(KeyBindings.KeyW, false)}
            onKeyDown={() => onMove(KeyBindings.KeyW, true)}
            rotate90original={isMobile}
            className={
              isMobile ? styles['hud__controls-move-mobile__front'] : ''
            }
          />
        </div>
        <div className={styles['hud__controls-move__asd']}>
          <Keycap
            value={isMobile ? '<' : 'A'}
            active={movement.left}
            onKeyUp={() => onMove(KeyBindings.KeyA, false)}
            onKeyDown={() => onMove(KeyBindings.KeyA, true)}
          />
          <Keycap
            value={isMobile ? '>' : 'S'}
            active={movement.backward}
            onKeyUp={() => onMove(KeyBindings.KeyS, false)}
            onKeyDown={() => onMove(KeyBindings.KeyS, true)}
            rotate90original={isMobile}
            className={
              isMobile ? styles['hud__controls-move-mobile__back'] : ''
            }
          />
          <Keycap
            value={isMobile ? '>' : 'D'}
            active={movement.right}
            onKeyUp={() => onMove(KeyBindings.KeyD, false)}
            onKeyDown={() => onMove(KeyBindings.KeyD, true)}
            className={
              isMobile ? styles['hud__controls-move-mobile__right'] : ''
            }
          />
        </div>
      </HudSection>

      {/**
        <HudSection show={showFullMenu} className={styles['hud__controls-look']}>
          <Keycap value="E" />
          <Keycap value="R" />
          <Keycap value="Q" />
          <Keycap value="F" />
        </HudSection>
      **/}

      {/**
        <HudSection show={showFullMenu} className={styles['hud__guide']}>
          <StatusText>press</StatusText>
          <Keycap value="Q" bordered small />
          <StatusText>for key guide</StatusText>
        </HudSection>
      **/}

      <ContentDisplay
        media={media}
        openMedia={openMedia}
        onChangeInteraction={onChangeInteraction}
      />

      <TrackDisplay
        mediaTrack={mediaTrack}
        openMedia={openMedia}
        onChangeInteraction={onChangeInteraction}
      />
    </div>
  )
}

export default Hud
