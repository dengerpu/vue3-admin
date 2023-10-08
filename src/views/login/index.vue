<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="loginRules"
          ref="loginFormRef"
        >
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
            <el-button
              :loading="loading"
              @click="login"
              class="login_btn"
              type="primary"
              size="default"
            >
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
import { ElMessage, ElNotification } from 'element-plus'
import type { FormRules, FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'
// 引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
let useStore = useUserStore()
import { useRoute, useRouter } from 'vue-router'
interface LoginForm {
  username: string
  password: string
}
let loading = ref(false)
// 路由器
let $router = useRouter()
// 路由对象
let $route = useRoute()
let loginFormRef = ref<FormInstance>()
// 收集账号与密码数据
let loginForm = reactive<LoginForm>({ username: 'admin', password: '123456' })
// 自定义校验规则
const validatorPassword = (rule: any, value: any, callback: any) => {
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
      min: 5,
      max: 10,
      message: '账号长度5-10位',
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
// 登陆按钮回调函数
const login = async () => {
  // 保证全部表单相校验通过再发请求
  loginFormRef?.value?.validate(async (valid) => {
    if (valid) {
      loading.value = true
      useStore
        .userLogin(loginForm)
        .then(() => {
          //编程式导航跳转到展示数据首页
          //判断登录的时候,路由路径当中是否有query参数，如果有就往query参数挑战，没有跳转到首页
          let redirect: any = $route.query.redirect
          $router.push({ path: redirect || '/' })
          //登录成功加载效果也消失
          loading.value = false
          //登录成功提示信息
          ElNotification({
            type: 'success',
            message: '欢迎回来',
            title: `HI,您好,欢迎登陆`
          })
          loading.value = false
        })
        .catch((error) => {
          //登录失败加载效果消息
          loading.value = false
          //登录失败的提示信息
          ElNotification({
            type: 'error',
            message: error.message
          })
        })
    } else {
      ElMessage({
        message: '输入信息不合法',
        type: 'error'
      })
    }
  })
}
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
