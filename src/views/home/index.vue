<script setup lang="ts">
import { getCurrentInstance, h } from 'vue'
import { fetchRoomList } from '../../api'
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

const getRoomList = () => {
  fetchRoomList()
}
// getRoomList()

// 數據庫相關操作
const airbnb = new IndexedDB('airbnb')
airbnb.openStore('room', 'id', ['Ryder', 'test'])

// 增和改
function addItem (storeName:string) {
  airbnb.updateItem(storeName, {
    Ryder: '33cm',
    test: '比較小'
  })
}

function updateItem (storeName:string, id:number|string) {
  airbnb.updateItem(storeName, {
    id,
    Ryder: '50cm',
    test: '比較大'
  })
}

function deleteItem (storeName:string, key:number|string) {
  airbnb.deleteItem(storeName, key)
}

function getList(storeName:string) {
  const result = airbnb.getList(storeName)
  console.log('test', result)
}

function getItem(storeName:string, key:number|string) {
  airbnb.getItem(storeName, key)
}

</script>

<template>
  <div>
    <h2>{{ t("message.home") }}</h2>
    <el-button type="primary" @click="addItem('room')">增加</el-button>
    <el-button type="primary" @click="updateItem('room',1)">改</el-button>
    <el-button type="danger" @click="deleteItem('room',1)">刪除</el-button>
    <el-button type="danger" @click="getList('room')">查詢全部</el-button>
    <el-button type="danger" @click="getItem('room',2)">查詢單一</el-button>

    <el-button :plain="true" @click="openVn">VNode</el-button>
  </div>
</template>

<style scoped></style>
