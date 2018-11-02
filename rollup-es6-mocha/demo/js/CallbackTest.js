// fire, fireWith, lock, locked, disable, disabled, empty, remove
// once memory unique stopOnFalse

var c = z.Callback();

function fn1 () {
    console.log( 1 );
}

function fn2 () {
    console.log( 2 );

    // c.lock();
}

function fn3 () {
    console.log( 3 );
}

c.add( fn1, [ fn2, fn3 ] );
c.fire();
c.fire();

c.add( fn1, fn1 );
c.fire();
