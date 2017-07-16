const path = require('path');

module.exports = {
  context: path.join(__dirname, "/src"),
  entry: "./App.js",

  output: {
    filename: "App.js",
    path: path.join(__dirname, "/dist"),
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,         // Match both .js and .jsx files
        exclude: /node_modules/,
        loader: "babel-loader",
        query:{
          presets:['react']
        }
      },
      {
        test: /\.css$/,
        loader:'css-loader'
      }, {
          test: /\.less$/,
          loaders: ["style", "css", "less"]
      }, {
          test: /\.scss$/,
          loader: 'style!css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass?sourceMap'
      }
    ],
  },
}
