<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" label-position="left" ref="loginForm" :rules="rules"
             :model="loginForm">
      <h3 class="title">链能中心管理平台</h3>

      <el-form-item prop="username">
        <span class="svg-container svg-container_login"><icon icon-class="icon-yonghu"/></span>
        <el-input autoComplete="on" placeholder="用户名" v-model="loginForm.username"/>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container"><icon icon-class="icon-mima"/></span>
        <el-input :type="pwdType" autoComplete="on" placeholder="密码" v-model="loginForm.password" @keyup.enter.native="submitForm('loginForm')"></el-input>
        <span class="show-pwd" @click="changeType"><icon icon-class="icon-eye"/></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" @click="submitForm('loginForm')">登录  Sign in</el-button>
      </el-form-item>

      <!--<div class="tips">-->
        <!--<span style="margin-right:20px;">username: admin</span>-->
        <!--<span> password: admin</span>-->
      <!--</div>-->
    </el-form>
  </div>
</template>
<script>
  import {pattens} from '@/util/patten';
  import {getRouter} from '@/util/getRouter'

  export default {
    data() {
      const validatePass = pattens('password');//获取验证器
      return {
        loginForm: {
          username: '',
          password: '',
        },
        pwdType: "password",
        rules: {
          username: [
            {required: true, message: '用户名不能为空', trigger: 'blur'},
            {min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {trigger: 'blur', validator: validatePass}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch("Login", this.loginForm).then(() => {
              this.$router.push({path: '/homePage'});
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      changeType: function () {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      }
    }
  }
</script>

<style lang="scss">
  $bg: #2d3a4b;
  $light_gray: #eee;
  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .el-input__inner {
      background-color: #2d3a4b;
    }
  }

</style>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 520px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
