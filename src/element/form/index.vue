<template>
  <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
    <el-form-item label="用户名" prop="username" :error="errorMsg">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password" :error="errors.password">
      <el-input type="password" v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
  {{ errors }}
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  setup() {
    const form = reactive({
      username: '',
      password: ''
    })

    const rules = reactive({
      username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
    })

    const errors = reactive({
      username: '用户名错误',
      password: '密码错误'
    })

    const errorMsg = ref('123')

    const formRef = ref(null)

    const onSubmit = () => {
      formRef.value.validate((valid) => {
        if (valid) {
          // 发送请求到服务端
          submitToServer()
        } else {
          console.log('表单验证失败')
          return false
        }
      })
    }

    const submitToServer = () => {
      // 模拟服务端验证
      setTimeout(() => {
        // 假设服务端返回的错误信息如下
        const serverErrors = {
          username: '用户名已存在',
          password: '密码不符合要求'
        }

        // 更新本地错误信息
        errors.username = serverErrors.username
        errors.password = serverErrors.password
        errorMsg.value = '更新错误信息'
        // 清除之前的验证状态
        formRef.value.clearValidate()
        // 手动触发错误显示
        for (const field in errors) {
          if (errors[field]) {
            console.log(field)
            formRef.value.validateField(field)
          }
        }
        // 手动触发表单项验证
        // formRef.value.validateField('username')
        // formRef.value.validateField('password')
      }, 1000)
    }

    return {
      form,
      errors,
      onSubmit,
      rules,
      formRef,
      errorMsg
    }
  }
}
</script>
