const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanPlugin = require("clean-webpack-plugin");
const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = () => {
  const platform = process.argv[4]?.substring(2) || "Samsung";
  const environment = process.argv[5]?.substring(2);
  return {
    mode: "production",
    entry: "./src/index.tsx",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    devtool: "none",
    module: {
      rules: [
        {
          test: /\.tsx$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js", ".tsx"],
      fallback: {
        querystring: require.resolve("querystring-es3"),
      },
    },
    plugins: [
      new CleanPlugin.CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        "process.env": {
          TARGET_ENV: JSON.stringify(environment),
          PLATFORM: JSON.stringify(platform),
        },
      }),
      new CopyWebpackPlugin([
        {
          context: __dirname + "/src",
          from: `platform/${platform}`,
          to: __dirname + "/dist",
        },
      ]),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new optimizeCssAssetsWebpackPlugin(),
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            format: {
              comments: false,
            },
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
    },
  };
};
