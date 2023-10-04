const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanPlugin = require("clean-webpack-plugin");
const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = () => {
  // npm run start -- --Samsung --production
  const platform = process.argv[2]?.substring(2) || "Samsung";
  const environment = process.argv[3]?.substring(2);
  return {
    entry: "./src/index.tsx",
    mode: "development",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    devtool: "inline-source-map",
    devServer: {
      contentBase: "./public",
      hot: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(scss|less|css)$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        {
          test: /\.(.svg|.png|.jpg|.gif|.ttf)$/,
          use: {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets",
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.(png|gif|jpg|woff|woff2|eot|ttf|svg)$/i,
          use: [
            {
              loader: "url-loader",
            },
          ],
        },
        {
          test: /\.m?js$/,
          use: {
            loader: "babel-loader?presets[]=es2015",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
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
        {
          context: __dirname + "/src",
          from: `lib`,
          to: __dirname + "/dist/lib",
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
              drop_console: true, // Remove console.log statements
            },
          },
        }),
      ],
    },
    node: {
      global: false,
    },
    resolve: {
      extensions: [".ts", ".js", ".tsx"],
      fallback: {
        querystring: require.resolve("querystring-es3"),
      },
    },
  };
};
