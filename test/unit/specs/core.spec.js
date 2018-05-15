import z from '../../../src';

describe( '$.callback', () => {

    it( 'callbacks test', () => {
        let { callbacks, type } = z;
        expect( type( callbacks ) ).toEqual( 'function' );

        let str = '1';
        let queue = callbacks();

        // 添加
        queue
            .add( fn1, fn2 )
            .fire();
        expect( str ).toEqual( '1fn1fn2' );

        // 删除
        str = '2';
        queue
            .add( fn3 )
            .remove( fn1 )
            .fire();
        expect( str ).toEqual( '2fn2fn3' );

        function fn1 () {
            str += 'fn1';
        }
        function fn2 () {
            str += 'fn2';
        }
        function fn3 () {
            str += 'fn3';
        }
    } );
} );
