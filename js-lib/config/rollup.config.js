// rollup.config.js

var babel = require('rollup-plugin-babel')
var common = require('./rollup.js')
var replace = require('rollup-plugin-replace')
var pkg = require('../package.json')

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'cjs',
        // 如果不同时使用 export 与 export default 可打开legacy
        // legacy: true,
        banner: common.banner,
    },
    plugins: [
        babel( {
            runtimeHelpers: true,
            exclude: 'node_modules/**'
        } ),
        replace( {
            // include: 'src/index.js', // 指定可以使用变量的文件路径
            exclude: 'node_modules/**',
            ENV: JSON.stringify( process.env.NODE_ENV || 'development' ),
            VERSION: JSON.stringify( pkg.version )
        } )
    ]
};
