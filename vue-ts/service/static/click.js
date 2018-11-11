var Geetest;

if ( process.env.NODE_ENV !== 'production' ) {
    Geetest = require( '../../node_modules/gt3-sdk' );
} else {
    Geetest = require( '../../src/assets/gt-sdk' ).default;
}

var captcha = new Geetest( {
    geetest_id: 'd4e08bd976877c899eb92020e0f01ed0',
    geetest_key: '32bfd0a250732f7b8253bb9119d99480'
} );

module.exports = captcha;
