const path = require("path");
const webpack = require("webpack");
const WebpackRules = [];
const webpackOption = {
    entry: ["babel-polyfill", "./app.js"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: ""
    },
    module: {
        rules: WebpackRules
    }
};
let babelLoader = {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: "babel-loader",
        options: {
            presets: ["@babel/preset-env"]
        }
    }
};
WebpackRules.push(babelLoader);
module.exports = webpackOption;
