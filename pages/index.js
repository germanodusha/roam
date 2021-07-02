import Link from 'next/link'
import { useRouter } from 'next/router'
import WallBricks from '@/components/WallBricks'
import Keycap from '@/components/Keycap'
import StatusText from '@/components/StatusText'
import styles from './index.module.scss'

const Index = () => {
  const router = useRouter()

  return (
    <WallBricks className={styles['index']}>
      <h1>roam</h1>
      <Link href="/info">
        <a>
          <StatusText red>press</StatusText>
          <Keycap
            small
            active
            bordered
            value="q"
            onKeyDown={() => router.push('/info')}
          />

          <StatusText red>to enter roam</StatusText>
        </a>
      </Link>

      <div className={styles['index__logos']}>
        <img
          className={styles['index__logos-nf']}
          src="/assets/images/Logo Novas Frequencias.png"
        />
        <img
          className={styles['index__logos-inout']}
          src="/assets/images/Logo In Out.png"
        />
        <img
          className={styles['index__logos-prohelvetia']}
          src="/assets/images/Logo-Prohelvetia.png"
        />
      </div>
    </WallBricks>
  )
}

export default Index
