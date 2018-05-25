<template>
  <div>
    <div class="tools-bar">
      <div class="left">
        <el-button type="danger" icon="el-icon-delete" :size="size">删除</el-button>
        <el-button type="primary" icon="el-icon-plus" :size="size">添加</el-button>
        <el-button type="primary" icon="el-icon-circle-check-outline" :size="size">批量启用</el-button>
        <el-button type="primary" icon="el-icon-circle-close-outline" :size="size">批量停用</el-button>
      </div>
      <div class="right">
        <div class="table-pagination flex-box">
          <el-pagination
            background
            small
            layout="prev, pager, next,jumper"
            :total="100">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {}
    },
    props: {
      size: {
        type: String,
        default:''
      }
    }
  }
</script>
<style lang="scss" scoped>
  .tools-bar{
    display: flex;
    margin: 20px 0;
    padding:15px 20px;
    align-items: center;
    background-color: #fff;
    justify-content: space-between;
  }
</style>
