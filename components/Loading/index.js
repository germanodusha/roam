import { useRef, useEffect, useState } from 'react'
import Head from 'next/head'
import { useProgress } from '@react-three/drei'
import classNames from 'classnames'
import WallBricks from '@/components/WallBricks'
import { useStore } from '../../store'
import styles from './Loading.module.scss'

const Loading = () => {
  const [show, setShow] = useState(true)
  const audio = useRef()
  const { init } = useStore((state) => state.actions)
  const backgroundAudio = useStore(({ state }) => state.backgroundAudio)
  const { active, loaded, progress } = useProgress()

  const isLoading = active || loaded === 0

  const onClick = () => {
    if (isLoading) return
    init()
    setShow(false)
    audio.current.play()
  }

  useEffect(() => {
    if (!audio.current) return
    audio.current.volume = 0.15
  }, [audio])

  useEffect(() => {
    if (!audio.current) return

    if (backgroundAudio) {
      audio.current.play()
    } else {
      audio.current.pause()
    }
  }, [audio, backgroundAudio])

  return (
    <>
      <Head>
        <link rel="preload" as="audio" href="/content/bgsound.mp3" />
      </Head>

      <audio ref={audio} autoPlay loop src="/content/bgsound.mp3" />

      {show && (
        <WallBricks
          onClick={onClick}
          className={classNames(styles['loading'], {
            [styles['loading__pointer']]: !isLoading,
          })}
        >
          <div className={classNames(styles['loading__title'])}>
            {isLoading ? parseInt(progress) + '%' : 'play'}
          </div>
          <div className={classNames(styles['loading__disclaimer'])}>
            <span>Loading... Please wait</span>
            <span>
              ROAM IS TO BE EXPERIENCED ON DESKTOP, AND DEMANDS UPDATED SYSTEMS
              AND BROWSERS (SAFARI MAY BE A PROBLEM)
            </span>
          </div>
        </WallBricks>
      )}
    </>
  )
}

export default Loading
