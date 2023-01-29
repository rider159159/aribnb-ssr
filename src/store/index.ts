import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { saveLanguageApi } from '@/api/layout'
import { InjectionKey } from 'vue'

export interface AllStateTypes{
  count: number,
  locale: any,
  userStatus: number,
}
export const key: InjectionKey<Store<AllStateTypes>> = Symbol('storeKey')

export function useStore() {
  return baseUseStore(key)
}

export const store = createStore({
  state: {
    count: 1,
    locale: null, // 语言包
    userStatus: 0 // 登录态
  },
  mutations: {
    setCount(state, payload) {
      state.count += payload
      return state.count
    },
    setLanguage(state, payload) { // 设置语言包
      state.locale = payload
      return state.locale
    },
    setUserStatus(state, payload) { // 设置登录态
      state.userStatus = payload
      return state.userStatus
    }
  },
  actions: {
    fetchCount({ commit, state }, payload) {
      setTimeout(() => {
        commit('setCount', payload)
      }, 3000)
    },
    saveLanguage({ commit, state }, language: any) { // 保存语言包
      saveLanguageApi(language.name).then(res => {
        const { success } = res
        if (success) {
          commit('setLanguage', language)
          console.log('保存当前语言包成功')
        }
      })
    }
  }
})
