import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useControls } from 'leva'
import { useStore } from '../../store'
import Keycap from '@/components/Keycap'
import { MediaTypes } from '@/helpers/constants'
import useDesappearState from '@/hooks/useDesappearState'
import StatusText from '@/components/StatusText'
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

  return (
    <HudSection show={show} className={styles['hud__interaction']}>
      <h1 className={styles['red']}>{state.title}</h1>
      <div>
        <StatusText red>press</StatusText>
        <Keycap
          inverted
          bordered
          small
          value="F"
          onKeyDown={() => media && openMedia(media)}
          className={styles['hud__interaction__keycap']}
        />
        <StatusText red>to open it or</StatusText>
        <Keycap
          inverted
          bordered
          small
          value="E"
          onKeyDown={() => onChangeInteraction(null)}
          className={styles['hud__interaction__keycap']}
        />
        <StatusText red>to ignore</StatusText>
      </div>
    </HudSection>
  )
}

const TrackDisplay = ({ mediaTrack }) => {
  const [state, show] = useDesappearState({ stateToPersist: mediaTrack })
  const { formatedTime } = useStore((store) => store.state)

  return (
    <HudSection show={show} className={styles['hud__interaction']}>
      <h1>{state.media?.artist}</h1>
      <h3>{state.media?.title}</h3>
      <img
        src="/assets/images/Icon-Track.png"
        className={styles['hud__interaction__icon']}
      />
      <span className={styles['hud__interaction__time']}>{formatedTime}</span>
      {false && (
        <div>
          <StatusText>use</StatusText>
          <Keycap
            bordered
            small
            value="Q"
            onKeyDown={() => console.log('q pressed')}
          />
          <StatusText>for play/pause and</StatusText>
          <Keycap
            inverted
            bordered
            small
            value="+"
            onKeyDown={() => console.log('+ pressed')}
          />
          <Keycap
            inverted
            bordered
            small
            value="-"
            onKeyDown={() => console.log('- pressed')}
          />
          <StatusText>for volume</StatusText>
        </div>
      )}
    </HudSection>
  )
}

const Hud = () => {
  const [media, setMedia] = useState(false)
  const [mediaTrack, setMediaTrack] = useState(false)
  const { openMedia, onChangeInteraction } = useStore((store) => store.actions)
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
        <span>{counter.main}</span>
        <img src="/assets/images/stats-contents-visited.png" />

        <div className={styles['hud__stats__spacer']} />

        <span>{counter.extra}</span>
        <img src="/assets/images/stats-tracks-visited.png" />
      </HudSection>

      {/**
      <HudSection show={showFullMenu} className={styles['hud__icon']}>
        // TODO icon
      </HudSection>
      **/}

      <HudSection show={showFullMenu} className={styles['hud__controls-move']}>
        <div className={styles['hud__controls-move__w']}>
          <Keycap value="W" active={movement.forward} />
        </div>
        <div className={styles['hud__controls-move__asd']}>
          <Keycap value="A" active={movement.left} />
          <Keycap value="S" active={movement.backward} />
          <Keycap value="D" active={movement.right} />
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

      <HudSection show={showFullMenu} className={styles['hud__guide']}>
        <StatusText>press</StatusText>
        <Keycap value="Q" bordered small />
        <StatusText>for key guide</StatusText>
      </HudSection>

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
