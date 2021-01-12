const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const { VueLoaderPlugin } = require('vue-loader')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const named = ext => isDev ? `[name].${ext || '[ext]'}` : `[name].[fullhash].${ext || '[ext]'}`

const cssLoaders = extra => {
  const loaders = [{
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: ''
    }
  },
    'css-loader']

  if (extra) {
    loaders.push(extra)
  }

  return loaders
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: named('js')
  },
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimize: isProd,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: isDev,
    open: true
  },
  devtool: isDev ? 'source-map' : false,
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: named('css')
    }),
    new VueLoaderPlugin(),
    // new webpack.DefinePlugin({
    //   __VUE_OPTIONS_API__: false
    // })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: named()
            }
          }
        ]
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: named()
            }
          }
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          isDev ? 'eslint-loader' : null
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  }
}