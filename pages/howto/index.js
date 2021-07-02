import { useRouter } from 'next/router'
import WallBricks from '@/components/WallBricks'
import Keycap from '@/components/Keycap'
import StatusText from '@/components/StatusText'
import styles from './Howto.module.scss'

const Howto = () => {
  const router = useRouter()

  return (
    <WallBricks className={styles['howto']}>
      <h3>
        How to travel in <span className={styles['howto__title']}>roam</span>
      </h3>

      <div className={styles['howto__content']}>
        <div className={styles['howto__content__section']}>
          <div className={styles['howto__content__section--inner']}>
            <div className={styles['howto__content__section__controls']}>W</div>

            <div
              className={
                styles[
                  'howto__content__section__controls howto__controls--horizontal'
                ]
              }
            >
              <span>A</span>
              <span>D</span>
            </div>

            <div className={styles['howto__content__section__controls']}>S</div>
          </div>

          <span>these are your legs</span>
        </div>

        <div className={styles['howto__content__section']}>
          <div className={styles['howto__content__section--inner']}>
            <span>Use your mouse to change vision</span>
            <img src="/public/assets/images/cursor.png" />
            <span>explore the maze in 360º</span>
          </div>

          <span>this is your head</span>
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
          value="q"
          onClick={() => router.back()}
          onKeyDown={() => router.back()}
        />
        <StatusText red>to go back</StatusText>
      </div>
    </WallBricks>
  )
}

export default Howto
