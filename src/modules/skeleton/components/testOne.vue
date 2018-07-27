<template>
    <section>
      <div class="ensureBtn" @click="testOneFn">你好 <span>sdf</span></div>
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


