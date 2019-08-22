let path = require('path');
let fs = require('fs');
let utils = require('./utils');
let webpack = require('webpack');
let config = require('../config');
let merge = require('webpack-merge');
let WebpackZipPlugin = require('zip-webpack-plugin');
let baseWebpackConfig = require('./webpack.base.conf');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
let ProgressBarPlugin = require('progress-bar-webpack-plugin');
let cubeModule = require('../CubeModule.json');
let env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env;
//更改CubeModule.json
const arguments = process.argv.slice(2);
let $env = 'local';
let $sourceMap = config.build.productionSourceMap;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  $env = 'local';
} else {
  if (arguments.includes('--prod') ) {
    $env = 'product';
  } else {
    $env = 'test';
  }

  if (arguments.includes('--test')) {
    $sourceMap = true;
  } else {
    $sourceMap = false;
  }

  console.error('sourceMap', $sourceMap);
}
function changeVersion() {
  let changeVersion = true;
  const arguments = process.argv;
  // console.log('arguments', arguments);
  let isProduct = false;
  let isAdd = true;
  if (arguments.includes('--prod')) {
    isProduct = true;
  }
  if (arguments.includes('--cur')) {
    isAdd = false;
  }
  console.error('isProduct', isProduct);
  return new Promise((resolve) => {
    console.log(JSON.stringify(cubeModule));
    let version = parseInt(cubeModule.version.split('.').join(''));
    if (isProduct) {
      version = parseInt(cubeModule.productVersion.split('.').join(''));
      cubeModule.isPcTest = 1;
      cubeModule.isDebug = 0;
    } else {
      cubeModule.isDebug = 1;
      cubeModule.isPcTest = 0;
      version = parseInt(cubeModule.testVersion.split('.').join(''));
    }
    if(isAdd){
      version++;
    }
    cubeModule.build = version * 100;
    version = (version + '').split('').join('.');
    cubeModule.version = version;
    if (isProduct) {
      cubeModule.productVersion = version;
    } else {
      cubeModule.testVersion = version;
    }
    const rootPath = __dirname.replace('\\build', '').replace('\/build', '');
    deleteFolder(rootPath + '/dist');
    if (changeVersion) {
      fs.writeFile(rootPath + '/CubeModule.json', JSON.stringify(cubeModule, null, 4), function (err) {
        if (err) throw err;
        resolve('CubeModule.json内容被覆盖');
      });
    }
  });
}
//删除文件夹
function deleteFolder(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function (file, index) {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolder(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}
(async () => {
  let version = await changeVersion();
})();
let webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      // sourceMap: config.build.productionSourceMap,
      sourceMap: $sourceMap,
      extract: true
    })
  },
  // devtool: config.build.productionSourceMap ? '#source-map' : false,
  devtool: $sourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].js'),
    chunkFilename: utils.assetsPath('js/[id].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,  // 打包去除debugger
        drop_console: true  // 打包去除console
      },
      mangle: false,
      minify: true,
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        );
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../CubeModule.json'),
        to: config.build.assetsRoot
      }
    ]),
    new WebpackZipPlugin({
      path: path.join(__dirname, '../dist'),
      filename: (cubeModule.identifier + '-' + ($env === 'test' ? cubeModule.testVersion : cubeModule.version) + '-' + $env + '.zip')
    }),
    new ProgressBarPlugin({
      clear: false
    })
  ]
});

if (config.build.productionGzip) {
  let CompressionWebpackPlugin = require('compression-webpack-plugin');

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

if (config.build.bundleAnalyzerReport) {
  let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
