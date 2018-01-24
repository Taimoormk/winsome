var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob-all');
var PurifyCSSPlugin = require('purifycss-webpack');

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: __dirname,
    filename: 'dist/js/bundle.js'
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: ['transform-object-rest-spread']
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            }
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            },
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    }),
    new ExtractTextPlugin({
      filename: './dist/css/styles.css'
    }),
    new PurifyCSSPlugin({
      paths: glob.sync([
        path.join(__dirname, 'dist/index.html'),
        path.join(__dirname, 'src/js/*.js')
      ])
    })
  ]
}