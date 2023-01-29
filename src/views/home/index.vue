<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { h, getCurrentInstance } from 'vue'
import { fetchRoomList, fetchElephant } from '../../api'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'

const { t } = useI18n()
console.log(useI18n)
const route = useRoute()
const store = useStore()
console.log(route.params)
const { proxy }: any = getCurrentInstance()
proxy.$message({
  message: h('p', null, [
    h('span', null, 'Message can be '),
    h('i', { style: 'color: teal' }, 'VNode')
  ])
})

// 真实接口
function getRoomList() {
  fetchRoomList().then(res => {
    console.log('真实接口', res)
  })
}
getRoomList()

const value1 = ''

// Mock接口
function getElephant() {
  fetchElephant().then(res => {
    console.log('Mock接口', res)
  })
}
// getElephant()

function setMutation() {
  store.commit('setCount', 2)
}

function setAction() {
  store.dispatch('fetchCount', 10)
}
</script>

<template>
  {{ t('message.home') }}
  <el-button @click="setMutation">mutation</el-button>
  <el-button @click="setAction">action</el-button>

  <el-date-picker v-model="value1" type="date" placeholder="Pick a day"></el-date-picker>
</template>

<style lang="scss">
@import "@/assets/scss/home/index.scss";
</style>
