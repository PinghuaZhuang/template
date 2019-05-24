# z

[![](https://img.shields.io/badge/Powered%20by-jslib%20pubsub-brightgreen.svg)](https://github.com/pinghuazhuang/z)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/PinghuaZhuang/z/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/jsmini/pubsub.svg?branch=master)](https://travis-ci.org/PinghuaZhuang/z)
[![npm](https://img.shields.io/badge/npm-0.3.2-orange.svg)](https://www.npmjs.com/package/zp-z)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/jsmini/pubsub.svg)](https://github.com/PinghuaZhuang/z/issues "Percentage of issues still open")

工具函数库

**注意：译代码依赖ES5环境，对于ie6-8需要引入[es5-shim](http://github.com/es-shims/es5-shim/)才可以兼容，可以查看[demo/demo-global.html](../demo/demo-global.html)中的例子**

## 目录介绍

```
.
├── demo 使用demo
├── dist 编译产出代码
├── doc 项目文档
├── src 源代码目录
├── test 单元测试
└── CHANGELOG.md 变更日志
```

## 如何使用

通过npm下载安装代码

```bash
$ npm install --save zp-z
```

如果你是node环境

```js
var z = require('zp-z');
```

如果你是webpack等环境

```js
import z from 'zp-z';
```

如果你是requirejs环境

```js
requirejs(['node_modules/zp-z/dist/index.aio.min'], function (jsmini_pubsub) {
    var name = jsmini_pubsub.name;
})
```

如果你是浏览器环境

```html
<script src="node_modules/@jsmini/pubsub/dist/index.aio.js"></script>

<script>
    var z = window.z;
</script>
```

## 文档

[API](https://github.com/jsmini/pubsub/blob/master/doc/api.md)

## 贡献指南

首次运行需要先安装依赖

```bash
$ npm install
```

一键打包生成生产代码

```bash
$ npm run build
```

运行单元测试，浏览器环境需要手动测试，位于`test/browser`

```bash
$ npm test
```

## API文档

[TODO.md](https://github.com/PinghuaZhuang/z/blob/master/doc/api.md)

## 更新日志

[CHANGELOG.md](https://github.com/PinghuaZhuang/z/blob/master/CHANGELOG.md)

## 计划列表

[TODO.md](https://github.com/PinghuaZhuang/z/blob/master/doc/TODO.md)

