const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const CircularDependencyPlugin = require('circular-dependency-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const isDevMode = process.env.isDebug === "true";

module.exports = (env) => {
    const outputDir = (env && env.publishDir) ? env.publishDir : __dirname;
    
    return [{
        mode: isDevMode ? 'development' : 'production',
        context: __dirname,
        devtool: ! isDevMode ? undefined : 'cheap-module-eval-source-map',
        entry: {
            main: './client/boot.ts'
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },
        devServer: {
            hot: isDevMode,
        },
        output: {
            path: path.resolve(__dirname, 'wwwroot/dist'),
            filename: '[name].bundle.js',
            publicPath: '/dist/'
        },
        optimization: isDevMode ? {} : {
            splitChunks: {
                cacheGroups: {
                    commons: { test: /[\\/]node_modules[\\/]/, name: "vendors", chunks: "all" }
                }
            },
            minimize: true,
            minimizer: [
                new UglifyJsPlugin({
                    include: /\.js$/
                })
           ],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    include: /client/,
                    use: 'awesome-typescript-loader?silent=true'
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    use: 'url-loader?limit=25000'
                },
                ! isDevMode ? {} : {
                    test: /\.js$/,
                    use: ["source-map-loader"],
                    enforce: "pre"
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: isDevMode,
                                plugins: [] // will fail without this line
                            }
                        },
                        'sass-loader'
                    ]
                }
            ]
        },
        plugins: [
            new CircularDependencyPlugin({
                exclude: /a\.js|node_modules/,
                failOnError: true,
                allowAsyncCycles: false,
                cwd: process.cwd()
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                Popper: ['popper.js', 'default']
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css'
            }),
            new CheckerPlugin()
        ]
    }];
};