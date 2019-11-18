<template>
  <div style="background: #F7F8FA;">
    <top v-model="selectedList" :selectedMap.sync="selectedMap"></top>
    <div class="content flex">
      <left v-model="selectedList"  :selectedMap.sync="selectedMap" class="left"></left>
      <mid  v-model="selectedList"  :selectedMap.sync="selectedMap" class="mid" ref="mid"></mid>
      <right class="right" @select="(item)=>$refs[`mid`].refresh(item)"></right>
    </div>
  </div>
</template>
<script>
    import top from './components/top'
    import left from './components/left'
    import mid from './components/mid'
    import right from './components/right'

    export default {
        components: {top, left, mid, right},
        data: function () {
            return {
                selectedList: [],//选择的题目
                selectedMap: {},
            }
        },
        watch:{
            selectedList(val){
                console.log(val.map(item=>item.question_item_id).join())
            }
        },
    }
</script>
<style lang="scss" scoped>
  @import "module";

  .content {
    box-sizing: border-box;
    overflow: hidden;
    height: calc(100vh - 61px);
    min-width: 1500px;
    width: 1628px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 24px;
    align-items: flex-start;
  }

  .left {
    width: 764px;
  }

  .mid {
    margin-left: 16px;
    width: 528px;
    height: 100%;
  }

  .right {
    width: 320px;
    height: 100%;
  }
</style>
