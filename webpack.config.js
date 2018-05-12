const path = require('path');

module.exports = {
  entry: './index.tsx',
  externals: {
    jsonld: '{}',
    URL: 'self.URL',
    'solid-auth-client': 'self.fetch',
    'universal-url': '{URL: self.URL}',
    'whatwg-url': 'self.URL',
    xmlhttprequest: 'self.XMLHttpRequest',
  },
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
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
    filename: './bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
