const bodyParser = require( 'body-parser' );
const session = require( 'express-session' );
const registerClick = require( './get/register-click' );
const validateClick = require( './post/validate-click' );

module.exports = {
    before: function ( app ) {
        app.use( bodyParser.json() );
        app.use( bodyParser.urlencoded( { extended: true } ) );
        app.use( session( {
            secret: 'my-secret',
            resave: false,
            saveUninitialized: true
        } ) );

        app.get( '/gt/register-click', registerClick );
        app.post( '/gt/validate-click', validateClick );
    }
};
