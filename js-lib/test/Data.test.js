var expect = require( 'expect.js' );

var z = require( '../dist/index.aio.js' );

describe( 'Data', function () {
    var arr = [];
    var Data = z.Data;

    function fn1 ( value ) {
        arr.push( value );
    }
    function fn2 ( value ) {
        arr.shift();
    }

    Data.register( 'count', {
        type: 'number',
        default: 0
    } );

    it( 'add-register', function () {

       expect( z.isFunction( Data.count ) ).equal( true );
       expect( Data.count() ).equal( 0 );

       Data.count( 4 );
       expect( Data.count() ).equal( 4 );

       Data.count.add( fn1 )( 7 );
       expect( Data.count() ).equal( 7 );
       expect( arr[ 0 ] ).equal( 7 );

       try {
            Data.count( '8' );
            expect( 0 ).equal( 1 );
       } catch ( error ) {
            expect( 1 ).equal( 1 );
            expect( Data.count() ).equal( 7 );
            expect( arr.length ).equal( 1 );
       }

       try {
            Data.register( 'count', {
                type: 'number',
                default: 0
            } );
       } catch ( error ) {
            expect( 1 ).equal( 1 );
       }
    } );

    it( 'remove', function () {
        arr = [];
        Data.count.remove( fn1 )( 9 );
        expect( arr.length ).equal( 0 );
    } );

    it( 'has', function () {
        expect( Data.count.add( fn1 ).has( fn1 ) ).equal( true );
        expect( Data.count.add( fn1 ).has( fn2 ) ).equal( false );
    } );

    it( 'empty', function () {
        arr = [];
        Data.count.add( fn2 ).empty();
        Data.count( 9 );
        expect( arr.length ).equal( 0 );
    } );

    it( 'once', function () {
        arr = [];
        Data.register( 'count2', {
            once: true
        } );
        Data.count2.add( fn1 )( '2' );
        Data.count2( '9' );
        expect( arr[ 0 ] ).equal( '2' );
        expect( arr.length ).equal( 1 );
    } );

    it( 'clear', function () {
        Data.clear();
        expect( z.isFunction( Data.count ) ).equal( false );
        expect( Data._datas().length ).equal( 0 );
    } );

    it( 'sub', function () {
        Data.register( 'count', {
            type: 'number',
            default: 0
        } );
        Data.count.add( fn2, fn1 );

        let t = Data.count.sub();
        expect( t.length ).equal( 2 );
        expect( t[ 0 ] ).equal( fn2 );
        expect( t[ 1 ] ).equal( fn1 );
    } );

    it( 'destory', function () {

        Data.count.add( fn2, fn1 );
        Data.count.destory();
        expect( z.isFunction( Data.count ) ).equal( false );
    } );

    it( 'onlyChange', function () {
        arr = [];
        Data.register( 'count', {
            type: 'number',
            onlyChange: true,
            default: 0
        } );

        Data.count.add( fn1 )( 2 );
        Data.count( 2 );
        expect( arr.length ).equal( 1 );
        expect( arr[ 0 ] ).equal( 2 );
    } );
} );
