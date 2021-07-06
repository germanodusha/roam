import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { Scrollbars } from 'react-custom-scrollbars'
import { isMobile } from 'react-device-detect'
import classNames from 'classnames'
import WallBricks from '@/components/WallBricks'
import BottomButtons from '@/components/BottomButtons'
import styles from './Howto.module.scss'

const Helper = ({ children }) => {
  return (
    <span
      className={classNames('key-helper', `key-${children.toLowerCase()}`, {
        'key-no-helper': isMobile,
      })}
    >
      {children}

      <style jsx>
        {`
          .key-no-helper {
            display: none;
          }
          .key-helper {
            font-size: 4em;
            font-weight: 900;
          }
          .key-w {
            transform: translateX(2.5%);
          }
          .key-a {
            transform: translateX(-50%);
          }
          .key-s {
            transform: translateX(2.5%);
          }
          .key-d {
            transform: translateX(50%);
          }
        `}
      </style>
    </span>
  )
}

const Arrow = ({ children, rotate90 = false }) => {
  return (
    <span
      className={classNames('key-arrow', {
        rotate90: rotate90,
        'key-arrow-bigger': isMobile,
      })}
    >
      {children}

      <style jsx>
        {`
          .key-arrow {
            font-size: 4em;
            font-weight: 900;
          }
          .key-arrow-bigger {
            scale: 1.5;
          }
          .rotate90 {
            transform: rotate(90deg);
          }
        `}
      </style>
    </span>
  )
}

const Arrows = () => {
  return (
    <div className="root">
      <div className="center up">
        <Helper>W</Helper>
        <Arrow rotate90>{'<'}</Arrow>
      </div>
      <div className="controls-line">
        <div>
          <Helper>A</Helper>
          <Arrow>{'<'}</Arrow>
        </div>
        <div className="spacer" />
        <div className="cell-d">
          <Arrow>{'>'}</Arrow>
          <Helper>D</Helper>
        </div>
      </div>
      <div className="center down">
        <Arrow rotate90>{'>'}</Arrow>
        <Helper>S</Helper>
      </div>

      <style jsx>
        {`
          div {
            position: relative;
            display: flex;
            text-shadow: 0 0 5px red;
            filter: blur(1.1px);
            flex-direction: column;
          }
          .controls-line {
            display: flex;
            flex-direction: row;
            transform: translateY(5%);
          }
          .controls-line > div {
            display: flex;
            flex-direction: row;
            align-items: center;
          }
          .spacer {
            width: 4em;
          }
          .cell-d {
            transform: translateX(${isMobile ? '55%' : '10%'});
          }
          .center {
            text-align: center;
          }
        `}
      </style>
    </div>
  )
}

const Howto = () => {
  const router = useRouter()

  const buttonsData = useMemo(
    () => [
      { type: 'text', text: 'press', red: true },
      {
        type: 'key',
        value: 'F',
        active: true,
        onClick: () => router.push('/play'),
        onKeyDown: () => router.push('/play'),
        mobile: 'ENTER',
      },
      { type: 'text', text: 'to enter site or', red: true },
      {
        type: 'key',
        value: 'E',
        active: true,
        onClick: () => router.back(),
        onKeyDown: () => router.back(),
        mobile: 'BACK',
      },
      { type: 'text', text: 'to go back', red: true },
    ],
    [router]
  )

  return (
    <WallBricks className={styles['howto']}>
      <Scrollbars className={styles['howto__scroll']} universal autoHide>
        <div className={styles['howto__scroll--inner']}>
          <div className={styles['howto__title']}>
            <h3>How to travel in</h3>
            <span>roam</span>
          </div>

          <div className={styles['howto__content']}>
            <div className={styles['howto__content__section']}>
              <div className={styles['howto__content__section--inner']}>
                <Arrows />
              </div>

              <span className={styles['howto__description']}>
                these are your legs
              </span>
            </div>

            <div className={styles['howto__content__section']}>
              <div className={styles['howto__content__section--inner']}>
                <span className={styles['howto__content__section--bold']}>
                  use your
                  {isMobile ? ' phone screen' : ' mouse'}
                  <br />
                  to change
                  <br />
                  vision
                </span>
                <span className={styles['howto__content__section--spacer']} />
                {isMobile ? (
                  <img src="/assets/images/Finger360.png" />
                ) : (
                  <img src="/assets/images/Mouse360.png" />
                )}
                <span className={styles['howto__content__section--desc']}>
                  explore the maze in 360º
                </span>
              </div>

              <span className={styles['howto__description']}>
                this is your head
              </span>
            </div>
          </div>

          <BottomButtons
            className={styles['howto__status']}
            data={buttonsData}
          />
        </div>
      </Scrollbars>
    </WallBricks>
  )
}

export default Howto
