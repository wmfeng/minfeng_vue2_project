module.exports = {
    devServer: {
        //host:"192.168.1.86",
        proxy: {
            '/api': {
                target: 'http://119.90.43.73:30011',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api',
                    '^/api/download': '/api/upload',
                }
            }
        }
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            const path = require('path')
            const PrerenderSPAPlugin = require('prerender-spa-plugin')
            const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
            return {
                plugins: [
                    new PrerenderSPAPlugin({
                        staticDir: path.join(__dirname, 'dist'),
                        routes: ['/login', '/home/home'],
                        renderer: new Renderer({
                            inject: {
                                foo: 'bar'
                            },
                            headless: false,
                            renderAfterDocumentEvent: 'render-event'
                        })
                    })
                ],
                //警告 webpack 的性能提示
                performance: {
                    hints: 'warning',
                    //入口起点的最大体积
                    maxEntrypointSize: 50000000,
                    //生成文件的最大体积
                    maxAssetSize: 30000000,
                    //只给出 js 文件的性能提示
                    assetFilter: function (assetFilename) {
                        return assetFilename.endsWith('.js');
                    }
                }

            }
        } else {
            // 为开发环境修改配置...
        }
    },
    chainWebpack: config => {
        // TODO: Remove this workaround once https://github.com/vuejs/vue-cli/issues/2463 is fixed
        // Remove preload plugins for multi-page build to prevent infinite recursion
        let pages = [...config.entryPoints.store.keys()];
        pages.forEach(page => {
            config.plugins.delete(`preload-${page}`)
            config.plugins.delete(`prefetch-${page}`)
        })
    },
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        },
        logout: 'src/logout.js'
    }
}