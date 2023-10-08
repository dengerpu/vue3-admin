<script setup lang="ts">
// import axios from 'axios'
import { Check, Edit } from '@element-plus/icons-vue'
import HelloWorld from '@/components/HelloWorld.vue'
import { onMounted } from 'vue'
import { testLogin } from './api/user/index'
console.log(import.meta.env)
onMounted(() => {
  let data = {
    username: 'admin',
    password: '123456'
  }
  // axios.post('/api/user/login', data).then((res) => {
  //   console.log(res.data)
  // })
  testLogin(data).then((res) => {
    console.log(res)
  })
})
</script>

<template>
  <el-button type="primary" :icon="Edit" circle />
  <el-button type="success" :icon="Check" circle />
  <svg style="width: 32px; height: 32px">
    <use xlink:href="#icon-test" fill="red"></use>
  </svg>
  <svg-icon name="test"></svg-icon>
  <HelloWorld />
</template>

<style scoped></style>
