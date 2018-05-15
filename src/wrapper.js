/* eslint-disable no-unused-vars*/
( function ( global, factory ) {

    'use strict';

    if ( typeof module === 'object' && typeof module.exports === 'object' ) {

        // For CommonJS and CommonJS-like environments where a proper `window`
        module.exports = global.document ?
            factory( global, true ) :
            function ( w ) {
                if ( !w.document ) {
                    throw new Error( 'zp requires a window with a document' );
                }
                return factory( w );
            };
    } else {
        factory( global );
    }

// Pass this if window is not defined yet
} )( typeof window !== 'undefined' ? window : this, function ( window, noGlobal ) {

'use strict';

// @CODE
return zp;
} );
