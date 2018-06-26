<template>
  <div ref="content">
    <search-box @search="upData">
      <el-form-item label="用户姓名">
        <el-input placeholder="请输入内容" v-model="searchForm.username"></el-input>
      </el-form-item>
      <el-form-item label="用户账号">
        <el-input placeholder="请输入内容" v-model="searchForm.userAccount"></el-input>
      </el-form-item>
    </search-box>
    <div class="table-bot">
      <table-tools :btn="['del','add','batchStart','batchStop']" :pagination="pagination" @paginationChange="paginationChange"/>
      <el-table :data="tableData" stripe style="width: 100%" size="small" @row-dblclick="editSelect"
                @selection-change="selectData">
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="realName" label="姓名" width="80"/>
        <el-table-column prop="mobilePhone" label="电话"/>
        <el-table-column prop="gender" label="性别" width="80"/>
        <el-table-column prop="emailAddress" label="邮件"/>
        <el-table-column prop="loginName" label="用户账号"/>
        <el-table-column prop="loginPassword" label="密码" width="200"/>
        <el-table-column prop="status" label="状态" width="100"/>
        <el-table-column prop="createTime" label="创建时间"/>
        <el-table-column prop="updateTime" label="更新时间"/>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="editSelect(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="编辑" :visible.sync="dialogVisible">
      <detail-form :formData="itemData" @doCancel="doCancel" @doSave="doSave"/>
    </el-dialog>
  </div>
</template>
<script>
  import searchBox from '@/components/searchBox'
  import detailForm from './detailForm.vue'
  import tableTools from '@/components/tableTools'

  export default {
    data: function () {
      return {
        tableData: [],  //渲染数据
        data: [], //缓存数据
        itemData: {},
        dialogVisible: false,
        hadSelected: [],
        pagination: { //页码变量（默认值）
          total: 0,//列表总数
          page: 1, //当前页码
          rows: 10//每页的条数
        },
        searchForm: {
          username: '',
          userAccount: ''
        },
      }
    },
    components: {
      searchBox,
      tableTools,
      detailForm
    },
    mounted(){
      this.upData();
    },
    methods: {
      upData(){
        this.$http("/api/table").then(table => {
          let rows = table.rows;
          this.data = this.tools.cloneObj(rows);
          if (rows.length > 0) {
            rows.map(function (item) {
              item.gender = item.gender == 0 ? "女" : "男";
              item.status = item.status == 0 ? "停用" : "启用";
            })
            this.tableData = rows;
            this.pagination.total = rows.length;
          }
        })
      },
      paginationChange(pagination){
        this.pagination = pagination
      },
      editSelect(e){
        let realName = e.realName;
        let item = this.data.filter(o => {
          return o.realName == realName;
        });
        if (item.length > 0) {
          this.itemData = item[0];
          this.dialogVisible = true;
        }
      },
      selectData(e){
        this.hadSelected = e;
      },
      doCancel(){
        this.dialogVisible = false;
      },
      doSave(data){
        this.$message({
          message: '保存成功',
          type: 'success'
        });
        this.dialogVisible = false;
      },
      del(){
        this.$confirm('确定要删除？', '删除数据', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        }).catch(() => {
          return;
        });
      },
    }
  }
</script>
<style lang="scss">
  .table-bot {
    margin: 0 20px;
  }

  .el-table thead {
    font-size: 14px;
  }
</style>
