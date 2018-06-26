<!--部门管理-->
<template>
  <div ref="content">
    <search-box @search="search">
      <el-form-item label="部门名称">
        <el-input placeholder="请输入内容" v-model="searchForm.deptName"></el-input>
      </el-form-item>
    </search-box>
    <div class="table-bot">
      <table-tools :btn="['del','add']" :pagination="pagination"
                   @paginationChange="paginationChange" @delSelect="delSelect" @add="add"/>
      <el-table :data="tableData" stripe style="width: 100%" size="small" @row-dblclick="editSelect"
                @selection-change="selectData">
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="deptName" label="部门名称"/>
        <el-table-column prop="headCompanyName" label="公司名称"/>
        <el-table-column prop="pDeptName" label="父级部门"/>
        <el-table-column prop="buildDate" label="成立日期"/>
        <el-table-column prop="createTime" label="创建时间"/>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click.native="editSelect(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click.native="del(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="部门编辑" :visible.sync="dialogVisible" :width="'80%'" :top="'10vh'">
      <detail-form :formData="itemData" @doCancel="doCancel" @editSave="doSave" @addSave="doSave"/>
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
        itemData: {}, //编辑数据
        dialogVisible: false, //控制弹窗
        hadSelected: [],//选中的数据
        companyType: [
          {value: 1, label: "用电企业"},
          {value: 2, label: "售电企业"},
          {value: 3, label: "发电企业"},
        ],
        pagination: { //页码变量（默认值）
          total: 0,//列表总数
          page: 1, //当前页码
          rows: 10//每页的条数
        },
        searchForm: { //筛选参数
          companyId: '',
          deptName: ''
        },
      }
    },
    components: {
      searchBox,
      tableTools,
      detailForm
    },
    mounted(){
      this.upData()
    },
    methods: {
      upData(){
        let loginInfo = this.$store.getters.loginInfo;
        this.searchForm.companyId = loginInfo.headId;
        let _this = this;
        this.$http({
          url: this.ajaxApi.dept.list,
          data: {
            headId: loginInfo.headId,
            page: _this.pagination.page,
            rows: _this.pagination.rows,
            queryForm: _this.searchForm
          }
        }).then(table => {
          if (table) {
            this.data = this.tools.cloneObj(table);
            this.tableData = table.rows;
            this.pagination.total = this.data.total;
          }
        })
      },
      paginationChange(pagination){
        this.pagination = pagination;
        this.upData();
      },
      search(){
        this.upData()
      },
      add(){
        let loginInfo = this.$store.getters.loginInfo
        this.itemData = {
          actionType: 'add',
          headCompanyName: loginInfo.headCompanyName,
          companyId:loginInfo.headId,
          pHeadId:loginInfo.headId,
          departmentId:'',
          pDeptName: '',
          buildDate: '',
          dutyRemark: '',
          pid: ''
        };
        this.dialogVisible = true;
      },
      editSelect(e){
        let item = this.data.rows.filter(o => {
          return o.departmentId == e.departmentId;
        });
        if (item.length > 0) {
          this.itemData = item[0];
          this.itemData.actionType = "edit"
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
        let url = data.actionType == 'edit' ? this.ajaxApi.dept.edit : this.ajaxApi.dept.add;
        delete data.formData.actionType;
        this.$http({
          url: url,
          data: data.formData,
        }).then(res => {
          this.$message({
            message: '保存成功',
          });
          this.dialogVisible = false;
          this.upData()
        }).catch(err => {
          console.log(err)
        })
      },
      //删除单个
      del(e){
        this.delFn([e.departmentId])
      },
      //删除多个
      delSelect(){
        let ids = [];
        this.hadSelected.map(item => {
          ids.push(item.departmentId)
        });
        this.delFn(ids)
      },
      delFn(ids){
        if (ids.length == 0) {
          this.$message({
            message: '请选择数据',
            type: 'warning'
          });
          return;
        }
        this.$confirm('确定要删除？', '删除数据', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.$http({
            url: this.ajaxApi.dept.del,
            data: {
              ids: ids
            }
          }).then(res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.upData()
          })
        }).catch((err) => {
          console.log(err)
          this.$message({
            message: err,
            type: 'warning'
          });
        });
      }
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
