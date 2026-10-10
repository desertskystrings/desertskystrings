'use strict'

const path = require('path')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");
dotenv.config();


/** @type {import("webpack").Configuration} */
const config = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ],
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: ['html-loader']
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  }
}

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
      CONFIG_CONTENTFUL_DEFAULT_EVENT_IMG_ID: JSON.stringify(
        process.env.CONFIG_CONTENTFUL_DEFAULT_EVENT_IMG_ID
      ),
      DSS_MODE: JSON.stringify(env.production ? "production" : "development")
    }),
  );
  config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());

  return config;
};