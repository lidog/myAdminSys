<template>
  <div>
    <left-view :isCollapse="isCollapse" class="layout-left" :class="isCollapse?'on':''"/>

    <div class="layout-right" :class="isCollapse?'on':''">
      <top-bar class="layout-top" :isCollapse="isCollapse" @toggleLeft="toggleLeft"/>

      <transition :name="transitionName">
        <router-view class="layout-main" name="main"/>
      </transition>

    </div>


  </div>
</template>


<script>

  import leftView from './leftView'
  import topBar from './topBar'

  export default {
    data: function () {
      return {
        isCollapse: false,
        transitionName: 'slide-left',
        isShow:false
      }
    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    },
    components: {
      leftView,
      topBar
    },
    methods: {
      toggleLeft: function () {
        this.isCollapse = !this.isCollapse;
      },
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
  }

  .layout-right.on {
    margin-left: 65px;
    .layout-main{
      left: 65px;
    }
  }
  .layout-main{
    position: absolute;
    left: 180px;
    top:50px;
    right:0;
    bottom: 0;
    background: #f5f6fa;
    transition: all .1s cubic-bezier(.55,0,.1,1);
  }

  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    transform: translate(100%, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    transform: translate(-80px, 0);
  }


</style>
