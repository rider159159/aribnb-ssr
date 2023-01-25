<script setup lang="ts">
import en from 'element-plus/dist/locale/en.mjs'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const locale = ref(en)
console.log(useI18n)
const { locale: localeLanguage } = useI18n()

const changeLang = (language: any) => {
  localeLanguage.value = language.name
  locale.value = language
}
</script>

<template>
  <el-config-provider :locale="locale">
    <HeaderCommon @changeLang="changeLang"></HeaderCommon>
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
