import { Scrollbars } from 'react-custom-scrollbars'
import { useStore } from '../../store'
import styles from './TextMedia.module.scss'

const TextMedia = () => {
  const { activeMedia } = useStore((store) => store.state)

  return (
      <Scrollbars universal className={styles["text-media"]}>
        {activeMedia.content.map((content) => (
          <p>{content}</p>
        ))}
      </Scrollbars>
  )
}

export default TextMedia

