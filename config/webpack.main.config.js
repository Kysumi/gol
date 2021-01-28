const webpack = require("webpack");
const HtmlPlugin = require("html-webpack-plugin");
// const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader');
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const { mainPath, target, isDev } = require("./env");

module.exports = {
  entry: {
    main: `${mainPath}/index.ts`,
  },
  output: {
    path: target,
    filename: "[name].js",
    publicPath: "/",
    devtoolModuleFilenameTemplate: "file:///[absolute-resource-path]",
  },
  node: {
    __dirname: false,
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: isDev && "inline-source-map",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".js"],
    // plugins: [new TsconfigPathsPlugin()],
    plugins: [new TsconfigPathsPlugin()],
  },
  // plugins: [new CheckerPlugin()],
  module: {
    rules: [
      // All files with a '.ts' extension will be handled by 'awesome-typescript-loader'.
      // { test: /\.ts$/, use: ["awesome-typescript-loader"] },
      { test: /\.tsx?$/, loader: "ts-loader", exclude: "/node_modules/" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/, enforce: "pre", use: "source-map-loader" },
    ],
  },
  target: "electron-main",
  // target: "browserslist:modern",
};