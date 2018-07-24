<template>
    <!--<section class="consult-main-inner">-->
        <!--&lt;!&ndash;<transition name="fade">&ndash;&gt;-->
            <!--&lt;!&ndash;<toast :content="errorMsg" v-if="errorShow"></toast>&ndash;&gt;-->
        <!--&lt;!&ndash;</transition>&ndash;&gt;-->
        <!--&lt;!&ndash;<loading v-show="finish"></loading>&ndash;&gt;-->
      <!--<section>-->
        <!--<div @click="testOneFn()">testOne</div>-->
      <!--</section>-->
    <!--</section>-->
  <div class="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" style="min-height:100%"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" style="min-height:100%"></router-view>
    <!--<Loading v-if="$store.state.loading"></Loading>-->
  </div>
</template>
<script type="text/ecmascript-6">
    /**
     * @Desc：
     * @Usage:
     * @Notify：
     * @Depend：
     *
     * Created by jukun on 2018/7/24.
     */

    // import api from 'common/js/util/util';
    // import loading from 'components/loading';
    // import toast from 'components/toast';
    // import autosize from 'autosize';
    // import axios from "axios";
    // import confirm from 'components/confirm';

    const XHRList = {
        xhrItem: "",
    };
    export default {
        data() {
            return {
                finish: false,
                errorShow: false,
                errorMsg: '',
            }
        },
        mounted() {

        },
        activated() {

        },
        methods: {
          testOneFn(){
            this.$router.push({
              name:"testTwo"
            });
            console.log("testOne")
          }
        },
        components: {
            // loading,
            // toast,
            // confirm
        },
    }


</script>
<style lang="scss" rel="stylesheet/scss">
    /*@import "../../../../../scss/library/_common-modules";*/

</style>
