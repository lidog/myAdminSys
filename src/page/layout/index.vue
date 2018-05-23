<template>
  <div>
    <left-view :menu="menu" :isCollapse="isCollapse" class="layout-left" :class="isCollapse?'on':''"/>
    <div class="layout-right" :class="isCollapse?'on':''">
      <top-bar class="layout-top" :isCollapse="isCollapse" @toggleLeft="toggleLeft"/>
      <router-view class="layout-main" name="main"/>
    </div>
  </div>
</template>
<script>

  import leftView from '@/page/leftView'
  import topBar from '@/page/topBar'
  import {getToken} from '@/util/cookie'
  import {getRouter} from '@/util/getRouter'

  export default {
    data: function () {
      return {
        isCollapse: false,
        menu:null
      }
    },
    mounted(){
      let token = getToken(), _this = this;
      if (!token) {
        this.$confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.$store.dispatch("Logout").then(() => {
            _this.$router.push({path: '/'})
          })
        }).catch(() => {
          _this.$store.dispatch("Logout").then(() => {
            _this.$router.push({path: '/'})
          })
        });
      }
      //通用页面
      let commonPage = [
        {
          "icon":"el-icon-service",
          "name":"homePage",
          "title":"首页",
        },
      ]
      //动态路由
      this.menu = commonPage.concat(_this.$store.getters.router)
    },
    components: {
      leftView,
      topBar
    },
    methods: {
      toggleLeft: function () {
        this.isCollapse = !this.isCollapse;
      }
    }
  }
</script>
<style lang="scss">
  .layout-left.on {
    width: 65px !important;
  }

  .layout-left {
    -webkit-transition: width .28s;
    transition: width .28s;
    width: 180px !important;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    background-color: #304156;
  }

  .layout-right {
    min-height: 100%;
    -webkit-transition: margin-left .28s;
    transition: margin-left .28s;
    margin-left: 180px;
    background: #fff;
  }

  .layout-right.on {
    margin-left: 65px;
  }
</style>
