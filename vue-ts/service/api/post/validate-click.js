const click = require( '../../static/click' );

module.exports = function ( req, res ) {

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
};
