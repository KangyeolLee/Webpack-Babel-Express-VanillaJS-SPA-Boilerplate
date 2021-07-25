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
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './assets/',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/i,
        use: {
          loader: 'url-loader',
          options: {
            name: 'assets/[hash].[ext]',
            limit: 5000,
            esModule: false,
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
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.js', '.json', '.scss'],
  },
  devtool: 'source-map',
};
