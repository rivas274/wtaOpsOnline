const webpack = require('webpack');
const path = require('path');

module.exports = {
    publicPath: '/',
    lintOnSave: false,
    configureWebpack: {
        cache: true,
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },
        plugins: [
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 6
            })
        ]
    },
    css: {
        loaderOptions: {
            sass: {
                sassOptions: {
                    cache: true
                }
            }
        }
    }
};