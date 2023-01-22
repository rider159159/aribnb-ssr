<script setup lang="ts">
import { getCurrentInstance, h } from 'vue'
import { fetchRoomList } from '../../api'
import { useI18n } from 'vue-i18n'

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
getRoomList()
</script>

<template>
  <div>
    <h2>{{ t("message.home") }}</h2>
    <el-button type="primary">測試</el-button>
    <el-button :plain="true" @click="openVn">VNode</el-button>
  </div>
</template>

<style scoped></style>
