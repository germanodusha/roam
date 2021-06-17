import Hud from '../../components/Hud'
import MediaCenter from '../../components/MediaCenter'
import styles from './Home.module.scss'

const Home = () => {
  return (
    <div className={styles['home']}>
      <Hud />
      <MediaCenter />
    </div>
  )
}

export default Home
