var expect = require( 'expect.js' )

var z = require( '../dist/index.aio.js' )

describe( '测试', function () {
    it( 'test-item', function () {
        expect( typeof z ).equal( 'object' )
    } )
} )
