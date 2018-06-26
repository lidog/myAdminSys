<template>
  <div>
    <edit-form @cancel="cancel" @save="save">
      <el-form :model="formData" :label-width="formLabelWidth">
        <el-form-item label="真实姓名">
          <el-input v-model="formData.realName"></el-input>
        </el-form-item>
        <el-form-item label="登录帐户">
          <el-input v-model="formData.loginName"></el-input>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input v-model="formData.loginPassword"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="formData.mobilePhone"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model="formData.emailAddress"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="formData.gender">
            <el-radio :label=1>男</el-radio>
            <el-radio :label=0>女</el-radio>
          </el-radio-group>
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
        formLabelWidth: "100px"
      }
    },
    props: {
      formData: {
        type: Object
      }
    },
    mounted(){
    },
    components: {
      editForm
    },
    methods: {
      cancel(){
        this.$emit("doCancel")
      },
      save(){
        this.$emit("doSave", this.formData)
      }
    }
  }
</script>
<style lang="" scoped>
  .detail-form > > > .el-form-item__label {
    text-align: left;
    font-weight: bolder;
  }
</style>
