import { getToken } from '@/utils/token';

export default {
    methods: {

        setInfo ( data ) {
            this.$store.commit( 'SET_NAME', data.name );
            this.$store.commit( 'SET_ID', data.id );
            this.$store.commit( 'SET_EMAIL', data.email );
            this.$store.commit( 'SET_PHONE', data.phone );
            this.$store.commit( 'SET_STATUS', data.status );
            this.$store.commit( 'SET_AVATAR', data.avatar );
        },

        /**
         * 判断用户是否已经登录, 模拟用
         */
        isLogin () {
            if ( getToken() != null ) {
                this.$store.dispatch( 'LoginByUser', {
                    email: '11@11',
                    password: '111111'
                } ).then( response => {

                    if ( 1 === response.code ) {    // 登录成功
                        let { data } = response;

                        // 获取用户信息
                        this.setInfo( data );

                        // 成功跳转
                        this.$router.push( { name: 'home' } );
                    }
                } ).catch( err => {
                    console.log( '登录失效, 请重新登录!', err.code );
                } );
            } else {
                this.$router.push( { name: 'login' } );
            }
        }
    }
};
