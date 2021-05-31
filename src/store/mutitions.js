import {
ADD_COUNTER,
ADD_TO_CART,
REDUCE_COUNTER,
BUY_CART
} from './mutation-types'

export default{
    //mutations唯一的目的就是修改state中的状态
  //mutations中每一个方法尽可能完成的事情比较单一
  [ADD_COUNTER](state,payload){
    payload.count += 1
  },
  [REDUCE_COUNTER](state,payload){
    payload.count -= 1
  },
  [ADD_TO_CART](state,payload){
    payload.checked=false
    state.CartList.push(payload)
  },
  [BUY_CART](state){
    state.CartList =  state.CartList.filter(item =>item.checked===false)
  },
  changecheck(state,payload){
    state.CartList.find(item =>item.iid===payload.iid).checked=payload.checked
  },
  changeAllcheck(state,payload){
    state.CartList.forEach(item => item.checked=payload);
  }
}