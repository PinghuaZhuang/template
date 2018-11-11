<template>
    <footer>
        <span class="l fl" @click="changeLang">
            {{ $t( 'login.lang' ) }}
            <v-icon size="18" class="icon">keyboard_arrow_down</v-icon>
        </span>
    </footer>
</template>

<script>
export default {
    name: 'foot',
    methods: {
        changeLang () {
            this.$i18n.locale = ( this.$i18n.locale === 'zh' ? 'en' : 'zh' );
        }
    }
};
</script>

<style lang="less">
@import url("../../../style/mixins.less");

footer {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translateY(100%);
    padding-top: 24px;
    height: 0;
    width: 100%;
}

.l {
    position: relative;
    padding: 8px 24px 8px 16px;
    text-align: center;
    width: 100px;

    .icon {
        position: absolute;
        right: 4px;
        top: 50%;
        transform: translateY(-50%);

    }
    &:hover {
            cursor: pointer;
        }

    // &::after {
    //     content: "";
    //     position: absolute;
    //     right: 0;
    //     top: 50%;
    //     transform: translateY(-50%);
    //     .setWH( 10px, 10px );
    //     background-color: blue;
    // }
}

</style>
