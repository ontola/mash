const path = require('path');

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const mode = process.env.NODE_ENV === "development" ? "development" : "production";

const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    plugins: [
      '@babel/plugin-transform-react-display-name',
    ],
    presets: [
      "@babel/preset-react",
      "@babel/preset-env"
    ]
  }
};

const base = {
  entry: {
    bundle: './src/index.ts',
    pane: './src/pane.tsx',
  },
  externals: {
    jsonld: 'jsonld',
    URL: 'self.URL',
    'universal-url': '{URL: self.URL}',
    'whatwg-url': 'self.URL',
    xmlhttprequest: 'self.XMLHttpRequest',
    'solid-auth-cli': 'solid-auth-client',
  },
  devtool: 'cheap-eval-source-map',
  mode: mode,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          babelLoader,
          {
            loader: 'ts-loader'
          }
        ],
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
    // new BundleAnalyzerPlugin(),
  ],
}

module.exports = [
  // {
  //   ...base,
  //   entry: {
  //     bundle: './src/index.tsx',
  //   },
  // },
  // {
  //   ...base,
  //   entry: {
  //     basePane: './src/panes/base.tsx',
  //   },
  //   mode: 'production',
  //   devtool: 'cheap-source-map',
  //   externals: {
  //     ...base.externals,
  //     '@ontologies/core': '@ontologies/core',
  //     react: 'react',
  //     'react-dom': 'react-dom',
  //     'link-lib': 'link-lib',
  //     'link-redux': 'link-redux',
  //     rdflib: 'rdflib',
  //     'solid-auth-client': 'solid-auth-client',
  //     'solid-auth-cli': 'solid-auth-cli',
  //     'solid-rest': 'solid-rest',
  //   },
  //   output: {
  //     ...base.output,
  //     libraryTarget: 'commonjs2',
  //   },
  // },
  {
    ...base,
    devtool: 'source-map',
    entry: {
      pane: './src/pane.ts',
    },
    mode: 'production',
    externals: {
      ...base.externals,
     rdflib: 'rdflib',
      'solid-auth-client': 'solid-auth-client',
      'solid-auth-cli': 'solid-auth-cli',
     'solid-rest': 'solid-rest',
    },
    output: {
       ...base.output,
       libraryTarget: 'commonjs2',
     },
     plugins: [
       new HardSourceWebpackPlugin(),
       // new BundleAnalyzerPlugin(),
     ]
   },
];
