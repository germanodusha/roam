import contentCoordinatesSounds from '@/data/contentCoordinatesSounds'
// import contentCoordinatesObjects from '@/data/contentCoordinatesObjects'
// import contentExtras from '@/data/contentExtras'
import contentObjects from '@/data/contentObjects'
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
}

describe('teste media factory', () => {
  describe('create objects', () => {
    const findByAttribute = (attribute) =>
      contentObjects.find((content) => content[attribute])

    const filterByAttribute = (attribute) =>
      contentObjects.filter((content) => content[attribute])

    it('create videos', () => {
      const contents = filterByAttribute('Video')
      expect(contents.length).toBeGreaterThan(0)
      contents.forEach((contentObject) => {
        expect(contentObject).toHaveProperty('id')
        const media = MediaFactory(contentObject)
        expect(media.type).toBe(MediaTypes.VIDEO)
        expect(media).toHaveProperty('title')
        expect(media).toHaveProperty('caption')
        expect(media.src.indexOf('youtu')).toBeGreaterThan(0)
      })
    })

    it('create images', () => {
      const contents = filterByAttribute('Imagem\n(nome)')
      expect(contents.length).toBeGreaterThan(0)
      contents.forEach((contentObject) => {
        expect(contentObject).toHaveProperty('id')
        const media = MediaFactory(contentObject)
        expect(media.type).toBe(MediaTypes.IMAGE)
        expect(media).toHaveProperty('title')
        expect(media).toHaveProperty('caption')
        expect(media.src.indexOf('.png')).toBeGreaterThan(0)
      })
    })

    it('create texts', () => {
      const contents = filterByAttribute('Text')
      expect(contents.length).toBeGreaterThan(0)
      contents.forEach((contentObject) => {
        expect(contentObject).toHaveProperty('id')
        const media = MediaFactory(contentObject)
        expect(media.type).toBe(MediaTypes.TEXT)
        expect(media).toHaveProperty('title')
        expect(media).toHaveProperty('caption')
        expect(media.content.indexOf('.md')).toBeGreaterThan(0)
      })
    })

    it.todo('should have coordinates to all objects')
    // it('should have coordinates to all objects', () => {
    //   expect(contentObjects.length).toBeLessThanOrEqual(
    //     contentCoordinatesObjects.length
    //   )
    // })

    it.todo('check objects coordinates')
    // it('check objects coordinates', () => {
    //   contentCoordinatesObjects.forEach((coordinate) => {
    //     expect(coordinate).toHaveProperty('id')
    //     expect(coordinate).toHaveProperty('x')
    //     expect(coordinate).toHaveProperty('z')
    //   })
    // })
  })

  describe('create sounds', () => {
    it('check sounds coordinates', () => {
      contentCoordinatesSounds.forEach((coordinate) => {
        expect(coordinate).toHaveProperty('id')
        expect(coordinate).toHaveProperty('x')
        expect(coordinate).toHaveProperty('z')
      })
    })
  })
})
