<template>
    <div class="top-bar">
      <div class="top-bar-left" @click="hideLeftBar" :class="isCollapse?'hide':''">
        <icon icon-class="icon-daohang" :size="30"/>
      </div>
      <div class="title">{{title}}</div>
      <div class="top-bar-right">
          <div class="user-img">
            <el-dropdown>
              <span class="el-dropdown-link">
                <img :src="src"/>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>首页</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
      </div>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
              src:require("@/assets/images/user.png"),
            }
        },
        props:{
          isCollapse:{
              type:Boolean
          }
        },
        computed:{
          title:function () {
            return this.$route.meta.title
          }
        },
        methods:{
          hideLeftBar:function () {
            this.$emit('toggleLeft',!this.$props.isCollapse);
          }
        }
    }
</script>
<style lang="scss" scoped>
  .top-bar{
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    border-bottom: solid 1px #e6e6e6;
  }
  .title{
    font-size: 20px;
    font-weight: 600;
  }
  .top-bar-left{
    cursor: pointer;
    transtion: all 0.5s;
  }
  .top-bar-left.hide{
    transform: rotate(-90deg);
  }

  .top-bar-right{
    margin-right: 20px;
  }
  .user-img{
    img{
      width: 40px;
      height: 40px;
    }
  }
</style>
