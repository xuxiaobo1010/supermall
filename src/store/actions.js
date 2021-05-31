import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'


export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 查找之前的数组是否加入了该商品
      let oldProduct = context.state.CartList.find(item => {
        return item.iid === payload.iid
      })
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前的商品数+1')
      } else {
        payload.count = 1;
        context.commit(ADD_TO_CART, payload)
        resolve('添加新的商品')
      }

    })
  }

}