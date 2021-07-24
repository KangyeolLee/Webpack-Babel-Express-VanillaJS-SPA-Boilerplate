const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        use: {
          loader: "babel-loader",
        },
        exclude: ["/node_modules"],
      },
      {
        test: /\.html&/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: ture },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: ["css-loader", "sass-loader"],
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)/,
        use: {
          laoder: "file-loader",
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  optimization: { minimize: true },
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "[name].js",
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  resolve: {
    modules: [path.join(__dirname), "node_modules"],
    extensions: [".ts", ".js", ".json", ".scss"],
  },
  devtool: "source-map",
};
