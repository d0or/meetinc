var webpack = require("webpack"),
  path = require("path"),
  CleanWebpackPlugin = require("clean-webpack-plugin"),
  CopyWebpackPlugin = require("copy-webpack-plugin"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  WriteFilePlugin = require("write-file-webpack-plugin");
const pjson = require('./package.json');


// load the secrets
var alias = {};

var fileExtensions = ["jpg", "jpeg", "png", "gif", "eot", "otf", "svg", "ttf", "woff", "woff2"];

var options = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    background: path.join(__dirname, "src", "js", "background.js"),
    detectSchemaorgEvents: path.join(__dirname, "src", "js", "detectSchemaorgEvents.js"),
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
        exclude: /node_modules/
      },
      {
        test: new RegExp('\.(' + fileExtensions.join('|') + ')$'),
        loader: "file-loader?name=[name].[ext]",
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: alias
  },
  plugins: [
    new CleanWebpackPlugin(["build"]),
    new CopyWebpackPlugin([{
      from: "src/manifest.json",
      transform: function (content, path) {
        return Buffer.from(JSON.stringify({
          description: pjson.description,
          version: pjson.version,
          ...JSON.parse(content.toString())
        }))
      }
    }, {
      from: "src/images"
    }]),
    new WriteFilePlugin()
  ]
};

if (process.env.NODE_ENV === "development") {
  options.devtool = "cheap-module-eval-source-map";
}

module.exports = options;
