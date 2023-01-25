<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import zhTW from 'element-plus/dist/locale/zh-tw.mjs'
import en from 'element-plus/dist/locale/en.mjs'

const activeIndex = ref('orders')

const emit = defineEmits<{(e:'changeLang', lang:any):void}>()

function handleSelect (e:any) {
  console.log('test', e)
  if (e === 'zh') {
    emit('changeLang', zhTW)
  } else if (e === 'en') {
    emit('changeLang', en)
  }
}
</script>

<template>
  <div class="header-common">
    <img src="@/assets/images/layout/logo.png" alt="">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="order">房屋訂單中心</el-menu-item>
      <el-menu-item index="records">歷史足跡</el-menu-item>

      <el-sub-menu index="2">
        <template #title>國際化切換</template>
        <el-menu-item index="zh">中文</el-menu-item>
        <el-menu-item index="en">英文</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="avatar">
        <img class="avatar" src="@/assets/images/layout/avatar.jpg" alt="个人中心" />
      </el-menu-item>
      <el-menu-item index="4">Orders</el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/layout/index.scss";
</style>
