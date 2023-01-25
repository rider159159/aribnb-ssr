<script setup lang="ts">
import { getCurrentInstance, h } from 'vue'
import { fetchRyderList } from '../../api'
import { useI18n } from 'vue-i18n'
import IndexedDB from '../../utils/indexedDB'

const { proxy }: any = getCurrentInstance()
const { t } = useI18n()

const openVn = () => {
  proxy.$message({
    message: h('p', null, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode')
    ])
  })
}

// 數據庫相關操作
const airbnb = new IndexedDB('airbnb')
airbnb.openStore('room', 'id', ['Ryder', 'test'])

function getItemList() {
  fetchRyderList().then((res) => {
    console.log(res)
  })
}
getItemList()
</script>

<template>
  <div>
    <h2>{{ t("message.home") }}</h2>

    <el-button :plain="true" @click="openVn">VNode</el-button>
  </div>
</template>

<style scoped></style>
