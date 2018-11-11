const click = require( '../../static/click' );

module.exports = function ( req, res ) {

    // 向极验申请每次验证所需的challenge
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
};
