// 创建用户的小仓库
import { defineStore } from 'pinia'
import type { loginFormData, loginResponseData } from '@/api/user/type'
// 引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { testLogin, testReqUserInfo, testReqLogout } from '@/api/user'
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
      //登录请求:成功200->token
      //登录请求:失败201->登录失败错误的信息
      if (result.code == 200) {
        //pinia仓库存储一下token
        //由于pinia|vuex存储数据其实利用js对象
        this.token = result.data.token as string
        //本地存储持久化存储一份
        SET_TOKEN(result.data.token as string)
        //能保证当前async函数返回一个成功的promise
        return Promise.resolve(result.data)
      } else {
        return Promise.reject(result.data)
      }
    },
    // 获取用户信息
    userInfo() {
      return new Promise((resolve, reject) => {
        testReqUserInfo()
          .then((result) => {
            this.username = result.data.name
            this.avatar = result.data.avatar
            this.buttons = result.data.buttons
            resolve(result)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 退出登陆
    async userLogout() {
      //退出登录请求
      const result: any = await testReqLogout()
      if (result.code == 200) {
        //目前没有mock接口:退出登录接口(通知服务器本地用户唯一标识失效)
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    }
  },
  getters: {}
})
// 对外暴露获取小仓库方法
export default useUserStore
