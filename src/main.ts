import { createApp } from 'vue'
import App from './App.vue'
// 引入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// @ts-expect-error忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// svg
import 'virtual:svg-icons-register'
// 引入自定义全局组件
import gloablComponent from './components/index'
// 引入css样式
import '@/styles/index.scss'
// 引入路由
import router from './router'
// 引入仓库
import store from './store'

import './permisstion'

const app = createApp(App)
//安装自定义插件
app.use(gloablComponent)

//安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn
})

// 挂载路由
app.use(router)
app.use(store)
app.mount('#app')
