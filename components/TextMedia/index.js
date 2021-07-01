import { Scrollbars } from 'react-custom-scrollbars'
import classNames from 'classnames'
import ReactMarkdown from 'react-markdown'
import styles from './TextMedia.module.scss'

const TextMedia = ({ appear, markdowns, media }) => {
  // const { enableLocker, disableLocker } = useStore((store) => store.actions)

  // useEffect(() => {
  //   disableLocker()

  //   return () => { enableLocker() }
  // }, [enableLocker, disableLocker])

  return (
    <Scrollbars
      autoHide
      universal
      className={classNames(styles['text-media'], {
        [styles['text-media-show']]: appear,
      })}
    >
      <div className={classNames(styles['text-media__inner'])}>
        <ReactMarkdown>{markdowns[media.content]}</ReactMarkdown>
      </div>
    </Scrollbars>
  )
}

export default TextMedia
