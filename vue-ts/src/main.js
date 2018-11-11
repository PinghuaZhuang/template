// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from '@/store';
import axios from 'axios';

// 组件
import {
    Vuetify,
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions,
    VCard,
    VProgressLinear,
    VTextField,

    VParallax,
    VDivider,
    VSubheader,
    VTooltip,
    VForm,
    VAvatar,
    VAlert,
    VMenu
} from 'vuetify';

// css
import 'vuetify/src/stylus/app.styl';
import '@s/font/icon-google.css';
import '@/style/base.less';
import '@/style/transition.less';
import '@/assets/animate.css';

// js
// import i18n from '@/test/vue-i18n';
import i18n from '@/lang';

Vue.prototype.$axios = axios;

Vue.use( Vuetify, {
    components: {
        VApp,
        VNavigationDrawer,
        VFooter,
        VList,
        VBtn,
        VIcon,
        VGrid,
        VToolbar,
        transitions,
        VCard,
        VProgressLinear,
        VTextField,

        VParallax,
        VDivider,
        VSubheader,
        VTooltip,
        VForm,
        VAvatar,
        VAlert,
        VMenu
    }
} );

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue( {
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    store,
    i18n
} );
