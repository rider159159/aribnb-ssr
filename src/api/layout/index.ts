import DB from '../../utils/indexedDB'
import { ElLoading } from 'element-plus'

const airbnbDB = new DB('airbnb')
interface IResultOr { // 定义interface规范返回结果的类型
  code: string,
  success: boolean,
  message: string,
  result: any
}

// Mock接口：保存当前语言包
export async function saveLanguageApi(lang: any) {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.1)'
  })
  await airbnbDB.openStore('language', 'id', ['name'])
  const resultOr: IResultOr = await airbnbDB.getItem('language', 1).then(res => {
    setTimeout(() => {
      loading.close()
    }, 200)
    return { code: '000000', message: '操作成功', result: res || null, success: true }
  })
  const { success } = resultOr
  let obj = {}
  if (success) { // 说明数据已存在，则更新数据
    obj = { name: lang, id: 1 }
  } else { // 说明数据不存在，则新增数据
    obj = { name: lang }
  }
  const result: IResultOr = await airbnbDB.updateItem('language', obj).then(res => {
    return { code: '000000', message: '操作成功', result: null, success: true }
  })
  return result
}

// Mock接口：获取当前语言包
export async function fetchLanguageApi() {
  const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.1)'
  })
  await airbnbDB.openStore('language', 'id', ['name'])
  const result: IResultOr = await airbnbDB.getItem('language', 1).then(res => {
    setTimeout(() => {
      loading.close()
    }, 20)
    return { code: '000000', message: '操作成功', result: res || null, success: true }
  })
  return result
}
