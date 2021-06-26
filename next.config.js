const withTM = require('next-transpile-modules')([
  '@react-three/fiber',
  '@react-three/drei',
  'three',
])

module.exports = withTM({
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  },
})
