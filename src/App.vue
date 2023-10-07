<script setup lang="ts">
import { Check, Edit } from '@element-plus/icons-vue'
import HelloWorld from '@/components/HelloWorld.vue'
console.log(import.meta.env)
</script>

<template>
  <el-button type="primary" :icon="Edit" circle />
  <el-button type="success" :icon="Check" circle />
  <svg style="width: 32px; height: 32px">
    <use xlink:href="#icon-test" fill="red"></use>
  </svg>
  <HelloWorld />
</template>

<style scoped></style>
