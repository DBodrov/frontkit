const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const {resolveApp, appName} = require('./utils');
const {sslCert, sslKey} = require('./cert');
const commonConfig = require('./webpack.config.common');

const PORT = 3000;
const VERSION = require('../package.json').version;

module.exports = (env, argv) => {
  return webpackMerge.merge(commonConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    bail: true,
    target: 'web',
    stats: 'minimal',

    output: {
      path: resolveApp('docs'),
      pathinfo: true,
      filename: 'static/js/[name].bundle.js',
      chunkFilename: 'static/js/[name].chunk.js',
      assetModuleFilename: 'static/media/[name][ext]',
      clean: true
    },

    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
      ],
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            filename: 'static/js/vendor.js',
            priority: -20,
            reuseExistingChunk: true,
            chunks: 'all',
          },
          common: {
            chunks: 'all',
            minChunks: 2,
            filename: 'static/js/[name].js',
            reuseExistingChunk: true,
          },
        },
      },
      runtimeChunk: {
        name: entrypoint => `runtime~${entrypoint.name}`,
      },
      emitOnErrors: false,
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: resolveApp('site/index.html'),
        inject: true,
        hash: true,
        chunksSortMode: 'none',
        version: 'local',
      }),

      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development',
        LIB_VERSION: VERSION,

      }),

      new WebpackBar({name: appName}),
      new ReactRefreshWebpackPlugin(),
    ],

    devServer: {
      hot: true,
      https: {
        key: sslKey,
        cert: sslCert,
      },
      static: {
        directory: resolveApp('docs'),
      },

      port: PORT,
      historyApiFallback: true,
      headers: {
        Pragma: 'no-cache',
        'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
      },
    },
  });
};
