const path = require('path');

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const mode = process.env.NODE_ENV === "development" ? "development" : "production";

module.exports = {
  entry: {
    pane: './src/pane.tsx',
  },
  externals: {
    jsonld: 'jsonld',
    URL: 'self.URL',
    // 'solid-auth-client': 'self.fetch',
    'universal-url': '{URL: self.URL}',
    'whatwg-url': 'self.URL',
    xmlhttprequest: 'self.XMLHttpRequest',
    'solid-auth-client': 'solid-auth-client'
  },
  devtool: 'cheap-eval-source-map',
  mode: mode,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: './[name].js',
    libraryTarget: "umd",
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HardSourceWebpackPlugin(),
  ],
};
