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

export const createDefaultInteraction = ({ media, showDismiss = true }) => ({
  title: 'YOU FOUND AN OBJECT\nWISH TO OPEN IT?',
  media,
  showDismiss,
})
