import { createDefaultMedia } from '@/helpers/mock'
import { MediaTypes } from '@/helpers/constants'

const MediaFactory = (data) => {
  const isVideo = Boolean(data.Video)
  if (isVideo) {
    return createDefaultMedia({
      id: data.id,
      type: MediaTypes.VIDEO,
      title: data['Título'],
      caption: data.Legenda,
      src: data.Video,

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
      artist: data['Nome do Artista'],
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
