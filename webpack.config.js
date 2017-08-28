var webpack = require("webpack");

module.exports = [
    {
        entry: {
            "bundle": "./src/polygonize-it.ts",
            "bundle.min": "./src/polygonize-it.ts"
        },
        devtool: 'source-map',
        output: {
            filename: "./dist/[name].js"
        },
        resolve: {
            extensions: [".ts"]
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        performance: {
            hints: false
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                include: /\.min\.js$/,
                minimize: true
            })
        ]
    }
];