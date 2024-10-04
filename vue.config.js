const webpack = require('webpack');

module.exports = {
    publicPath: '/',
    lintOnSave: false,
    configureWebpack: {
        plugins: [
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 6
            })
        ]
    }
};