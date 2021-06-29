import contentCoordinatesSounds from '@/data/contentCoordinatesSounds'
// import contentCoordinatesObjects from '@/data/contentCoordinatesObjects'
import contentExtras from '@/data/contentExtras'
import contentObjects from '@/data/contentObjects'
import { MediaTypes } from '@/helpers/constants'
import MediaFactory from '@/helpers/mediaFactory'

describe('teste media factory', () => {
  describe('create objects', () => {
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
    it('create sounds', () => {
      expect(contentExtras.length).toBeGreaterThan(0)
      contentExtras.forEach((contentExtra) => {
        expect(contentExtra).toHaveProperty('id')
        const media = MediaFactory(contentExtra)
        expect(media.type).toBe(MediaTypes.TRACK)
        expect(media).toHaveProperty('title')
        expect(media).toHaveProperty('track')
        expect(media.src.indexOf('.mp3')).toBeGreaterThan(0)
      })
    })

    it('check sounds coordinates', () => {
      contentCoordinatesSounds.forEach((coordinate) => {
        expect(coordinate).toHaveProperty('id')
        expect(coordinate).toHaveProperty('x')
        expect(coordinate).toHaveProperty('z')
      })
    })
  })
})
