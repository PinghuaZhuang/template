<template>
    <div>
        <div class="mask" v-show="action"></div>

        <v-card class="login" ref="login"
            width="450"
            @keydown.enter="next">

            <!-- tip -->
            <v-alert class="alert" :value="true" type="info">
                email: 11@11&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password: 111111
            </v-alert>

            <!-- 进度条 -->
            <v-progress-linear
                v-show="action"
                class="progress"
                height="4"
                :indeterminate="action"
                backgroundColor="grey lighten-3"
                color="orange"></v-progress-linear>

            <!-- google 图标 -->
            <Google></Google>

            <!-- 登陆提示 -->
            <v-card-title>
                <h1 class="tit">{{ $t( 'login.signInTit' ) }}</h1>
                <div class="txt">
                    {{ $t( 'login.signInTxt' ) }}
                </div>
            </v-card-title>

            <!-- 输入用户信息 -->
            <v-form v-model="valid" ref="form">
                <v-text-field class="user-info" ref="email"
                    v-show="!isSecond"
                    v-model.trim="email"
                    :color="color"
                    :label="$t( 'login.emailOrPhone' )"
                    autofocus
                    type="email"
                    clearable
                    :error="!!errEmail"
                    :error-messages="errEmail"
                    @input.native="errorEmailNum = undefined"
                    ></v-text-field>
                <v-text-field class="user-info" ref="password"
                    v-if="isSecond"
                    v-model.trim="password"
                    :color="color"
                    :label="$t( 'login.password' )"
                    autofocus
                    type="password"
                    clearable
                    :error="!!errPassword"
                    :error-messages="errPassword"
                    @input.native="errorPasswordNum = undefined"
                    ></v-text-field>
            </v-form>

            <!-- 忘记密码 -->
            <section class="rember">
                <v-btn class="rember-txt" flat color="info" ripple dark>{{ $t( 'login.forgetEmail' ) }}</v-btn>
            </section>

            <!-- 登陆验证 -->
            <!-- <transition name="fade">
                <div id='captcha' v-if="isSecond" :style="{ height: !!isSecond * 76 + 'px' }"></div>
            </transition> -->
            <section id='captcha' v-if="isSecond" :style="{ height: !!isSecond * 76 + 'px' }"></section>

            <!-- 帮助 -->
            <section class="help">
                <span class="t">{{ $t( 'login.problem' ) }}</span>
                <v-btn class="rember-txt" flat color="info" ripple dark small ref="btn">{{ $t( 'login.details' ) }}</v-btn>
            </section>

            <!-- 下一步 -->
            <v-card-actions>
                <div class="half">
                    <v-btn flat color="info" ripple dark
                        @click="signUp"
                        >{{ $t( 'login.signUp' ) }}</v-btn>
                </div>
                <div class="half">
                    <v-btn color="info" class="next" ripple dark @click.native="next">{{ msg }}</v-btn>
                </div>
            </v-card-actions>

            <Foot></Foot>
        </v-card>
    </div>
</template>

<script>
import '@/assets/gt';
import geetest from './mixins/geetest';
import login from './mixins/login';
import mixins from '@/utils/mixins';

// 组件
import Google from '@/components/logo/Google.vue';
import Foot from './components/foot';

// 样式
import '@/style/login.less';

export default {
    name: 'login',
    mixins: [ geetest, login, mixins ],
    components: {
        Google,
        Foot
    },

    data () {
        return {
            isSecond: false,
            validate: false,
            action: false,
            captchaMsg: false,

            email: undefined,
            password: undefined,
            captchaObj: undefined,
            valid: undefined,

            color: 'info',
            errorEmailNum: undefined,
            errorPasswordNum: undefined
        };
    },

    created () {
        this.validate = false;
        this.captchaObj = null;

        // 判断用户是否登录
        this.isLogin();
    },

    mounted () {
        this.$nextTick( () => {
            this.$refs.form.$el.onsubmit = () => false;
        } );
    },

    computed: {

        // 国际化
        msg () {
            if ( this.isSecond ) {
                return this.$t( 'login.next[ 1 ]' );
            }
            return this.$t( 'login.next[ 0 ]' );
        },
        errEmail () {
            if ( typeof this.errorEmailNum === 'number' ) {
                return this.$t( `login.error.email[ ${this.errorEmailNum} ]` );
            }
            return '';
        },
        errPassword () {
            if ( typeof this.errorPasswordNum === 'number' ) {
                return this.$t( `login.error.password[ ${this.errorPasswordNum} ]` );
            }
            return '';
        }
    },

    watch: {
        validate ( val ) {
            if ( true === val ) {

                // 用户信息验证
                this.verifyUserInfo();
            }
        },
        isSecond ( val ) {
            if ( val ) {
                this.gt();
            }
        }
    },

    methods: {
        captchaReset () {
            this.validate = false;
            try {
                this.captchaObj.reset();
            } catch ( err ) {

            }
        },
        setErrEmail ( num ) {
            this.errorEmailNum = num;
        },
        setErrPassword ( num, flag ) {
            this.errorPasswordNum = num;
            if ( !flag ) {
                this.captchaReset();
            }
        },
        validatePassword () {
            if ( this.password == null || this.password === '' ) {
                this.setErrPassword( 0 );
            } else {
                this.setErrPassword( 1 );
            }
        },

        next () {

            if ( this.action ) {
                return;
            }

            if ( this.isSecond ) {
                this.nextPassword();
            } else {
                this.nextEmail();
            }
        },

        nextEmail () {
            let inp = this.$refs.email.$el.querySelector( 'input' );

            if ( /.+@.+/.test( this.email ) ) {

                this.action = true;

                window.setTimeout( () => {
                    this.verifyUserEmail( inp );
                }, 1000 );
            } else {

                if ( this.email == null || this.email === '' ) {
                    this.setErrEmail( 0 );
                } else {
                    this.setErrEmail( 1 );
                }
                inp.focus();
            }
        },

        nextPassword () {

            // 先验证
            if ( 'success' !== this.validate ) {
                return this.setErrPassword( 3, true );
            }

            this.action = true;
            window.setTimeout( () => {
                this.$store.dispatch( 'LoginByUser', {
                    email: this.email,
                    password: this.password
                } ).then( response => {

                    if ( 1 === response.code ) {    // 登录成功
                        let { data } = response;

                        // 设置 cookies
                        this.$store.commit( 'SET_TOKEN', {
                            name: data.name,
                            expires: .5
                        } );

                        console.log( '登录成功:', data );

                        // 获取用户信息
                        this.setInfo( data );

                        // 成功跳转
                        this.$router.push( { name: 'home' } );
                    } else {
                        this.action = false;
                        this.captchaReset();
                    }
                } ).catch( err => {
                    this.action = false;
                    this.captchaReset();
                    console.log( 'err:', err );
                    throw new Error( `登录失败: ${err.code}` );
                } );

            }, 1000 );
        },

        /**
         * 创建账号
         */
        signUp () {

        }
    }
};
</script>

<style scoped lang="less">
@import url("../../style/mixins.less");
@import url("../../style/params.less");

#wait {
    text-align: center;
}
#captcha {
    @p : 16px;

    height: 0;
    padding-top: @p;
    padding-bottom: @p;
    padding-left: 16px;
    // transition: height .3s;
}

.mask {
    .setWH();
    .setPositon();
    background-color: black;
    opacity: .3;
    z-index: 2;
}

.login {
    border-radius: @login-radius;
    padding: @login-padding;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    // overflow: hidden;
    margin: auto;
    // transition: height .1s;

    .alert {
        width: 100%;
        position: absolute;
        left: 0;
        top: -100px;
        border-style: none;
        border-top-left-radius: initial!important;
        border-top-right-radius: initial!important;
    }

    .progress {
        .setWH( 100%, 10px );
        position: absolute;
        top: 0;
        left: 0;
        margin: 0;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }

    .tit {
        font-weight: normal;
        font-size: 24px;
        width: 100%;
    }

    .txt {
        font-size: 16px;
        letter-spacing: .2px;
        line-height: 1.5;
    }

    .half {
        float: left;

        .next {
            float: right;
        }
    }

    .help {
        padding: 20px 0 20px 8px;
        color: #757575;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        border-radius: 2px;
        display: -webkit-inline-box;
        display: -ms-inline-flexbox;
        display: inline-flex;
        height: 36px;
        -webkit-box-flex: 0;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        font-size: 14px;
        font-weight: 500;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        margin: 6px 8px;
        min-width: 88px;
        outline: 0;
        text-transform: uppercase;
        text-decoration: none;
        -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), color 1ms;
        transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), color 1ms;
        position: relative;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        .t {
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            border-radius: inherit;
            color: inherit;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            height: inherit;
            -webkit-box-flex: 1;
            -ms-flex: 1 0 auto;
            flex: 1 0 auto;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            margin: 0 auto;
            position: relative;
            -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
            transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
            white-space: nowrap;
        }
    }

    /* 输入用户名 */
    .user-info {
        @p: 16px;

        padding-left: 16px;
        padding-top: @p;
        padding-bottom: @p;
        // margin-top: 16px;
    }

    /* 帮助 */
    .rember {

        padding-bottom: 10px;
        padding-top: 10px;
    }
    .rember-txt {
        height: auto;
        font-size: 15px;
    }
}

</style>
