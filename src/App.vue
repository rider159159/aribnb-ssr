<script setup lang="ts">
import { useRouter } from 'vue-router'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const locale = ref(en)
const value1 = ref('')
console.log(useI18n)
const { locale: localeLanguage } = useI18n()

const changeLocale = (language: any) => {
  console.log(language)
  localeLanguage.value = language.name
  locale.value = language
}
</script>

<template>
  <!-- <div>
    <router-view></router-view>
    <button @click="()=>{ router.push({path:'/home'}) }" type="button">home</button>
    <button @click="()=>{ router.push({path:'/mine'}) }" type="button">mine</button>

    <div class="block">
      <button @click="changeLocale(zhCn)" type="button">中文</button>
      <button @click="changeLocale(en)" type="button">英文</button>
    </div>
    <el-time-picker v-model="value1" placeholder="Arbitrary time" />

  </div> -->
  <el-config-provider :locale="locale">

    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>

    <router-view></router-view>

    <button @click="()=>{ router.push({path:'/home'}) }" type="button">home</button>
    <button @click="()=>{ router.push({path:'/mine'}) }" type="button">mine</button>

    <div class="block">
      <button @click="changeLocale(zhCn)" type="button">中文</button>
      <button @click="changeLocale(en)" type="button">英文</button>
    </div>
    <div class="block">
      <el-time-picker v-model="value1" placeholder="Arbitrary time" />

    </div>

  </el-config-provider>
</template>

<style scoped>
@import "@/assets/main.scss"
</style>
