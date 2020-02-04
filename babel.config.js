const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-optional-chaining',
];

module.exports = {
    plugins,
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    browsers: ['last 1 Chrome versions'],
                },
                loose: true,
            },
        ],
        [
            '@babel/preset-react',
            {
                useSpread: true,
            },
        ],
        '@babel/preset-typescript',
    ],
    sourceType: 'unambiguous',
};
