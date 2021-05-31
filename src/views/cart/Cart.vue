<template>
<div class="cart">
 <nav-bar class="cart-bar">
   <div slot="center">
     购物车({{cartLength}})
   </div>
 </nav-bar>
 <!-- 商品的列表 -->
 <cart-list @checkAllCart="checkAllCart" />

 <!-- 底部汇总 -->
 <cart-bottom-bar ref="bottom" />
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'


import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import {mapGetters} from 'vuex'

export default {
  name:'Cart',
  components:{
    NavBar,
    CartList,
    CartBottomBar
  
    
  },
  methods: {
    checkAllCart(){
      // console.log(this.cartList.map( item => item.checked===true).length);
      // console.log(this.cartList.length);
      console.log(this.cartList.filter(item => item.checked===true).length);
      if(this.cartList.filter( item => item.checked===true).length===this.cartList.length){
        this.$refs.bottom.$refs.check.checked=true
      }else{
         this.$refs.bottom.$refs.check.checked=false
      }
    }
  },
  computed:{
    //2种语法
    ...mapGetters(['cartLength','cartList'])
    // ...mapGetters({
    //   length:'cartLength',
    //   list:'cartList'
    // })
  }
}
</script>
<style  scoped>
.cart{
  height: 100vh;
}
.cart-bar{
  background-color: var(--color-tint);
  color: white;

  /* font-weight: 500; */
}
</style>