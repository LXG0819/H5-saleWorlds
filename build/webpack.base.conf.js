let path = require('path')
let utils = require('./utils')
let webpack = require('webpack')
let config = require('../config')

let glob = require('glob');
let entries = utils.getMultiEntry('./src/' + config.moduleName + '/**/**/*.js'); // 获得入口js文件
let chunks = Object.keys(entries);

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {//开发环境用单页面
  entries = {
    app: './src/main.js'
  }
}
// 打包报错时，显示明细
process.traceDeprecation = true
let projectRoot = path.resolve(__dirname, '../')
const vuxLoader = require('vux-loader');

let vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
const $arguments  = process.argv;

let env = 'local';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  env = 'local';
} else {
  if ($arguments.includes('--prod')) {
    env = 'product';
  } else {
    env = 'test';
  }
}
console.error('env', env);
let webpackConfig = {

  entry: {
    'babel-polyfill': 'babel-polyfill',
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json','.less','.css'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'env': resolve('./src/config/env/' + env)
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      /*{
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },*/
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1000000,
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
      /*{
       test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
       loader: 'file-loader',
       query: {
       name: utils.assetsPath('img/[name].[ext]')
       }
       },*/
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader?limit=1000000',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      },

    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), //热加载插件
    /*
     // 提取公共模块
     new webpack.optimize.CommonsChunkPlugin({
     name: 'vendors', // 公共模块的名称
     chunks: chunks,  // chunks是需要提取的模块
     minChunks: 4 || chunks.length //公共模块被使用的最小次数。比如配置为3，也就是同一个模块只有被3个以外的页面同时引用时才会被提取出来作为common chunks。

     }),*/

  ]
}

// 引入vux按需加载loader
webpackConfig = vuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui']
})

module.exports = webpackConfig
