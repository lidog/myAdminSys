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
               <router-link to="/homePage"><el-dropdown-item>首页</el-dropdown-item></router-link>
                <el-dropdown-item @click.native="dialogVisible=true">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div class="user-name dian">{{$store.getters.username}}</div>
          </div>
      </div>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <span>确定要退出平台吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="logout">确 定</el-button>
        </span>
      </el-dialog>

    </div>
</template>
<script>
    export default {
        data: function () {
            return {
              src:require("@/assets/images/user.png"),
              dialogVisible:false,
              username:''
            }
        },
        props:{
          isCollapse:{
              type:Boolean
          }
        },
        mounted(){

        },
        computed:{
          title:function () {
            return this.$route.meta.title
          }
        },
        methods:{
          hideLeftBar:function () {
            this.$emit('toggleLeft',!this.$props.isCollapse);
          },
          logout:function () {
            this.dialogVisible = false;
            this.$store.dispatch('Logout').then(()=>{
              this.$router.push({ path: '/'})
            });
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
    cursor: pointer;
  }
  .user-img{
    display: flex;
    align-items: center;
    img{
      width: 40px;
      height: 40px;
    }
    .user-name{
      margin-left: 10px;
      max-width: 100px;
      color: brown;
    }
  }
</style>
