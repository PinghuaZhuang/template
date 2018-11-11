<template>
    <div class="avatar-container">
        <v-card>
            <v-card-media class="img"
                src="/static/images/bg.png"
                height="200px"
                >
            </v-card-media>

            <v-card-actions class="actions">

                <v-avatar class="avatar" size="55" color="white">
                    <!-- class="animated bounce"  -->
                    <img :class="[ 'avator', {
                        animated: hover,
                        bounce: hover
                    } ]"
                        @mouseenter="hover = true"
                        @animationend="hover = false"
                        :src="$store.state.user.avatar"
                        :alt="$store.state.user.name">
                </v-avatar>

                <v-spacer></v-spacer>
                <v-btn icon @click="show = !show">
                    <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                </v-btn>
            </v-card-actions>

            <div :class="[ 'progress', { b: !show } ]">
                <div v-for="(item, index) in progressList" :key="index">
                    <span class="label" v-show="show">{{ item.title }}</span>
                    <v-progress-linear v-show="show" v-model="item.value"
                            :color="item.value === 100 ? 'success' : 'info'"></v-progress-linear>
                    <div class="check" v-show="show">
                        <span v-if="item.value !== 100">{{ `${item.value}%` }}</span>
                        <v-icon color="success" v-if="item.value === 100">check_circle</v-icon>
                    </div>
                </div>
            </div>

        </v-card>

        <div id="xx"></div>
    </div>
</template>
<script>

export default {
    name: 'avator',
    data () {
        return {
            show: true,
            hover: false,

            progressList: [
                { title: 'CSS', value: 0 },
                { title: 'JavaScript', value: 0 },
                { title: 'Vue', value: 0 }
            ]
        };
    },

    mounted () {

        this.$nextTick( () => {
            window.setTimeout( () => {
                this.progressList[ 0 ].value = 24;
                this.progressList[ 1 ].value = 50;
                this.progressList[ 2 ].value = 100;
            }, 200 );
        } );
    },

    methods: {
    }
};
</script>

<style lang="less">
@import url("../../../style/mixins.less");

@p: 20px;

.avatar-container {
    padding: @p;

    /* 图片缩放 */
    .img {
        &:hover .v-card__media__background {
            transform: scale(1.1);
        }

        .v-card__media__background {
            transition: transform 1s;
        }
    }

    /* 头像设置 */
    .actions {
        position: relative;
        padding: @p/2;

        .avatar {
            position: absolute;
            top: 0;
            left: @p;
            transform: translateY(-50%);
            border: 5px solid #fff;
            box-sizing: content-box;
        }
    }

    .progress {
        padding: 0 @p @p @p;

        .v-progress-linear {
            border-radius: 3.5px;
            position: relative;
        }

        > div {
            position: relative;
            padding: 0 @p+20px 0 @p;

            .check {
                .setWH( 24px );
                position: absolute;
                right: @p;
                bottom: 3.5px;
                transform: translateY(50%) translateX(50%);
            }
        }
    }
    .progress.b {
        padding-bottom: 0;
    }
}

</style>
