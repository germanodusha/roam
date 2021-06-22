export const createDefaultMedia = ({ id = 1, type, src, content }) => ({
  id,
  type,
  title: 'title',
  track: 'a',
  album: '',
  src,
  model3d: 'something',
  content,
})
