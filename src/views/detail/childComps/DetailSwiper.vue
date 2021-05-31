<template>
 <el-carousel  :interval="3000" arrow="always">
    <!-- <slot name=""> -->
    <el-carousel-item v-for="(item,index) in topImages" :key="index">
      <a href="#"><img :src="item" alt=""/></a>
    </el-carousel-item>

    <!-- </slot> -->
  </el-carousel>
</template>

<script>
import Swiper from 'components/common/swiper/Swiper'
export default {
name: 'DetailSwiper',
props:{
  topImages:{
    type:Array,
    default(){
      return []
    }
  }
}
}
</script>
<style>
.el-carousel__container {
  width: 100%;
  height: 300px;
}
.el-carousel__button {
  border-radius: 30px;
  height: 8px;
  width: 8px;
}
.slide img{
  width: 100%;
} 
</style>
<style  scoped>
.el-carousel__item img {
  width: 100%;
}
</style>