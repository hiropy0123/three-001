const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 'production' か 'development' を指定
const MODE = 'development';

const enabledSourceMap = MODE === 'development';

module.exports = {
  mode: MODE,

  entry: './src/index.js',
  output: {
    filename: `bundle.js`,
    path: `${__dirname}/dist`
  },

  module: {
    rules: [{
        test: /\.css$/,
        use: ['css-loader', 'style-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          // CSSをバンドルするための機能
          {
            loader: 'css-loader',
            options: {
              // オプションでCSS内のurl()メソッドの取り込みを禁止する
              url: false,
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,

              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 0
            }
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // Babel のオプションを指定する
        options: {
          presets: ['@babel/preset-env']
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.json']
  },
  plugins: [
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: `${__dirname}/static/*`,
    //       to: `${__dirname}/dist/`,
    //       flatten: true
    //     }
    //   ]
    // }),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.html`
    })
  ],
  performance: {
    hints: false,
    maxAssetSize: 30000,
    maxEntrypointSize: 1000
  },
  // Configuration for dev server
  devServer: {
    contentBase: `${__dirname}/dist/`,
    watchContentBase: true,
    open: true,
    port: 3200
  }
};