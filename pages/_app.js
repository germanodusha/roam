import Head from 'next/head'
import { Leva } from 'leva'
import useQueryString from '@/hooks/useQueryString'
import sounds from '@/data/contentExtras'
import '../styles/globals.css'

const head = {
  title: 'ROAM',
  description:
    "Created by music artists Deafbrick (Brazil/UK), Duma (Kenya) and Simon Grab (Switzerland) and with visuals and coding from Genesys (Brazil), Roam is a meta-labyrinth: a first person 3D game shaped maze composed of approximately 50 references of labyrinths taken from cinema, poetry, visual arts, philosophy, society, popular culture and mythology. The goal is to find the artists' music scattered and hidden in the game's architecture. And to get lost.",
  image: '/roam.png',
}

function MyApp({ Component, pageProps }) {
  const [controlsEnabled] = useQueryString({ key: 'showcontrols' })

  return (
    <>
      <Head>
        <title>{head.title}</title>
        <meta name={head.description} />
        <meta property="og:title" content={head.title} />
        <meta property="og:description" content={head.description} />
        <meta property="og:image" content={head.image} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {sounds.map((sound) => (
          <link
            key={sound.id}
            rel="preload"
            as="audio"
            href={`/content/${sound.Arquivo}`}
          />
        ))}
      </Head>

      <Leva collapsed hidden={!controlsEnabled} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
