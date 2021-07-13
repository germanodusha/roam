import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { Scrollbars } from 'react-custom-scrollbars'
import WallBricks from '@/components/WallBricks'
import BottomButtons from '@/components/BottomButtons'
import styles from './Info.module.scss'

const Info = () => {
  const router = useRouter()

  const buttonsData = useMemo(
    () => [
      { type: 'text', text: 'press', red: true },
      {
        type: 'key',
        value: 'F',
        active: true,
        onClick: () => router.push('/howto'),
        onKeyDown: () => router.push('/howto'),
        mobile: 'ENTER',
      },
      { type: 'text', text: 'to enter roam or', red: true },
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
    [router.push]
  )

  return (
    <WallBricks className={styles['info']}>
      <Scrollbars universal autoHide>
        <div className={styles['info__scroll']}>
          <h1>roam</h1>

          <div className={styles['info__text']}>
            The feeling of loss and dread, the chaos, the despair of the present
            time, the crisis of anxiety, the void, seems to scream out loud and
            everywhere: Where to now?
            <br />
            It is based on this question that concerns many current issues (and
            at various levels and nuances) that Novas Frequências has
            conceptually organized itself for the In/Out Festival. Our two
            programming proposals for the event deal directly with the subject
            and work as a pilot, a teaser experience, for something wider at the
            end of the year during the 11th edition of Novas Frequências
            Festival, scheduled to happen in December 2021.
            <br />
            --
            <br />
            A mismatch of situations experienced and not understood and that
            bewilder the human being, the labyrinth is one of the perfect
            representations - if not the best - of the feeling of being lost
            (and, at the same time, of finding oneself).
            <br />
            Created by music artists Deafbrick (Brazil/UK), Duma (Kenya) and
            Simon Grab (Switzerland) and visual artist and programmer Genesys
            (Brazil), Roam is a meta-labyrinth: a first person 3D game shaped
            maze composed of approximately 50 references of labyrinths taken
            from cinema, poetry, visual arts, philosophy, society, popular
            culture and mythology. The goal is to find the artists' music
            scattered and hidden in the game's architecture. And to get lost.
          </div>

          <BottomButtons
            className={styles['info__status']}
            data={buttonsData}
          />
        </div>
      </Scrollbars>
    </WallBricks>
  )
}

export default Info
