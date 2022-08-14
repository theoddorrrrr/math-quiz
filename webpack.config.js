const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: ["@babel/polyfill", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  resolve: {
    extensions: [".js", ".json"],
  },
  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, "src"),
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'src/pages/index.pug'),
      filename: 'index.html',
    }),
    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'src/pages/app.pug'),
      filename: 'app.html',
    }),
    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'src/pages/leaderboards.pug'),
      filename: 'leaderboards.html',
    }),
    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'src/pages/rules.pug'),
      filename: 'rules.html',
    }),

    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(), 
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: '@webdiscus/pug-loader',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(s[ac]ss)$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
