<template>
<tab-bar>
  <tab-bar-item path="/home" >
    <img slot="item-icon" src="~assets/img/tabbar/home.png" alt="">
    <img slot="item-icon-active" src="~assets/img/tabbar/home-o.png" alt="">
    <div slot="item-text">
      首页
    </div>
  </tab-bar-item>
  <tab-bar-item path="/category">
    <img slot="item-icon" src="~assets/img/tabbar/category.png" alt="">
    <img slot="item-icon-active" src="~assets/img/tabbar/category-o.png" alt="">
    <div slot="item-text">
      分类
    </div>
  </tab-bar-item>
  <tab-bar-item path="/cart" >
    <img slot="item-icon" src="~assets/img/tabbar/cart.png" alt="">
    <img slot="item-icon-active" src="~assets/img/tabbar/cart-o.png" alt="">
    <div slot="item-text">
      购物车
    </div>
  </tab-bar-item>
  <tab-bar-item path="/profile" >
    <img slot="item-icon" src="~assets/img/tabbar/my.png" alt="">
    <img slot="item-icon-active" src="~assets/img/tabbar/my-o.png" alt="">
    <div slot="item-text">
      我的
    </div>
  </tab-bar-item>
</tab-bar>
</template>

<script>
import TabBar  from '../../common/tabbar/TabBar'
import TabBarItem from '../../common/tabbar/TabBarItem'
export default {
name: 'MainTabBar',
components:{
  TabBar,
  TabBarItem
}
}
</script>
<style  scoped>
</style>