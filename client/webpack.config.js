/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: ['/node_modules'],
      },
      {
        test: /\.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: {
          loader: 'url-loader',
          options: {
            esModule: false,
            limit: 8192,
            name: 'assets/[name]?[hash].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: { minimize: true },
  output: {
    publicPath: '/',
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    publicPath: '/',
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.js', '.json', '.scss'],
  },
  devtool: 'source-map',
};
