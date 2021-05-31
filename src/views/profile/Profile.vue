<template>
<div class="profile">
<nav-bar class="profile-bar">
  <div slot="center">蘑菇街</div>
</nav-bar>
<!-- 登录注册 -->
<UserInfo></UserInfo>
<div class="discount">
  <div class="discount-item">
    <div><span class="font">0.00</span>元</div>
    <div>我的余额</div>
  </div>
  <div class="discount-item">
    <div><span class="font">0</span>个</div>
    <div>我的优惠</div>
  </div>
  <div class="discount-item">
    <div><span class="font">0</span>分</div>
    <div>我的积分</div>
  </div>
</div>
<list-view :list="orderLit" />
<list-view :list="serviceList"  />
</div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'

import UserInfo  from './childcomps/UserInfo'
import ListView from './childcomps/ListView'

export default {
  name:"Profile",
  components:{
    NavBar,
    UserInfo,
    ListView
  },
  data() {
    return {
      orderLit:[
        {info:'我的消息',img:'icon iconfont icon-xiaoxi'},
        {info:'积分商城',img:'icon iconfont icon-jifenshangcheng'},
        {info:'会员卡',img:'icon iconfont icon-vip'},
      ],
      serviceList:[
          {info:'我的购物车',img:'icon iconfont icon-gouwu'},
          {info:'下载购物App',img:'icon iconfont icon-bianpinghuatubiaosheji-'},
      ]
    }
  },
}
</script>
<style  scoped>
.profile{
  background-color: #f2f2f2;
  height: 100vh;
}
.profile-bar{
  background-color: var(--color-tint);
  color: white;
  
}
.discount{
  display: flex;
  justify-content: center;
  height:85px;
}
.discount-item{
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  margin-right: 1px;
  background-color: #fff;
}
.font{
  color: var(--color-tint);
  font-size: 25px;
}
</style>