define( [
    './core'
], function ( zp ) {

'use strict';

zp.debounce = function ( func, wait, immediate ) {
    var timeout, args, context, timestamp, result;
    var now = new Date();

    var later = function () {
        var last = now - timestamp;

        if ( last < wait && last >= 0 ) {
            timeout = window.setTimeout( later, wait - last );
        } else {
            timeout = null;
            if ( !immediate ) {
                result = func.apply( context, args );
                if ( !timeout ) {
                    context = args = null;
                }
            }
        }
    };

    return function () {
        var callNow = immediate && !timeout;

        context = this;
        args = arguments;
        timestamp = new Date();

        if ( !timeout ) {
            timeout = window.setTimeout( later, wait );
        }
        if ( callNow ) {
            result = func.apply( context, args );
            context = args = null;
        }

        return result;
    };
};

return zp;
} );
