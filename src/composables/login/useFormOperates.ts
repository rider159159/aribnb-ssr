import { IResultOr } from '@/api/interface'
import { userSignApi, userLoginApi } from '@/api/login'
import { getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import { Router } from 'vue-router'
import { key } from '@/store'

interface IRuleForm {
  mobile: string,
  password: string
}
interface Result {
  userSign: (params: IRuleForm) => void,
  userLogin: (params: IRuleForm) => void,
}

export default function useFormOperates(router: Router, params: IRuleForm): Result {
  const { proxy }: any = getCurrentInstance()
  const store = useStore(key)
  // 注册接口
  function userSign(): void {
    userSignApi(params).then((res: IResultOr) => {
      const { success, message } = res
      if (success) {
        proxy.$message.success(message)
      } else {
        proxy.$message.error(message)
      }
    })
  }

  // 登录接口
  function userLogin(): void {
    userLoginApi(params).then((res: IResultOr) => {
      const { success, message, result } = res
      if (success) {
        const { status } = result
        // localStorage.setItem('userStatus', status)
        store.commit('setUserStatus', status)
        router.push({ name: 'home' })
        proxy.$message.success(message)
      } else {
        proxy.$message.error(message)
      }
    })
  }
  return {
    userSign,
    userLogin
  }
}
