<template>
  <div>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :hide-timeout="0"
      :router="true"
      :default-active="$route.meta.index"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >

      <template v-for="item in menu">

        <el-submenu v-if="item.children&&item.children.length>0" :index="`${item.title}`">
          <template slot="title">
            <icon :icon-class="item.icon"></icon>
            <span>{{item.title}}</span>
          </template>
          <template v-for="child in item.children">
            <el-submenu v-if="child.children&&child.children.length>0" :index="`${child.title}`">
              <template slot="title">
                <icon :icon-class="child.icon"></icon>
                <span>{{child.title}}</span>
              </template>
              <el-menu-item v-for="a in child.children" :index="`${a.name}`" v-bind:key="a.name">
                <icon :icon-class="child.icon"></icon> {{a.title}}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="child.name">
              <icon :icon-class="child.icon"/>
              {{child.title}}
            </el-menu-item>
          </template>
        </el-submenu>

        <el-menu-item v-else :index="`${item.name}`">
          <icon :icon-class="item.icon"></icon>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>

      </template>

    </el-menu>
  </div>
</template>
<script>

  export default{
    data(){
        return{
          menu:null
        }
    },
    mounted(){
      //通用页面路由
      let commonPage = [
        {
          "icon":"icon-weibiaoti1",
          "name":"homePage",
          "title":"首页",
        },
      ]
      //动态路由
      this.menu = commonPage.concat(this.$store.getters.router)
    },
    props: {
      isCollapse: {
        type: Boolean
      },
    },
    methods: {}
  }
</script>
<style scoped>
  .el-menu {
    border: none;
    text-align: left;
  }

  .el-menu .el-submenu .el-menu-item {
    min-width: 180px !important;
    background-color: #1f2d3d !important;
  }

</style>
