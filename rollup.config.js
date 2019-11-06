import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json';

export default [
    {
        input: 'src/index.ts',
        output: {
            name: 'a3-uikit',
            file: pkg.browser,
            format: 'umd',
        },
        plugins: [resolve(), commonjs(), typescript(), postcss({ modules: true })],
    },
    {
        input: 'src/index.ts',
        plugins: [resolve({ only: ['classnames'] }), commonjs(), typescript(), postcss({ modules: true })],
        output: [{ file: pkg.main, format: 'cjs' }, { file: pkg.module, format: 'es' }],
    },
];
