import { apiVerifyUserInfo, apiVerifyUserEmail } from '@/api/login';

export default {
    methods: {

        // 用户信息验证
        verifyUserInfo () {

            // let inp = this.$refs.password.$el.querySelector( 'input' );

            if ( ( this.password || '' ).length >= 6 ) {

                apiVerifyUserInfo( this.email, this.password )
                    .then( response => {
                        console.log( '密码验证成功:', { data: {}, code: 1 } );
                        if ( 1 === response.code ) {
                            this.validate = 'success';
                            this.errorPasswordNum = undefined;

                            // 设置 cookies
                            // this.$store.commit( 'SET_TOKEN', {
                            //     name: response.data.name,
                            //     expires: .5
                            // } );
                        }
                    } ).catch( err => {
                        console.log( '用户名不存在!', err.code );
                        this.setErrPassword( 2 );

                        // inp.focus();
                    } );
            } else {

                this.validatePassword();

                // inp.focus();
            }
        },

        // 查找 email
        verifyUserEmail ( inp ) {
            apiVerifyUserEmail( this.email ).then( response => {
                console.log( '邮箱验证成功: ', response );
                this.isSecond = true;
                this.action = false;
            } ).catch( response => {
                console.log( '账号不存在: ', response );
                this.setErrEmail( 2 );
                inp.focus();
                this.action = false;
            } );
        }
    }
};
