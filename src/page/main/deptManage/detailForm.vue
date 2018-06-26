<template>
  <div>
    <edit-form @cancel="cancel" @editSave="editSave" @addSave="addSave" :actionType="formData.actionType"
               :towLines="true">
      <el-form :model="formData" :label-width="formLabelWidth" ref="forms" :rules="rules">
        <el-form-item label="部门名称">
          <el-input v-model="formData.deptName"></el-input>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input v-model="formData.headCompanyName" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="父级部门">
          <el-select v-model="formData.pid" placeholder="请选择" @change="selectChange">
            <el-option
              v-for="item in deptName"
              :key="item.departmentId"
              :label="item.departmentName"
              :value="item.departmentId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="成立时间">
          <el-date-picker
            v-model="formData.buildDate"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="inline" label="职责描述">
          <el-input type="textarea" v-model="formData.dutyRemark"></el-input>
        </el-form-item>
      </el-form>
    </edit-form>
  </div>
</template>
<script>

  import editForm from '@/components/editForm.vue'
  export default {
    data: function () {
      return {
        formLabelWidth: "100px",
        deptName: [],
        rules: {}
      }
    },
    props: {
      formData: {
        type: Object,
        default: () => {
          return {
            deptName: '',
            headCompanyName: '',
            pDeptName: '',
            buildDate: '',
            dutyRemark: '',
            pid: ''
          }
        }
      }
    },
    components: {
      editForm
    },
    mounted(){
      let loginInfo = this.$store.getters.loginInfo
      this.$http({
        url: this.ajaxApi.getDeptList,
        data: {
          companyId: loginInfo.headId,
          headId: loginInfo.headId,
        }
      }).then(arr => {
        this.deptName = arr
      })
    },
    methods: {
      cancel(){
        this.$emit("doCancel")
      },
      editSave(){
        this.validateForm().then(() => {
          this.$emit("editSave", {formData: this.formData, actionType: 'edit'})
        })
      },
      addSave(){
        this.validateForm().then(() => {
          this.$emit("addSave", {formData: this.formData, actionType: 'add'})
        })
      },
      selectChange(val){
        this.formData.pid = val;
      },
      validateForm(form = 'forms'){
        let _this = this;
        return new Promise((resolve, reject) => {
          _this.$refs[form].validate((valid) => {
            if (valid) {
              resolve();
            } else {
              reject()
            }
          })
        }).catch(() => {
          _this.$message({
            message: "验证未通过",
            type:'warning'
          })
        })
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
