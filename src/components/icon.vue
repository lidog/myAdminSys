<template>
      <i class="iconfont" :class="iconClass" :style="'font-size:'+ size +'px;'"></i>
</template>
<script>
    export default {
      props: {
        iconClass: {
          type: String
        },
        size:{
            type:Number,
        }
      },
      data: function () {
          return {}
      },
    }
</script>
<style scoped>
  i{
    margin-right: 5px;
  }

</style>
