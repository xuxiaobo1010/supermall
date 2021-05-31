import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'// 导入组件相关样式
import 'element-ui/lib/theme-chalk/index.css'// 配置vue插件
import  store from './store/index'

import FastClick from 'fastclick'
import Vuelazyload from 'vue-lazyload'
import '@/assets/icon/iconfont.css'

import toast from './components/common/toast'

Vue.use(ElementUI)
Vue.config.productionTip = false

//安装toast 插件
Vue.use(toast)


//解决移动端的300ms的延迟
FastClick.attach(document.body)

//使用懒加载的插件
Vue.use(Vuelazyload,{
  loading:require('./assets/img/leimu.jpg')

})
Vue.prototype.$bus= new Vue()
new Vue({
  
  render: h => h(App),
  router,
  store,
}).$mount('#app')

// axios.request({
//   url:'http://localhost:8082/hello/test'
// }).then(reject =>{
//   console.log(reject);
// }).catch(err=>{
//   console.log("请求错误");
// })