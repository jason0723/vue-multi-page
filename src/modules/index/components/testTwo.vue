<template>
    <section>
      <div class="ensureBtn" @click="testOneFn">hello world</div>
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
