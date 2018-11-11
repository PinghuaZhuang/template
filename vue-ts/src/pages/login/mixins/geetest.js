import $ from 'jquery';

export default {
    methods: {

        /**
         * 极客验证初始化时机
         */
        gt () {

            if ( process.env.NODE_ENV !== 'production' ) {
                $.get( '/gt/register-click' ).done( data => this._initGeetest( data ) );
            } else {
                import( 'service/static/click' ).then( click => {
                    click.register( null, ( err, data ) => this._initGeetest( data ) );
                } );
            }
        },

        /**
         * 极客验证实例完成
         */
        gtDemo ( captchaObj ) {
            this.captchaObj = captchaObj;
            captchaObj.appendTo( '#captcha' );

            captchaObj.onReady( () => this.captchaMsg = false );

            captchaObj.onSuccess( () => {

                let result = captchaObj.getValidate();

                if ( !result ) {
                    return this.setErrPassword( 3 );
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
                        success: function ( data ) {

                            if ( data.status === 'success' ) {

                                // 验证成功
                                this.validate = true;
                            } else if ( data.status === 'fail' ) {
                                this.setErrPassword( 3 );
                            }
                        }.bind( this )
                    } );
                } else {
                    import( 'service/static/click' ).then( click => {
                        click.validate( false, {
                            geetest_challenge: result.geetest_challenge,
                            geetest_validate: result.geetest_validate,
                            geetest_seccode: result.geetest_seccode
                        }, ( err ) => {
                            this.validate = false;

                            if ( err ) {
                                console.log( '登录失败，请完成验证' );
                                this.captchaReset();
                            } else {

                                // 打包后默认成功
                                if ( process.env.NODE_ENV === 'production' ) {
                                    this.validate = true;
                                }
                                console.log( '登录成功' );
                            }
                        } );
                    } );
                }
            } );
        },

        /**
         * 极客验证初始化
         */
        _initGeetest ( data ) {

            initGeetest( {

                gt: data.gt,
                challenge: data.challenge,
                offline: !data.success,
                new_captcha: data.new_captcha,

                product: 'popup',
                width: '100%'

            }, this.gtDemo );
        }
    }
};
