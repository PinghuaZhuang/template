<template>
    <div id="test">
        <h1>test</h1>
        <p>{{ $t("message.hello") }}</p>
    </div>
</template>

<script>
import { setToken } from './js-cookies';

export default {
    name: 'test',
    created () {

        // 单位是 天
        setToken( 'admin', .5 );

        console.log( 'this:', this );
        console.log( '$store:', this.$store );
        console.log( '$axios:', this.$axios );

        this.$axios.get( '/mork/userInfo.json' ).then( data => {
            console.log( 'data:', data );
        } );

        // $axios.all, $axios.get, $axios.post
    }
};
</script>
