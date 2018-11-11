import Vue from 'vue';

import Router from 'vue-router';
import home from './home.js';

Vue.use( Router );

const routes = 'login hello parallax'.split( ' ' ).map( el => ( {
    path: `/${el}`,
    name: el,
    component ( resolve ) {
        require( [ `@/pages/${el}` ], resolve );
    }
} ) );

export default new Router( {
    routes: [
        {
            path: '/',
            redirect: '/home',
            name: 'home'
        }, {
            path: '/test',
            name: 'test',
            component ( resolve ) {
                require( [ '@/test' ], resolve );
            }
        },

        home,
        ...routes
    ]
} );
