<template>
<div class="home-floor" >
<div class="home-floor-group" v-for="(item1,index1) in floormessage" :key="index1">
<!-- 标题 -->
 <div class="home-floor-title">
<img :src="item1.floor_title.image_src" alt="" />
 </div>

<!-- 内容 -->
<div class="floor-list" :class="choose[index1]" >
  <div class="floor-list-img">
<a href="#"  v-for="(item2,index) in item1.product_list" :key="item2.name" >
<img :src="item2.image_src" :class="set[index]" alt="">
</a>
</div>
</div>

</div>
</div>
</template>

<script>
export default {
name: 'FloorView',
props:{
  floormessage:{
    type:Array,
    default:[]
  }
},
data() {
  return {
    set:[
      "img1","img2","img3","img4","img5"
    ],
    choose:[
      "choose1","choose2","choose3"
    ]
  }
},
}
</script>
<style>
.img2,.img3,.img4,.img5{
  height: 105px;
  border-left:5px solid #fff ;
  border-bottom: 5px solid #fff;
}

.img3,.img5{
  border-right: 5px solid #fff;
}
</style>
<style  scoped>
.home-floor-title{
  padding: 10px 0;
}
.home-floor-title img{
  width: 100%;
}
.floor-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
 
}

.floor-list img{
  width: 33.33%;
  float: left;
}

</style>