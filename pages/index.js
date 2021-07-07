import { useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import WallBricks from '@/components/WallBricks'
import BottomButtons from '@/components/BottomButtons'
import styles from './index.module.scss'

const Index = () => {
  const router = useRouter()

  const buttonsData = useMemo(
    () => [
      { type: 'text', text: 'press', red: true },
      {
        type: 'key',
        value: 'F',
        active: true,
        onClick: () => router.push('/info'),
        onKeyDown: () => router.push('/info'),
        mobile: 'ENTER',
      },
      { type: 'text', text: 'to enter roam', red: true },
    ],
    [router.push]
  )

  return (
    <WallBricks className={styles['index']}>
      <div className={styles['index__main']}>
        <h1>roam</h1>
        <Link href="/info">
          <a>
            <BottomButtons
              className={styles['index__bottom-actions']}
              data={buttonsData}
            />
          </a>
        </Link>
      </div>

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
