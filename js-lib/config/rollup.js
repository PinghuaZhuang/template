var pkg = require('../package.json')

// 兼容 jslib-base 和 @yanhaijing/jslib-base
// var name = pkg.name.split('/').pop();
var name = 'z'
var version = pkg.version

var banner =
`/*!
 * z ${version} (https://github.com/PinghuaZhuang/z)
 * API https://github.com/PinghuaZhuang/z/doc/api.md
 * Copyright 2018-${(new Date).getFullYear()} PinghuaZhuang. All Rights Reserved
 * Licensed under MIT (https://github.com/PinghuaZhuang/z/LICENSE)
 */
`;

exports.name = name
exports.banner = banner
