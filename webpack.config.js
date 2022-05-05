const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = {
    entry: './src/javascripts/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'javascripts/main.js',
    },
    mode: "development",
    //仮想サーバーの設定
    devServer: {
        static: "dist",
        // contentBase: path.join(__dirname, "dist"), //ルートディレクトリの指定
        open: true, //ブラウザを自動的に起動
    },
    module: {
        rules: [
            {
                // 対象となるファイルの拡張子(scssかsassかcss)
                test: /\.(css|sass|scss)/,
                // Sassファイルの読み込みとコンパイル
                use: [
                    // CSSファイルを抽出するように MiniCssExtractPlugin のローダーを指定
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    // CSSをバンドルするためのローダー
                    {
                        loader: 'css-loader',
                    },
                    // PostCSS（autoprefixer）の設定
                    {
                        loader: "postcss-loader",
                        options: {
                        // production モードでなければソースマップを有効に
                        // sourceMap: enabledSourceMap,
                        postcssOptions: {
                            // ベンダープレフィックスを自動付与
                            plugins: [require("autoprefixer")({ grid: true })]
                        }
                        }
                    },
                    // Sass を CSS へ変換するローダー
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.(png|jpg)/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]'
                },
                use: [
                    // {
                    //     loader: 'file-loader',
                    //     options: {
                    //         esModule: false,
                    //         name: 'images/[name].[ext].png',
                    //     },
                    // },
                ],
            },
            {
                test: /\.pug/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                    {
                        loader: 'pug-html-loader',
                        options: {
                            pretty: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './stylesheets/main.css', // distの中にあるcssフォルダにstyle.cssを出力
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/index.pug',
            filename: 'index.html',
            alwaysWriteToDisk: true,
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/access.pug',
            filename: 'access.html',
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/members/taro.pug',
            filename: 'members/taro.html',
        }),
        new HtmlWebpackHarddiskPlugin(), // HTMLファイル変更時にホットリロード
        new CleanWebpackPlugin(), // dist内の不要なファイルやフォルダを消す
    ],
}
