const webpack = require("webpack");
const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
// const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader')
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const {
  dependencies,
  rendererPath,
  tsconfig,
  template,
  target,
  isDev,
} = require("./env");

module.exports = {
  plugins: [new ForkTsCheckerWebpackPlugin()],
  entry: {
    renderer: `${rendererPath}/index.ts`,
    vendor: Object.keys(dependencies),
  },
  output: {
    path: target,
    filename: "[name].js",
  },

  devServer: {
    port: 3000,
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: isDev && "inline-source-map",
  resolve: {
    extensions: [".ts", ".js"],
    // plugins: [new TsConfigPathsPlugin()],
    plugins: [new TsconfigPathsPlugin()],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlPlugin({
      title: "Electron",
      filename: "index.html",
      template,
    }),
    // new CheckerPlugin(),
    // new webpack.optimize.CommonsChunkPlugin("vendor"),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
  module: {
    rules: [
      // All files with a '.ts' extension will be handled by 'awesome-typescript-loader'.
      // { test: /\.ts$/, use: ["awesome-typescript-loader"] },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: [/node_modules/],
        options: { transpileOnly: true },
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        test: /\.js$/,
        enforce: "pre",
        exclude: [/node_modules/],
        use: "source-map-loader",
      },
    ],
  },
  target: "electron-renderer",
  devServer: {
    stats: "minimal",
  },
};
