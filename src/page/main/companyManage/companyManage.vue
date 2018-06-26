<template>
  <div ref="content">
    <search-box @search="search">
      <el-form-item label="公司名称">
        <el-input placeholder="请输入内容" v-model="searchForm.companyName"></el-input>
      </el-form-item>
      <el-form-item label="公司类型">
        <el-select v-model="searchForm.companyType" placeholder="请选择">
          <el-option
            v-for="item in companyType"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </search-box>
    <div class="table-bot">
      <table-tools :pagination="pagination" @paginationChange="paginationChange"/>
      <el-table :data="tableData" stripe style="width: 100%" size="small" @row-dblclick="editSelect"
                @selection-change="selectData">
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="companyName" label="公司名称" width="200"/>
        <el-table-column prop="headCompanyName" label="所属总公司" width="200"/>
        <el-table-column prop="companyType" label="公司类型" width="80"/>
        <el-table-column prop="provinceName" label="省"/>
        <el-table-column prop="cityName" label="市"/>
        <el-table-column prop="districtName" label="区"/>
        <el-table-column prop="companyStatus" label="状态" width="100"/>
        <el-table-column prop="createTime" label="创建时间" width="200"/>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="editSelect(scope.row)" type="text" size="small">编辑</el-button>
            <!--<el-button @click="del(scope.row)" type="text" size="small">删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="编辑" :visible.sync="dialogVisible" :width="'80%'" :top="'10vh'">
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
        itemData: {}, //编辑数据
        dialogVisible: false, //控制弹窗
        hadSelected: [],//选中的数据
        companyType: [
          {value: 1, label: "用电企业"},
          {value: 2, label: "售电企业"},
          {value: 3, label: "发电企业"},
        ],
        pagination:{ //页码变量（默认值）
          total:0,//列表总数
          page:1, //当前页码
          rows: 10//每页的条数
        },
        searchForm: { //筛选参数
          companyName: '',
          companyType:''
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
        let _this = this;
        this.$http({
          url: this.ajaxApi.company.list,
          data: {
            headId: loginInfo.headId,
            page: _this.pagination.page,
            rows: _this.pagination.rows,
            queryForm:_this.searchForm
          }
        }).then(table => {
          if(table){
            this.data = this.tools.cloneObj(table);
            let arr = [];
            table.rows.forEach(item => {
              arr.push(item.company);
            });
            arr.map(item => {
              item.companyType = item.companyType == 1 ? "用电企业" : "售电企业";
              item.companyStatus = item.companyStatus == 1 ? "正常" : "停用";
            });
            this.tableData = arr;
            this.pagination.total = this.data.total;
          }
        })
      },
      paginationChange(pagination){
        this.pagination= pagination;
        this.upData();
      },
      search(){
        this.upData()
      },
      editSelect(e){
        let companyName = e.companyName;
        let item = this.data.rows.filter(o => {
          return o.company.companyName == companyName;
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
        this.$http({
          url: this.ajaxApi.company.edit,
          data: data,
        }).then(res => {
          this.$message({
            message: '保存成功',
            type: 'success'
          });
          this.dialogVisible = false;
          this.upData()
        }).catch(err => {
          console.log(err)
          this.$message({
            message:err,
            type: 'warning'
          });
        })
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
