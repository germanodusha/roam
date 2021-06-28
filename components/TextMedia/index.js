import { Scrollbars } from 'react-custom-scrollbars'
import classNames from 'classnames'
import ReactMarkdown from 'react-markdown'
import styles from './TextMedia.module.scss'
import sampleText from '../../data/texts/sample.md'

const TextMedia = ({ appear }) => {
  return (
    <Scrollbars
      autoHide
      universal
      className={classNames(styles['text-media'], {
        [styles['text-media-show']]: appear,
      })}
    >
      <div className={classNames(styles['text-media__inner'])}>
        <ReactMarkdown>{sampleText}</ReactMarkdown>
      </div>
    </Scrollbars>
  )
}

export default TextMedia
