<template>
  <div>
    <div class="tools-bar">
      <div class="left">
        <el-button v-if="delB" type="danger" icon="el-icon-delete" @click="del" :size="btnSize">删除</el-button>
        <el-button v-if="addB" type="primary" icon="el-icon-plus" @click="add" :size="btnSize">添加</el-button>
        <el-button v-if="batchStartB" type="primary" icon="el-icon-circle-check-outline" @click="batchStart"
                   :size="btnSize">批量启用
        </el-button>
        <el-button v-if="batchStopB" type="primary" icon="el-icon-circle-close-outline" @click="batchStop" :size="btnSize">
          批量停用
        </el-button>
      </div>
      <div class="right">
        <div class="table-pagination flex-box">
          <el-pagination
            background
            small
            :page-sizes="pageSize"
            layout="sizes,prev, pager, next,jumper"
            :total="toolsPagination.total"
            @size-change="sizeChange"
            @current-change="currentChange"
            @prev-click="prevClick"
            @next-click="nextClick"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        delB: false,
        addB: false,
        batchStartB: false,
        batchStopB: false,
        toolsPagination:{}
      }
    },
    props: {
      btnSize: {
        type: String,
        default: 'small'
      },
      btn: {
        type: Array,
        default: () => {
          return []
        }
      },
      pageSize: {
        type: Array,
        default: () => {
          return [10, 20, 30, 40, 100]
        }
      },
      //页码选择参数
      pagination: {
        type: Object,
        default:()=>{
            return {
              total:0,//列表总数
              page:1, //当前页码
              rows: 10//每页的条数
            }
        }
      }
    },
    mounted(){
      if (this.btn.length > 0) {
        this.delB = this.btn.indexOf('del') != -1 ? true : false;
        this.addB = this.btn.indexOf('add') != -1 ? true : false;
        this.batchStartB = this.btn.indexOf('batchStart') != -1 ? true : false;
        this.batchStopB = this.btn.indexOf('batchStop') != -1 ? true : false;
      }
      this.toolsPagination = this.pagination;
    },
    methods: {
      //每个按钮都触发父组件对应的事件
      del(){
        this.$emit('delSelect')
      },
      add(){
        this.$emit('add')
      },
      batchStart(){
        this.$emit('batchStart')
      },
      batchStop(){
        this.$emit('batchStop')
      },
      //下面四个方法，都改变 Pagination 的值 然后回传到父组件，触发更新数据
      sizeChange(size){
        this.toolsPagination.rows = size
        this.$emit('paginationChange', this.toolsPagination)
      },
      currentChange(pageNum){
        this.toolsPagination.page = pageNum
        this.$emit('paginationChange', this.toolsPagination)
      },
      prevClick(pageNum){
        this.toolsPagination.page = pageNum
        this.$emit('paginationChange', this.toolsPagination)
      },
      nextClick(pageNum){
        this.toolsPagination.page = pageNum
        this.$emit('paginationChange', this.toolsPagination)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .tools-bar {
    display: flex;
    margin: 20px 0;
    padding: 15px 20px;
    align-items: center;
    background-color: #fff;
    justify-content: space-between;
  }
</style>
