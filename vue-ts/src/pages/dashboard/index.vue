<template>
    <v-layout row wrap class="dashboard">
        <v-flex xs12 sm6>
            <Avatar></Avatar>
        </v-flex>
        <v-flex xs12 sm3>
            <Avatar></Avatar>
        </v-flex>
        <v-flex xs12 sm3>
            <Avatar></Avatar>
        </v-flex>
    </v-layout>
</template>

<script>

// 组件
import Avatar from './components/avatar';

export default {
    name: 'dashboard',
    components: {
        Avatar
    },
    data () {
        return {
            show: true,
            hover: false,

            progressList: [
                { title: 'CSS', value: 24 },
                { title: 'JavaScript', value: 50 },
                { title: 'Vue', value: 100 }
            ]
        };
    },

    mounted () {
    },

    methods: {
    }
};
</script>

<style lang="less">
@import url("../../style/mixins.less");

.dashboard {

}

</style>
