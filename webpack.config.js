const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/",
        query: { compact: false }
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader",
        exclude: "/node_modules/",
        query: { compact: false }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      }
    ]
  },
  plugins: [htmlPlugin],
  resolve: {
    extensions: [".js", ".jsx", ".scss"]
  }
};
