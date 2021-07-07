import { useRef, useEffect } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import classNames from 'classnames'
import ReactMarkdown from 'react-markdown'
import styles from './TextMedia.module.scss'
import StatusText from '@/components/StatusText'
import Keycap from '@/components/Keycap'
import useKeyPressEvent from '../../hooks/useKeyPressEvent'

const TextMedia = ({ appear, markdowns, media }) => {
  const scrollbars = useRef()

  const updateScroll = (value) => {
    if (!scrollbars.current) return

    const current = scrollbars.current.getScrollTop()
    scrollbars?.current?.scrollTop(current + value)
  }

  useKeyPressEvent({
    key: 'ArrowUp',
    onKeyDown: () => updateScroll(-30),
  })

  useKeyPressEvent({
    key: 'ArrowDown',
    onKeyDown: () => updateScroll(+30),
  })

  // const { enableLocker, disableLocker } = useStore((store) => store.actions)

  // useEffect(() => {
  //   disableLocker()

  //   return () => { enableLocker() }
  // }, [enableLocker, disableLocker])

  useEffect(() => {
    if (!scrollbars.current) return
  }, [scrollbars])

  return (
    <>
      <div
        className={classNames(
          styles['text-media__status'],
          styles['text-media__status__actions']
        )}
      >
        <StatusText>press</StatusText>
        <Keycap value="<" bordered small rotate90 />
        <Keycap value=">" bordered small rotate90 />
        <StatusText>for scroll</StatusText>
      </div>

      <Scrollbars
        autoHide
        universal
        ref={scrollbars}
        className={classNames(styles['text-media'], {
          [styles['text-media-show']]: appear,
        })}
      >
        <div className={classNames(styles['text-media__inner'])}>
          <ReactMarkdown>{markdowns[media.content]}</ReactMarkdown>
        </div>
      </Scrollbars>
    </>
  )
}

export default TextMedia
