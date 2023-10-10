<template>
  <div class="">
    <el-scrollbar class="scrollbar">
      <!-- 菜单组件 -->
      <el-menu background-color="#001529" text-color="white">
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">数据大屏</el-menu-item>
        <!-- 折叠菜单 -->
        <el-sub-menu index="3">
          <template #title>
            <span>权限管理</span>
          </template>
          <el-menu-item index="3-1">用户管理</el-menu-item>
          <el-menu-item index="3-2">角色管理</el-menu-item>
          <el-menu-item index="3-3">菜单管理</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped></style>
