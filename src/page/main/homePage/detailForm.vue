<template>
  <div>
      <el-form :model="formData">
        <el-form-item label="真实姓名" :label-width="formLabelWidth">
          <el-input v-model="formData.realName"></el-input>
        </el-form-item>
        <el-form-item label="登录帐户" :label-width="formLabelWidth">
          <el-input v-model="formData.loginName"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" :label-width="formLabelWidth">
          <el-input v-model="formData.loginPassword"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth">
          <el-input v-model="formData.mobilePhone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" :label-width="formLabelWidth">
          <el-input v-model="formData.emailAddress"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio-group v-model="formData.gender">
            <el-radio :label=1>男</el-radio>
            <el-radio :label=0>女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        formLabelWidth: "100px"
      }
    },
    props: {
      formData:{
          type:Object
      }
    },
    mounted(){
    },
    methods:{
      cancel(){
        this.$emit("doCancel")
      },
      save(){
        this.$emit("doSave",this.formData)
      }
    }
  }
</script>
<style lang="" scoped>
</style>
