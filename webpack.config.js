const path = require('path')

module.exports = {
  entry: './src/cookie-consent.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'cookie-consent.js',
    libraryExport: 'default',
    library: 'CookieConsent',
    libraryTarget: 'umd'
  },
  mode: 'production',
  // devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          configFile: './.eslintrc.json',
          cache: false
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  optimization: {
    minimize: true
  }
}
