const path = require('path');
const copy = require('copy-webpack-plugin');

module.exports = (env, argv) =>  {
  const dev = argv.mode === 'development';
  return {

    // Map source files for better errors
    devtool: 'source-map',
    entry: {
      bundle: [
        '@babel/polyfill',
        './src/index.js'
      ],
      sw: './src/serviceWorker.js'
    },
    output: {
      path: path.join(__dirname, dev ? './devBuild' : './build'),
      filename: '[name].js',
      publicPath: '/'
    },
    devServer: {
      contentBase: path.join(__dirname, './src'),
      watchContentBase: true,
      compress: true,
      port: 3000,

      // Show client errors in browser
      overlay: {
        warnings: true,
        errors: true
      },

      // Allow React Router to use URLS
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [
            /node_modules/,
          ],
          loader: 'babel-loader',
          query: {
            presets: [
              '@babel/preset-react',
              [
                '@babel/preset-env',
                {
                  'include': [
                    '@babel/plugin-proposal-object-rest-spread'
                  ],
                  'targets': {
                    'node': '10'
                  }
                }
              ],
            ],
          },
        },
        {

          // Watch html files
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: true,
              removeComments: false,
            }
          }
        },
        {
          test: /\.(css|scss)$/,
          use: [
            require.resolve('style-loader'),
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            },
          ]
        }
      ],
    },
    plugins: [

      // Copy static html specific files to build folder
      new copy([
        {
          from: './src/public',
          to: path.join(__dirname, dev ? './devBuild' : './build'),
        },
      ]),
    ],
  };
};