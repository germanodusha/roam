export default {
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
    gltf: '/gltf/maze_v1.glb',
  },

  player: {
    speed: 5,
    radius: 1.5,
    initialPos: [9.8, 1.5, -124],
  },
}
