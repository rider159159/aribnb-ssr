import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import ElementPlus, { ElMessage } from 'element-plus'
import i18n from './language/i18n'

import airbnb from './db' // 引入数据库和对象仓库

router.beforeEach((to, from, next) => {
  airbnb.airbnbDB.openStore({
    ...airbnb.languageObjectStore,
    ...airbnb.userObjectStore
  }).then((res: any) => {
    console.log('初始化所有对象仓库', res)
    next()
  })
})

const app = createApp(App)
app.config.globalProperties.$message = ElMessage
app.use(router)
app.use(ElementPlus)
app.use(i18n)
app.mount('#app')
