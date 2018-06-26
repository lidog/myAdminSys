<template>
  <div>
    <edit-form @cancel="cancel" @editSave="editSave" @addSave="addSave" :actionType="formData.actionType"
               :towLines="true">
      <el-form :model="mFormData" label-position="right" :label-width="formLabelWidth" ref="forms" :rules="rules">
        <el-form-item label="登录帐户" prop="loginName">
          <el-input v-model="mFormData.loginName"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="mFormData.realName"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="loginPassword">
          <el-input v-model="mFormData.loginPassword"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobilePhone">
          <el-input v-model="mFormData.mobilePhone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="emailAddress">
          <el-input v-model="mFormData.emailAddress"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="mFormData.gender">
            <el-radio :label=1>男</el-radio>
            <el-radio :label=0>女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所属公司">
          <el-input v-model="mFormData.companyName" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-select v-model="mFormData.deptName" placeholder="请选择">
            <el-option
              v-for="item in deptName"
              :key="item.departmentId"
              :label="item.departmentName"
              :value="item.departmentId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </edit-form>
  </div>
</template>
<script>
  import editForm from '@/components/editForm.vue'
  import {pattens} from '@/util/patten';

  export default {
    components: {
      editForm
    },
    data: function () {
      const validatePass = pattens('lnPassword');
      const validatePhone = pattens('mobilePhone');
      const validateEmail = pattens('email');
      return {
        formLabelWidth: "150px",
        deptName: [],
        mFormData: {},
        rules: {
          loginName: [
            {required: true, message: '登录帐户不能为空', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 4 到 16 个字符', trigger: 'blur'}
          ],
          realName: [
            {required: true, message: '真实姓名不能为空', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 16 个字符', trigger: 'blur'}
          ],
          loginPassword: [
            {required: true, message: '登录密码不能为空', trigger: 'blur'},
            {trigger: 'blur', validator: validatePass}
          ],
          mobilePhone: [
            {required: true, message: '手机不能为空', trigger: 'blur'},
            {trigger: 'blur', validator: validatePhone, message: '手机格式不对'}
          ],
          emailAddress: [
            {required: true, message: '邮箱不能为空', trigger: 'blur'},
            {trigger: 'blur', validator: validateEmail}
          ]
        }
      }
    },
    props: {
      formData: {
        type: Object
      }
    },
    created(){
      //第一次渲染，确保formData 有值
      this.mFormData = this.tools.cloneObj(this.formData)
    },
    watch:{
        //监听 传入的data，做变化
      formData(){
        this.mFormData = this.tools.cloneObj(this.formData)
      }
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
        this.validateForm('forms').then(() => {
          this.$emit("editSave", {formData: this.mFormData, actionType: 'edit'})
        })
      },
      addSave(){
        this.validateForm().then(() => {
          this.$emit("addSave", {formData: this.mFormData, actionType: 'add'})
        })
      },
      validateForm(form = 'forms'){
        let _this = this;
        return new Promise((resolve, reject) => {
          _this.$refs[form].validate((valid) => {
            if (valid) {
              resolve();
            } else {
              _this.$message({
                message: "验证未通过",
                type: 'warning'
              })
              return false
            }
          })
        })
      }
    }
  }
</script>
<style lang="" scoped>
</style>
