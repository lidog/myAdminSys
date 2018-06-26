<template>
  <div ref="content">
    <search-box @search="upData">
      <el-form-item label="员工账号">
        <el-input placeholder="请输入内容" v-model="searchForm.loginName"></el-input>
      </el-form-item>
    </search-box>
    <div class="table-bot">
      <table-tools :btn="['del','add','batchStart','batchStop']" :pagination="pagination"
                   @paginationChange="paginationChange" @delSelect="delSelect" @add="add"
                   @batchStart="batchStart" @batchStop="batchStop"
      />
      <el-table :data="tableData" stripe style="width: 100%" size="small" @row-dblclick="editSelect"
                @selection-change="selectData">
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="loginName" label="用户账号"/>
        <el-table-column prop="realName" label="真实姓名"/>
        <el-table-column prop="gender" label="性别" width="80"/>
        <!--<el-table-column prop="headCompanyName" label="所属总公司"/>-->
        <el-table-column prop="companyName" label="所属公司"/>
        <el-table-column prop="deptName" label="所属部门"/>
        <el-table-column prop="status" label="状态" width="100"/>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="editSelect(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="编辑" :visible.sync="dialogVisible" :width="'70%'" :top="'10vh'">
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
        itemData: {},
        dialogVisible: false,
        hadSelected: [],
        pagination: { //页码变量（默认值）
          total: 0,//列表总数
          page: 1, //当前页码
          rows: 10//每页的条数
        },
        searchForm: {
          loginName: '',
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
        let loginInfo = this.$store.getters.loginInfo;
        let _this = this;
        this.$http({
          url: this.ajaxApi.employ.list,
          data: {
            headId: loginInfo.headId,
            page: _this.pagination.page,
            rows: _this.pagination.rows,
            queryForm: {
              companyId: loginInfo.headId,
              loginName: _this.searchForm.loginName
            }
          }
        }).then(table => {
          if (table) {
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
          }
        })

      },
      paginationChange(pagination){
        this.pagination = pagination
      },
      editSelect(e){
        let item = this.data.filter(o => {
          return o.loginName == e.loginName;
        });
        if (item.length > 0) {
          this.itemData = item[0];
          this.dialogVisible = true;
        }
        this.dialogVisible = true;
      },
      selectData(e){
        this.hadSelected = e;
      },
      add(){
        let loginInfo = this.$store.getters.loginInfo
        this.itemData = {
          actionType: 'add',
          pHeadId: loginInfo.headId,
          companyId: loginInfo.headId,
          companyName: loginInfo.headCompanyName,
          userAccountId: loginInfo.userAccountId,
          gender:1,
        };
        this.dialogVisible = true;
      },
      doCancel(){
        this.dialogVisible = false;
      },
      doSave(data){
        let url = data.actionType == 'edit' ? this.ajaxApi.employ.edit : this.ajaxApi.employ.add;
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
      batchStart(){
        this.startStopFn(this.getIds(),1)
      },
      batchStop(){
        this.startStopFn(this.getIds(),2)
      },
      startStopFn(ids, type){
        if (ids.length == 0) {
          this.$message({
            message: '请选择数据',
            type: 'warning'
          });
          return;
        }
        let action = type == 1 ? '启动' : '暂停';
        this.$confirm('确定要' + action + '？', action + '数据', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.$http({
            url: this.ajaxApi.employ.startStop,
            data: {
              ids: ids,
              status:type==1?1:0
            }
          }).then(res => {
            this.$message({
              message: action+'成功',
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
      },
      getIds(){
        let ids = [];
        this.hadSelected.map(item => {
          ids.push(item.userAccountId)
        });
        return ids
      },
      //删除单个
      del(e){
        this.delFn([e.userAccountId])
      },
      //删除选中
      delSelect(){
        this.delFn(this.getIds())
      },
      //删除操作
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
            url: this.ajaxApi.employ.del,
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
