<script setup lang="ts">
import en from 'element-plus/dist/locale/en.mjs'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const route = useRoute()
const locale = ref(en)
const { locale: localeLanguage } = useI18n()

const changeLang = (language: any) => {
  localeLanguage.value = language.name
  locale.value = language
}
</script>

<template>
  <el-config-provider :locale="locale">
    <HeaderCommon v-show="route.fullPath.indexOf('login') === -1" @changeLang="changeLang"></HeaderCommon>
    <div class="container">
      <router-view></router-view>
    </div>
    <FooterCommon v-show="route.fullPath.indexOf('login') === -1"></FooterCommon>
  </el-config-provider>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
