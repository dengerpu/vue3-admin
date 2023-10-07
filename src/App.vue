<script setup lang="ts">
import { Check, Edit } from '@element-plus/icons-vue'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <el-button type="primary" :icon="Edit" circle />
  <el-button type="success" :icon="Check" circle />
  <HelloWorld />
</template>

<style scoped></style>
