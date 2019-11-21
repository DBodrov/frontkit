const path = require('path');

module.exports = ({ config }) => {
    config.module.rules.push({
        test: /\.tsx?$/,
        use: [
            {
                loader: require.resolve('babel-loader'),
                options: { babelrc: true, extends: path.resolve(__dirname, '.babelrc') },
            },
            require.resolve('react-docgen-typescript-loader'),
        ],
    });

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
};
