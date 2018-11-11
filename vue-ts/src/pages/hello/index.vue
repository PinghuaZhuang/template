<template>
    <div class='hello'>
        <div id='captcha'>
            <p id='wait' class='show'>正在加载验证码......</p>
        </div>
        <br/>
        <button ref='btn' @click.once='get'>get</button>
        <br/>
        <button id='btn'>登录</button>
    </div>
</template>

<script>
import $ from 'jquery';
import '@/assets/gt';

export default {
    name: 'HelloWorld',
    data () {
        return { };
    },

    methods: {
        get () {
            if ( process.env.NODE_ENV !== 'production' ) {
                $.get( '/gt/register-click' ).done( data => this._initGeetest( data ) );
            } else {
                import( 'service/static/click' ).then( click => {
                    click.register( null, ( err, data ) => this._initGeetest( data ) );
                } );
            }
        },

        gtDemo ( captchaObj ) {
            captchaObj.appendTo( '#captcha' );
            captchaObj.onReady( () => {
                $( '#wait' ).hide();
            } );

            $( '#btn' ).click( () => {
                var result = captchaObj.getValidate();

                if ( !result ) {
                    return alert( '请完成验证' );
                }

                if ( process.env.NODE_ENV !== 'production' ) {
                    $.ajax( {
                        url: 'gt/validate-click',
                        type: 'POST',
                        data: {

                            // username: $('#username2').val(),
                            // password: $('#password2').val(),
                            geetest_challenge: result.geetest_challenge,
                            geetest_validate: result.geetest_validate,
                            geetest_seccode: result.geetest_seccode
                        },
                        success ( data ) {
                            if ( data.status === 'success' ) {
                                alert( '登录成功' );
                            } else if ( data.status === 'fail' ) {
                                alert( '登录失败，请完成验证' );
                                captchaObj.reset();
                            }
                        }
                    } );
                } else {
                    import( 'service/static/click' ).then( click => {
                        click.validate( false, {
                            geetest_challenge: result.geetest_challenge,
                            geetest_validate: result.geetest_validate,
                            geetest_seccode: result.geetest_seccode
                        }, ( err ) => {

                            if ( err ) {
                                alert( '登录失败，请完成验证' );
                                captchaObj.reset();
                            } else {
                                alert( '登录成功' );
                            }
                        } );
                    } );
                }

            } );

            // 更多前端接口说明请参见：http://docs.geetest.com/install/client/web-front/
        },

        _initGeetest ( data ) {

            // 调用 initGeetest 进行初始化
            // 参数1：配置参数
            // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
            initGeetest( {

                // 以下 4 个配置参数为必须，不能缺少
                gt: data.gt,
                challenge: data.challenge,
                offline: !data.success, // 表示用户后台检测极验服务器是否宕机
                new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机

                product: 'popup', // 产品形式，包括：float，popup
                width: '300px'

                // 更多前端配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
            }, this.gtDemo );
        }
    }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

#captcha {
    width: 300px;
    display: inline-block;
}

#wait {
    text-align: left;
    color: #666;
    margin: 0;
}
</style>
