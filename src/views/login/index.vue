<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="loginRules">
          <h1>Hello</h1>
          <h2>爱写bug的小邓程序员</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login_btn" type="primary" size="default">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import type { FormRules } from 'element-plus'
import { reactive } from 'vue'
interface LoginForm {
  username: string
  password: string
}
// 收集账号与密码数据
let loginForm = reactive<LoginForm>({ username: '', password: '' })
// 自定义校验规则
const validatorPassword = (rule: any, value: any, callback: any) => {
  console.log('规则', rule)
  console.log('执行了自定义校验', value)
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (value.length >= 6 && value.length <= 15) {
      callback()
    } else {
      callback(new Error('密码在6-15位'))
    }
  }
}
// 表单校验规则
const loginRules = reactive<FormRules<LoginForm>>({
  username: [
    {
      required: true,
      min: 6,
      max: 10,
      message: '账号长度至少六位',
      trigger: 'change'
    }
  ],
  password: [
    // {
    //   required: true,
    //   min: 6,
    //   max: 15,
    //   message: '密码长度至少6位',
    //   trigger: 'change'
    // }
    // 使用自定义校验规则
    { trigger: 'change', validator: validatorPassword }
  ]
})
</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0px;
    }
    .login_btn {
      width: 100%;
    }
  }
}
@media only screen and (max-width: 768px) {
  .login_form {
    left: 10%;
  }
}
</style>
