const path = require('path')
const bundleOutputDir = './dist';
let copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, bundleOutputDir),
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    contentBase: bundleOutputDir
  },
  plugins: [
    //files to be copied into the build
    new copyWebpackPlugin([{from: 'public/'}])
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [['@babel/env']]
          }
        }
      },
      {test: /\.html$/i, use: 'html-loader'},
      {
        test: /\.(jpg|png|gif|svg|pdf|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name]-[hash:8].[ext]'
            },
          },
        ]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  }
};