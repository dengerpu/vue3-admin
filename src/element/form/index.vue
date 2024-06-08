<template>
  <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="validateForm">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  setup() {
    const form = reactive({
      username: '',
      email: ''
    })

    const rules = reactive({
      username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      email: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
      ]
    })

    const formRef = ref(null)

    const validateForm = () => {
      formRef.value.validate((valid) => {
        if (valid) {
          submitForm()
        } else {
          console.log('表单验证失败')
          return false
        }
      })
    }

    const submitForm = () => {
      mockBackendValidation().then((response) => {
        if (response.valid) {
          console.log('表单提交成功')
        } else {
          console.log('表单提交失败')
          handleValidationErrors(response.errors)
        }
      })
    }

    const mockBackendValidation = () => {
      return new Promise((resolve) => {
        // 模拟后端校验，返回错误信息
        setTimeout(() => {
          resolve({
            valid: false,
            errors: {
              username: '用户名已存在',
              email: '邮箱格式不正确'
            }
          })
        }, 1000)
      })
    }
    const errors = reactive({
      username: ''
    })

    const handleValidationErrors = () => {
      errors.username = '123456'
      // Object.keys(errors).forEach((field) => {
      //   formRef.value.validateField(field, () => {
      //     return new Error(errors[field])
      //   })
      // })
    }

    return {
      form,
      rules,
      formRef,
      validateForm
    }
  }
}
</script>
