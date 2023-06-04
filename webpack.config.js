const { resolve } = require("path");
module.exports = {
  entry: "./src/app.ts",
  output: {
    filename: "app.js",
    path: resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_module/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  target: "node",
  mode: "production",
};
