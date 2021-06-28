import { MediaTypes } from '@/helpers/constants'
import { createDefaultMedia } from '@/helpers/mock'

const medias = [
  null,

  createDefaultMedia({
    id: 1,
    type: MediaTypes.TEXT,
    title: 'The Labyrinth of Crete:\nThe Myth Of The\nMinotaur',
    caption: 'HTTPS://WWW.EXPLORECRETE.COM/HISTORY/LABYRINTH MINOTAUR.HTM',
  }),

  createDefaultMedia({
    id: 1,
    type: MediaTypes.VIDEO,
    title: 'The Labyrinth of Crete:\nThe Myth Of The\nMinotaur',
    caption: 'HTTPS://WWW.EXPLORECRETE.COM/HISTORY/LABYRINTH MINOTAUR.HTM',
  }),

  createDefaultMedia({
    id: 1,
    type: MediaTypes.IMAGE,
    title: 'The Labyrinth of Crete:\nThe Myth Of The\nMinotaur',
    caption: 'HTTPS://WWW.EXPLORECRETE.COM/HISTORY/LABYRINTH MINOTAUR.HTM',
  }),
]

export default medias
