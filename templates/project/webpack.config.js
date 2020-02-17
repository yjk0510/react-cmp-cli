const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    //node_modules里的代码
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "initial",
                    name: "vendors", //chunks name
                    priority: 10, //优先级
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                loader: "less-loader" // compiles Less to CSS
            },

            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif)/,
                use: ["file-loader"]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        plugins: [
                            [
                                "import",
                                {
                                    libraryName: "antd",
                                    libraryDirectory: "es",
                                    style: "css" // `style: true` 会加载 less 文件
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new BundleAnalyzerPlugin()
    ],
    devServer: {
        contentBase: "./dist"
    },
    resolve: {
        alias: {
            "@ant-design/icons": "purched-antd-icons"
        }
    },
    externals: {
        react: "React",
        "react-dom": "ReactDOM"
    }
};
