const path = require('path');
const merge = require('webpack-merge');

module.exports = ({ config }) => {
    config.module.rules.find(rule => rule.test.test('123.css')).exclude = /\.module\.css$/;
    return merge(config, {
        module: {
            rules: [
                {
                    test: /\.module\.css$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: require.resolve('babel-loader'),
                            options: { babelrc: true, extends: path.resolve(__dirname, '.babelrc') },
                        },
                        require.resolve('react-docgen-typescript-loader'),
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.tsx'],
        },
    });
};
