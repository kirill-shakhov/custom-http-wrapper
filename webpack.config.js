const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        'bundle': './src/index.ts',
        'bundle.min': './src/index.ts'
    },
    mode: 'production',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            chunks: ['bundle']  // Указываем, что нужно подключить только бандл 'bundle.js'
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/constants/httpMethods.d.ts', to: 'httpMethods.d.ts' },
                { from: 'README.md', to: 'README.md' }
            ]
        })
    ],
};

