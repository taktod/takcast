var webpack = require("webpack");
module.exports = {
  entry: __dirname + "/src/app.ts",
  output: {
    path: __dirname + "/dest/",
    filename: "app.js"
  },
  devtool: "#inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      }
    ]
  },
  resolve: {
    modules: [
      "node_modules",
    ],
    extensions: [".tsx", ".ts", ".js"],
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "react-bootstrap": "ReactBootstrap",
    "electron": "electron"
  }
}
