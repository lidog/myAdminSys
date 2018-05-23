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

        <el-submenu v-if="item.children&&item.children.length>0" :index="`${item.name}`">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
          </template>
          <template v-for="child in item.children">
            <el-submenu v-if="child.children&&child.children.length>0" :index="`${child.name}`">
              <template slot="title">
                <i :class="child.icon"></i>
                <span>{{child.title}}</span>
              </template>
              <el-menu-item v-for="a in child.children" :index="`${a.name}`" v-bind:key="a.name">
                <i :class="child.icon"></i> {{a.title}}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="child.name">
              <icon :icon-class="child.icon" :size="30"/>
              {{child.title}}
            </el-menu-item>
          </template>
        </el-submenu>

        <el-menu-item v-else :index="`${item.name}`">
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>

      </template>

    </el-menu>
  </div>
</template>
<script>

  export default {
    computed: {},
    props: {
      isCollapse: {
        type: Boolean
      },
      menu:{
          type:Array
      }
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
