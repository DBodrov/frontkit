const {resolveApp} = require('./utils');

module.exports = {
  entry: {
    main: resolveApp('site/entry.client.tsx'),
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: ['node_modules'],
    alias: {
      '@a3/uikit': resolveApp('src'),
      site: resolveApp('site')
    },
  },

  module: {
    rules: [
      {
        test: /\.(woff|woff2|ttf|eot|ico|svg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(bmp|gif|jpg|png)$/,
        type: 'asset/resource',
      },
    ],
  },
};
