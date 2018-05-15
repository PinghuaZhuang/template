define( [
    './core'
], function ( zp ) {

'use strict';

// Register as a named AMD module
if ( typeof define === 'function' && define.amd ) {

    // define( 'jquery', [], function() {
    //     return jQuery;
    // } );
    define( 'zp', [], function () {
        return zp;
    } );
}

// CommonJS for browser
if ( !noGlobal ) {
    window.zp = zp;
}

return zp;

} );
