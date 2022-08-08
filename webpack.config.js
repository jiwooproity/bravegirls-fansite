const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(basePath, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  devServer: {
    historyApiFallback: true,
    port: 80,
    static: {
      directory: path.join(__dirname, "public"),
    },
  },
  proxy: {
    "/member": {
      target: "http://localhost",
      changeOrigin: true,
    },
  },
};
