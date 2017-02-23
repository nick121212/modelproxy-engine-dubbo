var webpack = require('webpack');

module.exports = {
    context: __dirname + '/',
    cache: true,
    target: "node",
    entry: {
        'index': __dirname + '/src/index.ts'
    },
    // sourcemap: "none",
    output: {
        path: __dirname + '/dist',
        filename: 'index.js',
        libraryTarget: 'commonjs'
    },
    node: {
        "child_process": "empty"
    },
    stats: {
        colors: true,
        reasons: true
    },
    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            // 'modelproxy': __dirname + '/node_modules/modelproxy/dist/web.js'
        }
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    },
    externals: [{
            "modelproxy": {
                root: "modelProxy",
                commonjs2: "modelproxy",
                commonjs: ["modelproxy"],
                amd: "modelproxy"
            }
        },
        "node-zookeeper-client",
        "json-pointer",
        "hessian.js",
        "bluebird",
        "urijs",
        {
            "lodash": {
                root: "_",
                commonjs2: "lodash",
                commonjs: ["lodash"],
                amd: "lodash"
            }
        }
    ],
    plugins: [
        new webpack.ProvidePlugin({
            modelProxy: "modelProxy"
        })
    ]
};