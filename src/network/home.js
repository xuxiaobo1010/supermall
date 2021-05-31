import {request} from './request'

export function getHomeswiperdata(){
  return request({
    url:'/home/multidata',
  })
}
// export function getHomeCatitems(){
//   return request({
//     url:'/home/catitems'
//   })
// }
export function getHomeGoods(type,page){
  return request({
    url:'/home/data',
    params: {
      type,
      page
    }
  })
}

export function getHomefloordata(){
  return  request({
    url:"https://api-hmugo-web.itheima.net/api/public/v1/home/floordata",
  })

}