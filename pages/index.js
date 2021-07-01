import Link from 'next/link'
import WallBricks from '@/components/WallBricks'
import styles from './index.module.scss'

const Index = () => {
  return (
    <WallBricks className={styles['index']}>
      <h1>the maze</h1>
      <Link href="/play">
        <a>press Q to enter</a>
      </Link>
      <div>novas frequencias in out festival 2020</div>
    </WallBricks>
  )
}

export default Index
