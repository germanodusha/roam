import { Leva } from 'leva'
import useQueryString from '@/hooks/useQueryString'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [controlsEnabled, hideControls] = useQueryString({ key: 'showcontrols' })

  return (
    <>
      <Leva hidden={!controlsEnabled} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
