import config from './rollup.config'
var babel = require( 'rollup-plugin-babel' )
var nodeResolve = require( 'rollup-plugin-node-resolve' )
var commonjs = require( 'rollup-plugin-commonjs' )
var replace = require( 'rollup-plugin-replace' )
var common = require( './rollup.js')

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/index.aio.js',
        format: 'umd',
        // 如果不同时使用 export 与 export default 可打开legacy
        // legacy: true,
        name: common.name,
        // banner: common.banner,
    },
    plugins: [
        nodeResolve( {
            main: true,
            jsnext: true,
            module: true
        } ),
        commonjs( {
            include: 'node_modules/**',
        } ),
        ...config.plugins
    ]
};
