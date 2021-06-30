import { createDefaultMedia } from '@/helpers/mock'
import { MediaTypes } from '@/helpers/constants'

const getYoutubeId = (url) => {
  const isShortUrl = url.indexOf('/watch') < 0
  if (isShortUrl) {
    const splited = url.split('/')
    const code = splited[splited.length - 1]

    return code
  }

  const [, params] = url.split('v=')
  const [code] = params.split('&')

  return code
}

const MediaFactory = (data) => {
  if (!data) return null

  const isVideo = Boolean(data.Video)
  if (isVideo) {
    return createDefaultMedia({
      id: data.id,
      type: MediaTypes.VIDEO,
      title: data['Título'],
      caption: data.Legenda,
      src: getYoutubeId(data.Video),

      artist: null,
      track: null,
      album: null,
      content: null,
    })
  }

  const isImage = Boolean(data['Imagem\n(nome)'])
  if (isImage) {
    return createDefaultMedia({
      id: data.id,
      type: MediaTypes.IMAGE,
      title: data['Título'],
      caption: data.Legenda,
      src: `/content/${data['Imagem\n(nome)']}`,

      artist: null,
      track: null,
      album: null,
      content: null,
    })
  }

  const isText = Boolean(data.Text)
  if (isText) {
    return createDefaultMedia({
      id: data.id,
      type: MediaTypes.TEXT,
      title: data['Título'],
      caption: data.Legenda,
      content: data.Text,

      artist: null,
      track: null,
      album: null,
      src: null,
    })
  }

  const isTrack = Boolean(data.Arquivo)
  if (isTrack) {
    return createDefaultMedia({
      id: data.id,
      type: MediaTypes.TRACK,
      artist: data['Nome do artista'],
      title: data['Título da track'],
      src: `/content/${data.Arquivo}`,

      caption: null,
      content: null,
      track: null,
      album: null,
    })
  }
}

export default MediaFactory
