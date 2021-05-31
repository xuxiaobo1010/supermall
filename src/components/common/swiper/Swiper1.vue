<template>
<div class="swiper-container swiper1" > 
  <div class="swiper-wrapper" >
    <div class="swiper-slide">slider1</div>
    <div class="swiper-slide">slider2</div>
    <div class="swiper-slide">slider3</div>
  </div>
<!-- 如果需要分页器 -->
    <!-- <div class="swiper-pagination"></div> -->
    
    <!-- 如果需要导航按钮 -->
    <!-- <div class="swiper-button-prev"></div> -->
    <!-- <div class="swiper-button-next"></div> -->
  
    <!-- 如果需要滚动条 -->
    <div class="swiper-scrollbar"></div>
</div>

</template>

<script>
import Swiper from 'swiper'
//  import VueAwesomeSwiper from 'vue-awesome-swiper';



export default {
name: 'Swiper1',

mounted() {
  var mySwiper = new Swiper ('.swiper-container', {
    direction:'horizontal', // 水平切换选项
   autoplay: true,
    loop: true, // 循环模式选项
    speed:1,
    
    // // 如果需要分页器
    // pagination: {
    //   el: '.swiper-pagination',
    // },
    
    // // 如果需要前进后退按钮
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },
    
    // 如果需要滚动条
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  })

},
}
</script>
<style  scoped>
@import '../../../../node_modules/swiper/swiper.min.css';
.swiper-container{
  overflow: hidden;
  position: relative;
  width: 100%;
}
.swiper-wrapper{
  display: flex;
  width: 100%;
  /* justify-content: center; */
}
.swiper-slide{
  line-height: 100px;
  text-align: center;
  background-color: coral;
}
</style>