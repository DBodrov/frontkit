import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import externalPlugin from 'rollup-plugin-auto-external';
import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default {
    input: 'src/index.ts',
    plugins: [
        postcss({ modules: true }),
        babel({ extensions: ['.ts', '.tsx'] }),
        commonjs(),
        resolve({ extensions: ['.ts', '.tsx', '.js'] }),
        externalPlugin(),
    ],
    output: [{ file: pkg.module, format: 'es' }],
};
