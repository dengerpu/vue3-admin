<template>
  <div class="layout_login_container" v-if="setting.logoHidden">
    <img :src="setting.logo" />
    <h1>{{ setting.title }}</h1>
  </div>
</template>
<script setup lang="ts">
import setting from '@/setting'
</script>
<style lang="scss" scoped>
.layout_login_container {
  width: 100%;
  height: $base-tabbar-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  img {
    width: 40px;
    height: 40px;
  }
  h1 {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
  }
}
</style>
