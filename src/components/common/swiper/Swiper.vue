<template>
  <el-carousel height='180px'  :interval="3000" arrow="always">
    <!-- <slot name=""> -->
    <el-carousel-item v-for="item in banners" :key="item.acm">
      <a :href="item.link"><img @load="imageLoad" :src="item.image" alt=""/></a>
    </el-carousel-item>

    <!-- </slot> -->
  </el-carousel>
</template>


<script>
export default {
  name: "Swiper",
  props: {
    banners: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
    //  height:document.documentElement.clientWidth * 0.5 + "px"
    isLoad:false
    }
  },
  methods: {
    imageLoad(){
      if(!this.isLoad)
      this.$emit('swiperimageLoad')
      this.isLoad=true
    }
  },
  // mounted() {
  //   window.onresize = () => {
  //     return (() => {
  //          this.height = document.documentElement.clientWidth * 0.5 + "px";
  //         console.log(this.height);
  //   })()
  
  // }
  // }
};
</script>
<style>
.el-carousel__container {
  width: 100%;
  /* height: 180px; */
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
/* .slide{
  width: 100%;
  flex-shrink: 0;
}
.slide img{
  width: 100%;
} */
.el-carousel__item img {
  width: 100%;
}
/* .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  } */
</style>