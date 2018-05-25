<template>
  <div ref="content">
    <search-box @search="search"/>
    <div class="table-bot">
      <table-tools :size="toolsBtnSize"></table-tools>
      <el-table :data="tableData" stripe style="width: 100%" size="small" @row-dblclick="editSelect" @selection-change="selectData">
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
        data:[], //缓存数据
        itemData:{},
        dialogVisible: false,
        toolsBtnSize:"small",
        hadSelected:[]
      }
    },
    components: {
      searchBox,
      tableTools,
      detailForm
    },
    mounted(){
      this.$http({
        type: "get",
        url: "/api/table"
      }).then(table => {
        let rows = table.data.data.rows;
        this.data = this.tools.cloneObj(rows);
        if (rows.length > 0) {
          rows.map(function (item) {
            item.gender = item.gender == 0 ? "女" : "男";
            item.status = item.status == 0 ? "停用" : "启用";
          })
          this.tableData = rows;
        }
      })
    },
    methods: {
      search(searchOption){
        console.log(searchOption)
      },
      editSelect(e){
        let realName = e.realName;
        let item = this.data.filter(o => {
          return o.realName == realName;
        });
        if (item.length>0) {
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
        console.log(data)
      },
      del(){
        this.$confirm('确定要删除？', '删除数据', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(()=>{
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        }).catch(()=>{
            return;
        });
      },
    }
  }
</script>
<style lang="scss">
  .table-bot{
    margin: 0 20px;
  }

  .el-table thead {
    font-size: 14px;
  }
</style>
