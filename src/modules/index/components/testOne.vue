<template>
    <section>
      <div class="ensureBtn" @click="testOneFn">你好<span>nsdini</span></div>
    </section>
</template>

<script>
import api from "common/js/util/util";
export default {
  name: "testOne",
  data() {
    return {
      type: 1
    };
  },
  methods: {
    testOneFn() {
      // this.dataRequire();
      this.$router.push({
        name: "testTwo"
      });
    },
    dataRequire(){
      api.ajax({
        url: '/mcall/patient/customer/unite/v1/quickSendCode/',
        method: "POST", 
        data: {
          account: "18612784376", //帐号
          accountType:0, //帐号类型,0手机 1邮箱
          siteId:api.getSiteId()
        },
        timeout: 10000,
        done(res) {
          if (res && res.responseObject) {
            console.log(res)
          }
        }
      });
    }
  }
};
</script>


<style lang="scss" >
.ensureBtn{
  font-size: 56px;
  color: #000000;

}
</style>
