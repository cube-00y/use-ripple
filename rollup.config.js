import commonjs from "rollup-plugin-commonjs";
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';
import PeerDepsExternalPlugin from "rollup-plugin-peer-deps-external";

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
process.env.BABEL_ENV = 'production';

export default {
    input: 'src/index.js',
    output: [
        {
            file: pkg.main,
            format: 'cjs'
        }
    ],
    plugins: [
        PeerDepsExternalPlugin(),
        resolve({ extensions }),
        commonjs({
            include: 'node_modules/**'
        }),
        babel({
            extensions,
            include: ['src/**'],
            runtimeHelpers: true,
            presets: [
                ["react-app", {
                "flow": false
                }]
            ]
        })
    ],
    external: ['react', 'react-dom']
}
