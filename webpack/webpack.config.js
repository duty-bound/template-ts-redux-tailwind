const { merge } = require('webpack-merge')
const path = require('path')
const parts = require('./webpack.parts')

const distPath = path.resolve(__dirname, '..', 'dist')
const cssLoaders = [parts.autoprefix(), parts.tailwind()]

const commonConfig = merge([
  { entry: path.resolve(__dirname, '..', 'src', 'index.tsx') },
  {
    output: {
      path: distPath,
      filename: 'index_bundle.js'
    }
  },
  parts.jsLoader(),
  parts.extractCSS({ loaders: cssLoaders }),
  parts.copyIndexHtml(distPath)
])

const developmentConfig = parts.devServer(distPath)

const getConfig = (mode) => {
  switch (mode) {
    case 'development':
      return merge(commonConfig, developmentConfig, { mode })
    case 'production':
      return merge(commonConfig, { mode })
    default:
      throw new Error(`Trying to use an unkown mode: ${mode}`)
  }
}

module.exports = (env, argv) => getConfig(argv.mode)
