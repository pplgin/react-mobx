var path = require("path");
var webpack = require("webpack");
var precss = require("precss");
var autoprefixer = require("autoprefixer");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: [
    "react-hot-loader/patch",
    "babel-polyfill",
    "whatwg-fetch",
    "webpack-dev-server/client?http://localhost:3000",
    "webpack/hot/only-dev-server",
    "./src/index"
  ],
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "app.[hash].js"
  },
  devtool: "eval",
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      query: {
        presets: [
          ["es2015", {
            modules: false
          }],
          "stage-0",
          "react"
        ],
        plugins: [
          "transform-async-to-generator",
          "transform-decorators-legacy"
        ]
      }
    }, {
      test: /\.scss|css$/,
      loader: "style-loader!css-loader!postcss-loader!resolve-url-loader!sass-loader?sourceMap"
    }]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      hash: false,
      template: "./index.hbs"
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/,
      debug: true,
      options: {
        postcss: function() {
          return [precss, autoprefixer];
        },
        context: path.join(__dirname, "src"),
        output: {
          path: path.join(__dirname, "dist")
        }
      }
    })
  ]
};