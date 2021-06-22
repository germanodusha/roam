export default {
  storage: '/content',

  ground: {
    size: [500, 500],
  },

  GUIControls: {
    archor: 'top_left',
    collapsed: false,
    defaultClosedGroups: ['Player', 'View'],
    title: 'Controls',
    width: 300,
  },

  maze: {
    showCollisions: false,
    gltf: '/gltf/maze.glb',
  },

  player: {
    speed: 5,
    radius: 0.7,
    initialPos: [-67, 2, 12],
    height: 1.2,
  },
}
