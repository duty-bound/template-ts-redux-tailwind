const path = require('path')
const tailwindcss = require('tailwindcss')()
const autoprefixer = require('autoprefixer')()
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

// js loader
exports.jsLoader = () => ({
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.js', '.ts', '.tsx']
        },
        use: [{
          loader: 'ts-loader'
        }]
      }
    ]
  }
})

// tailwind
exports.tailwind = () => ({
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [tailwindcss]
    }
  }
})

// extractCss
exports.extractCSS = ({ options = {}, loaders = [] } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options
          },
          'css-loader'
        ].concat(loaders),
        sideEffects: true
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
})

// auto prefixing
exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [autoprefixer]
    }
  }
})

// webpack-dev-server
exports.devServer = (distPath) => ({
  devServer: {
    static: distPath,
    compress: true,
    port: 4000,
    devMiddleware: {
      writeToDisk: false // webpack-dev-server, by default, will not create files in the dist folder, but run them from memory.
      //  Set to `true` to instruct webpack-dev-server to create a copy of the files in the 'dist' folder
    }
  }
})

// copy index.html to dist folder
exports.copyIndexHtml = (distPath) => ({
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'index.html'),
          to: path.resolve(distPath, 'index.html')
        }
      ]
    })
  ]
})
