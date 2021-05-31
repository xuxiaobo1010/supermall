import axios from 'axios'

export function request(config){
 const instance = axios.create({
   baseURL:'http://152.136.185.210:7878/api/m5',//http://152.136.185.210:7878/api/m5
   //http://123.207.32.32:8000
   timeout:1000
 })
 //请求拦截
 instance.interceptors.request.use(config =>{
   return config
 })
 //响应拦截
 instance.interceptors.response.use(res =>{
   return res.data
 },err=>{
   console.log('访问失败');
 })
 //3.发送真正的网络请求
 return instance(config)
}