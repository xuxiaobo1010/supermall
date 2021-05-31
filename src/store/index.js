import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutitions'
import actions from './actions'
import getters from './getters'

//1.安装插件
Vue.use(Vuex)

//2.创建一个store对象
const state ={
  CartList:[]
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
  
})

//3.挂载到Vue实例上
export default store