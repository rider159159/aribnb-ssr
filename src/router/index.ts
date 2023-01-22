// router/index.ts
import home from "@/views/home/index.vue"
import mine from "@/views/mine/index.vue"
import { createRouter, createWebHistory } from "vue-router"

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),  // 相当于mode: 'hash'
  routes: [
		{
      path: '/home',        // 路由路径
      name: 'home',         // 路由名称
      component: home,      // 路由所映射到的组件
      meta: {               // 一些meta配置
          meta: '',
          keepAlive: false  
      }
		},
  {
      path: '/mine',
      name: 'mine',
      component: mine,
      meta: {
          meta: '',
          keepAlive: false
      }
		}
  ]
})

export default router
