// code: '000000'表示'操作成功'；code: '000001'表示'数据已存在'；code: '000002'表示'密码不正确'；
// code: '000003'表示'手机号不正确'；code: '000004'表示'其他异常'；code: '000005'表示'登录过期'；

import { ElLoading } from 'element-plus'
import { IResultOr } from '../interface'
import { getQueryCookie } from '../../utils/util' // 判斷登入 cookie 是否為相對會員
import airbnb from '../../db' // 整個 indexed 包裝層
import { fa } from 'element-plus/es/locale'

const storeName = Object.keys(airbnb.userObjectStore)[0] // web_user

// mock接口 : 用戶註冊
export async function userSignApi(params: any) {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.1)'
  })
  const hasMobile = await new Promise((resolve, reject)=>{
    airbnb.airbnbDB.getList(storeName).then((res:any)=>{
      setTimeout(() => {
        loading.close()
      }, 200)
      res && res.filter((item:any)=>{
        if (item.mobile === params.mobile){
          resolve(true)
        }
      })
      resolve(false)
    })
  })
  let result: IResultOr
  if (hasMobile) {
    result = await new Promise((resolve, reject)=>{
      resolve({ code: '000001', success: false, message: '数据已存在', result: null })
    })
  } else {
    const obj = { status: 0 }
    Object.assign(params, obj)
    result = await new Promise((resolve, reject)=>{
      airbnb.airbnbDB.updateItem(storeName, params).then(res => {
        setTimeout(() => {
          loading.close()
        }, 200)
        resolve({ code: '000000', success: true, message: '操作成功', result: null })
      })
    })
  }
  return result
}

export async function userLoginApi(params: any) {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.1)'
  })
  // 驗證手機和密碼是否正確
  const correct: any = await new Promise((resolve, reject)=>{
    airbnb.airbnbDB.getList(storeName).then((res: any)=>{
      setTimeout(()=>{
        loading.close()
      }, 200)
      res && res.filter((item:any)=>{
        if (item.mobile === params.mobile && item.password !== params.password) {
          resolve({ code: '000002' })
        }
        if (item.mobile !== params.mobile && item.password === params.password) { // 校验手机号
          resolve({ code: '000003' })
        }
        if (item.mobile === params.mobile && item.password === params.password) { // 手机号和密码都输入正确
          resolve({ code: '000000', userId: item.userId })
        }
      })
      resolve({ code: '000004' })
    })
  })
  let result: IResultOr
  if (correct.code !== '000000') {
    result = await new Promise((resolve, reject)=>{
      resolve({ code: correct.code, success: false, message: correct.code === '000002' ? '密码不正确' : (correct.code === '000003' ? '手机号不正确' : '不存在该用户，请先注册'), result: null })
    })
  } else {
    const token = (new Date()).getTime() + ''
    document.cookie = `token=${token}`
    const obj = { status: 1, userId: correct.userId, token }
    Object.assign(params, obj)
    result = await new Promise((resolve, reject) => {
      airbnb.airbnbDB.updateItem(storeName, params).then(res => {
        setTimeout(() => {
          loading.close()
        }, 200)
        resolve({ code: '000000', success: true, message: '操作成功', result: obj })
      })
    })
  }
  return result
}

// mock接口：用户登出
export async function userLogoutApi() {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.1)'
  })
  // 根据用户token更改登录态为0
  const correct: any = await new Promise((resolve, reject) => {
    airbnb.airbnbDB.getList(storeName).then((res: any) => {
      setTimeout(() => {
        loading.close()
      }, 200)
      res && res.filter((item: any) => {
        const cookie = document.cookie
        const token = getQueryCookie(cookie, 'token') // 获取cookie中的toke
        if (item.token && item.token.indexOf(token) !== -1) { // 存在相同token
          resolve({ userId: item.userId })
        }
      })
      resolve({ code: '000005' })
    })
  })
  let result: IResultOr
  if (correct.code === '000005') {
    result = await new Promise((resolve, reject) => {
      resolve({ code: '000005', success: false, message: '登录过期', result: null })
    })
  } else {
    const params: any = await new Promise((resolve, reject) => {
      airbnb.airbnbDB.getItem(storeName, correct.userId).then((res) => {
        resolve(res)
      })
    })
    const obj = { status: 0, token: null }
    Object.assign(params, obj)
    result = await new Promise((resolve, reject) => {
      airbnb.airbnbDB.updateItem(storeName, params).then(res => {
        setTimeout(() => {
          loading.close()
        }, 200)
        resolve({ code: '000000', success: true, message: '操作成功', result: null })
      })
    })
  }
  return result
}
