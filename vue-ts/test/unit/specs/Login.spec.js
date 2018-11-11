import Vue from 'vue';
import Login from '@/pages/login';
import i18n from '@/lang';
console.log( { i18n } );
Vue.use( {
    install: i18n
} );

describe( 'Login.vue', () => {
    const Constructor = Vue.extend( Login );
    const vm = new Constructor().$mount();

    it( 'should render correct contents', () => {
        console.log( 'xxxxxxxxxxxxxxxxxxxxxxxxxx' );
        expect( vm.$el.querySelector( 'h1.tit' ).textContent )
            .toEqual( 'Sign In' );
    } );

    // vm.validate = 'success';

    // it( 'email: 输入空', () => {

    //     vm.$el.querySelector( 'input[type="email"]' ).value = '';
    //     vm.$el.querySelector(
    //         '#app > div > div.login.v-card > div.v-card__actions > div:nth-child(2) > button > div'
    //     ).click();
    //     expect( vm.$el.querySelector( '.v-messages__wrapper' ).textContent )
    //         .toEqual( 'password cann\'t be empty' );
    // } );

    // it( 'email: 格式错误', () => {

    //     vm.$el.querySelector( 'input[type="email"]' ).value = '1';
    //     vm.$el.querySelector(
    //         '#app > div > div.login.v-card > div.v-card__actions > div:nth-child(2) > button > div'
    //     ).click();
    //     expect( vm.$el.querySelector( '.v-messages__wrapper' ).textContent )
    //         .toEqual( 'Please enter a valid address' );
    // } );
} );
