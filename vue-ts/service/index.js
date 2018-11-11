/* eslint-disable */
const Webpack = require( '../node_modules/webpack' );
const WebpackDevServer = require( '../node_modules/webpack-dev-server' );
const webpackConfig = require( '../build/webpack.dev.conf' );

const bodyParser = require( '../node_modules/body-parser' );
const session = require( '../node_modules/express-session' );

webpackConfig.then( function ( data ) {
    const compiler = Webpack( data );
    const devServerOptions = Object.assign( {}, data.devServer, {
        stats: {
            colors: true
        },

        before ( app ) {

            app.use( bodyParser.json() );
            app.use( bodyParser.urlencoded( { extended: true } ) );
            app.use( session( {
                secret: 'my-secret',
                resave: false,
                saveUninitialized: true
            } ) );

            const click = require( './static/click' );
            app.get( '/gt/register-click', function ( req, res ) {

                // // 向极验申请每次验证所需的challenge
                click.register( null, function ( err, data ) {
                    if ( err ) {
                        console.error( err );
                        res.status( 500 );
                        res.send( err );
                        return;
                    }

                    if ( !data.success ) {

                        // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
                        // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

                        // 为以防万一，你可以选择以下两种方式之一：

                        // 1. 继续使用极验提供的failback备用方案
                        req.session.fallback = true;
                        res.send( data );

                        // 2. 使用自己提供的备用方案
                        // todo
                        console.log( 'failback===' );

                    } else {

                        // 正常模式
                        req.session.fallback = false;
                        res.send( data );
                    }
                } );
            } );
            app.post( '/gt/validate-click', function ( req, res ) {

                // 对ajax提供的验证凭证进行二次验证
                click.validate( req.session.fallback, {
                    geetest_challenge: req.body.geetest_challenge,
                    geetest_validate: req.body.geetest_validate,
                    geetest_seccode: req.body.geetest_seccode
                }, function ( err, success ) {

                    if ( err ) {

                        // 网络错误
                        res.send( {
                            status: 'error',
                            info: err
                        } );

                    } else if ( !success ) {

                        // 二次验证失败
                        res.send( {
                            status: 'fail',
                            info: '登录失败'
                        } );
                    } else {

                        res.send( {
                            status: 'success',
                            info: '登录成功'
                        } );
                    }
                } );
            } );
        }
    } );
    const server = new WebpackDevServer( compiler, devServerOptions );

    server.listen( 8080, '127.0.0.1', () => {
        console.log( 'Starting server on http://localhost:8080' );
    } );
} );
