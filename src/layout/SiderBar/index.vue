<template>
  <div class="">
    <el-scrollbar class="scrollbar">
      <!-- 菜单组件 -->
      <el-menu background-color="#001529" text-color="white">
        <Menu :menuList="asnycRoute"></Menu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import Menu from './Menu.vue'
import { asnycRoute } from '@/router/routes.ts'
</script>
<style lang="scss" scoped></style>
