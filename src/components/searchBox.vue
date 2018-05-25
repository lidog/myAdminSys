<template>
  <div class="content">
    <div class="content-top" v-show="fix" :class="hide?'fix-height':''" id="contentTop"></div>
    <div class="table-top" :class="fix?'fix':''">
      <div class="search-box flex-box"  id="search" ref="searchBox">
        <el-form  :class="hide?'hide':''" id="forms" :model="searchForm" label-width="80px">
          <el-form-item label="用户姓名">
            <el-input placeholder="请输入内容" v-model="searchForm.username"></el-input>
          </el-form-item>
          <el-form-item label="用户账号">
            <el-input placeholder="请输入内容" v-model="searchForm.userAccount"></el-input>
          </el-form-item>
        </el-form>
        <div class="search-btn">
          <el-button type="primary" @click="search"> 查 询 </el-button>
        </div>
        <div class="more-option" v-if="more" @click="hide=!hide"><icon icon-class="icon-jiantouxia" :size="20"></icon></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        searchForm: {
          username: '',
          userAccount: ''
        },
        fix: false,
        hide:false,
        more:false,
        normalHeight:0
      }
    },
    mounted(){
        //监听滚动事件和 点击其他地方
      window.addEventListener('scroll', this.scroll)
      document.addEventListener('click', this.handleDocumentClick);

      this.normalHeight = this.$refs.searchBox.offsetHeight;
        if(this.normalHeight>179){
          this.hide = true;
          this.more = true;
          document.getElementById('forms').style.height = this.normalHeight + 'px';
          document.getElementById('contentTop').style.height = this.normalHeight + 'px';
        }
    },
    methods: {
      scroll(){
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        scrollTop > 60 ? this.fix = true : this.fix = false;
      },
      search(){
        this.$emit('search', this.searchForm);
      },
      handleDocumentClick(e) {
        //e.target 是点击的div；
        //this.$el 是运行该方法的组件
        //意思：如果当前组件不包含点击目标，就hide
        if (!this.$el.contains(e.target)&&this.normalHeight>179) {
          this.hide = true;
        }
      },
    }
  }
</script>
<style lang="scss" scoped>
  /*吸顶*/
  .fix{
    position: fixed;
    top: 0;
    left: 180px;
    right: 0;
    z-index: 10;
  }
  .content{
    position: relative;
  }
  .content-top.fix-height{
    width: 100%;
    height: 95px!important;
  }
  .table-top {
    border-bottom: solid 1px #e6e6e6;
    background-color: #fffffff0;
    box-shadow: 1px 0 5px #ccc;
  }
  .search-box {
    justify-content: space-between;
    position: relative;
  }
  .more-option{
    cursor: pointer;
    position: absolute;
    bottom: -22px;
    left: 50%;
    text-align: center;
    width: 25px;
    height: 25px;
    transform: rotate(45deg) translate(0,-50%);
    background-color: #fff;
    box-shadow: 3px 3px 5px #ccc;
    i{
      position: absolute;
      top: 15%;
      left: 78%;
      transform:rotate(-45deg) translate(-50%,-50%);
      color: #ccc;
    }
  }
  .el-form {
    padding: 10px;
    width: 75%;
    z-index: 2;
    transition: all 0.2s;
    overflow: hidden;
    text-align: left;
    .el-form-item {
      min-width: 35%;
      margin-bottom: 0;
      margin-right: 5%;
      display: inline-block;
    }
  }
  .el-form.hide{
    height: 95px!important;
  }

  .search-btn {
    width: 20%;
    display: flex;
    padding-top: 10px;
    align-self: flex-start;
    justify-content: center;
  }

  .search-box /deep/ .el-input__inner {
    height: 30px;
    line-height: 30px;
  }

</style>

