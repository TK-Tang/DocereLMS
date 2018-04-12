const webpack = require("webpack");
const path = require("path");
var htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devtool: "inline-source-map",
    entry: [
        "webpack-hot-middleware/client?reload=true",
        path.join(__dirname, "src/index.js")
    ],
    output: {
        path: path.join(__dirname, "/"),
        filename: "bundle.js",
        publicPath: "/"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015"]
                }
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.scss$/,
                loaders: [ "style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.css$/,
                loaders: ["style-loader?sourceMap", "css-loader?modules&importLoaders=1&localIdentName=[path]__[name]__[hash:base64:5]"]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "index.html",
            inject: "body",
            filename: "index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    node: {
        net: "empty",
        fs: "empty",
        "json-loader": "empty"
    }
};