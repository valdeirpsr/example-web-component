"use strict";

const path = require("path");
const SassLintPlugin = require("sass-lint-webpack");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = () => {
  const config = {
    entry: "./src/js/image.js",
    watch: false,
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "v-image.js",
      iife: true,
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            "css-hot-loader",
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: {
                minimize: true,
              },
            }
          ],
        },
      ],
    },
    plugins: [
      new SassLintPlugin({
        files: "src/**.scss",
      }),
    ],
    devServer: {
      contentBase: path.resolve(__dirname, "./dist"),
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            keep_classnames: true,
            keep_fnames: true
          }
        })
      ],
    },
  };

  if (process.env.NODE_ENV === "development") {
    config.devtool = "source-map";
  }

  return config;
};

