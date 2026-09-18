// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");
dotenv.config();

/** @type {import("webpack").Configuration} */
const config = {
  entry: "./src/index.js",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = (env, argv) => {
  config.mode = env.production ? "production" : "development";

  config.plugins.push(
    new webpack.DefinePlugin({
      CONFIG_CONTENTFUL_SPACE_ID: JSON.stringify(
        process.env.CONFIG_CONTENTFUL_SPACE_ID,
      ),
      CONFIG_CONTENTFUL_KEY: JSON.stringify(process.env.CONFIG_CONTENTFUL_KEY),
      CONFIG_CONTENTFUL_ENVIRONMENT: JSON.stringify(
        process.env.CONFIG_CONTENTFUL_ENVIRONMENT,
      ),
      CONFIG_CMS_BAND_ID: JSON.stringify(process.env.CONFIG_CMS_BAND_ID),
    }),
  );
  config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());

  return config;
};
