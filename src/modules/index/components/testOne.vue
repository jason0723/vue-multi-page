<template>
    <section>
      <div @click="testOneFn">你好</div>
    </section>
</template>

<script>
    export default {
        name: "testOne",
      data(){
          return {
            type:1
          }
      },
      methods:{
        testOneFn(){
          console.log(this.type);
          this.$router.push({
            name:"testTwo"
          })
        }
      }
    }
</script>

<style scoped>

</style>
