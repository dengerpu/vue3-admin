// 创建用户的小仓库
import { defineStore } from 'pinia'
import type { loginFormData, loginResponseData } from '@/api/user/type'
// 引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
import { testLogin } from '@/api/user'
import type { UserState } from './types'

// 创建用户小仓库
const useUserStore = defineStore('User', {
  // 小仓库存储数据地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      menuRoutes: [], //仓库存储生成菜单需要数组(路由)
      username: '',
      avatar: '',
      //存储当前用户是否包含某一个按钮
      buttons: []
    }
  },
  // 异步|逻辑的地方
  actions: {
    // 用户登录的方法
    async userLogin(data: loginFormData) {
      //登录请求
      const result: loginResponseData = await testLogin(data)
      console.log('结果', result)
      //登录请求:成功200->token
      //登录请求:失败201->登录失败错误的信息
      if (result.code == 200) {
        //pinia仓库存储一下token
        //由于pinia|vuex存储数据其实利用js对象
        this.token = result.data as string
        //本地存储持久化存储一份
        SET_TOKEN(result.data as string)
        //能保证当前async函数返回一个成功的promise
        return Promise.resolve(result.data)
      } else {
        return Promise.reject(result.data)
      }
    }
  },
  getters: {}
})
// 对外暴露获取小仓库方法
export default useUserStore
