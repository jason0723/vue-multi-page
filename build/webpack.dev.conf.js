'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const glob = require('glob')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
function resolve(dir){
  return path.join(__dirname, '..', dir)
}

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

let pages = ((globalPath)=>{
  let htmlFiles = {},
    pageName;

  glob.sync(globalPath).forEach((pagePath)=>{
    let basename = path.basename(pagePath, path.extname(pagePath));
    pageName = basename;
    htmlFiles[pageName] = {};
    htmlFiles[pageName]['chunk'] = basename;
    htmlFiles[pageName]['path'] = pagePath;

  });
  return htmlFiles;
})(resolve('src')+'/modules/**/*.html');

for (let entryName in pages) {

  let conf = {
    // 生成出来的html文件名
    filename: entryName + '.html',
    // 每个html的模版，这里多个页面使用同一个模版
    template: pages[entryName]['path'],
    // 自动将引用插入html
    inject: true,
    hash: false,
    // 每个html引用的js模块，也可以在这里加上vendor等公用模块
    chunks: ['vendor','manifest',pages[entryName]['chunk']],
    minify: { //压缩HTML文件
      removeComments: true, //移除HTML中的注释
      collapseWhitespace: false //删除空白符与换行符
    }
  };
  /*入口文件对应html文件（配置多个，一个页面对应一个入口，通过chunks对应）*/
  devWebpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
