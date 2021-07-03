import { useRouter } from 'next/router'
import WallBricks from '@/components/WallBricks'
import Keycap from '@/components/Keycap'
import StatusText from '@/components/StatusText'
import styles from './Howto.module.scss'

const Arrows = () => {
  return (
    <div className="root">
      <div className="center up">
        <span className="key-helper key-w">W</span>
        <span className="key-arrow rotate90">{'<'}</span>
      </div>
      <div className="controls-line">
        <div>
          <span className="key-helper key-a">A</span>
          <span className="key-arrow">{'<'}</span>
        </div>
        <div className="spacer" />
        <div className="cell-d">
          <span className="key-arrow">{'>'}</span>
          <span className="key-helper key-d">D</span>
        </div>
      </div>
      <div className="center down">
        <span className="key-arrow rotate90">{'>'}</span>
        <span className="key-helper key-s">S</span>
      </div>

      <style jsx>
        {`
          div {
            position: relative;
            display: flex;
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
          .key-arrow {
            font-size: 4em;
            font-weight: 900;
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
          .cell-d {
            transform: translateX(10%);
          }
          .up {
          }
          .down {
          }
          .rotate90 {
            transform: rotate(90deg);
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

  return (
    <WallBricks className={styles['howto']}>
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
              use your mouse
              <br />
              to change
              <br />
              vision
            </span>
            <span className={styles['howto__content__section--spacer']} />
            <img src="/assets/images/Mouse360.png" />
            <span className={styles['howto__content__section--desc']}>
              explore the maze in 360º
            </span>
          </div>

          <span className={styles['howto__description']}>
            this is your head
          </span>
        </div>
      </div>

      <div className={styles['howto__status']}>
        <StatusText red>press</StatusText>
        <Keycap
          small
          active
          bordered
          value="f"
          onClick={() => router.push('/play')}
          onKeyDown={() => router.push('/play')}
        />
        <StatusText red>to enter site or</StatusText>
        <Keycap
          small
          active
          bordered
          value="e"
          onClick={() => router.back()}
          onKeyDown={() => router.back()}
        />
        <StatusText red>to go back</StatusText>
      </div>
    </WallBricks>
  )
}

export default Howto
