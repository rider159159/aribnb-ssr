<script setup lang="ts">
import { getCurrentInstance, h, ref } from 'vue'
import { fetchRyderList } from '../../api'
import { useI18n } from 'vue-i18n'
// import IndexedDB from '../../utils/indexedDB'

const { proxy }: any = getCurrentInstance()
const { t } = useI18n()
const value1 = ref('')

const openVn = () => {
  proxy.$message({
    message: h('p', null, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode')
    ])
  })
}

function getItemList() {
  fetchRyderList().then((res) => {
    console.log(res)
  })
}
// getItemList()
</script>

<template>
  <div>
    <el-date-picker
        v-model="value1"
        type="date"
        placeholder="Pick a day"
      />
    <h2>{{ t("message.home") }}</h2>

    <el-button :plain="true" @click="openVn">VNode</el-button>
  </div>
</template>

<style scoped></style>
