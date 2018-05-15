/**
 * @fileOverview xx
 * @description xx
 */
( function ( window ) {

    var xx = {
            color: 'blue'
    };

    window.xx = xx;

    // EXPOSE
    if ( typeof define === 'function' && define.amd ) {
        define( function () {
            return xx;
        } );
    } else if ( typeof module !== 'undefined' && module.exports ) {
        module.exports = xx;
    } else {
        window.xx = xx;
    }

    // EXPOSE

} )( window );
