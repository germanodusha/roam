export const createDefaultMedia = ({
  id = 1,
  type,
  artist = 'artist',
  title = 'title',
  track = 'track',
  src,
  content,
}) => ({
  id,
  artist,
  type,
  title,
  track,
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
