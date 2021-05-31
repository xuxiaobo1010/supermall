<template>
<div class="recommed">
<div class="recommed-item" v-for="item in recommend" :key="item.sort">
<a :href="item.link">
  <img :src="item.image" alt="">
  <div>{{item.title}}</div>
</a>
</div>
</div>
</template>

<script>
export default {
name: 'RecommendView',
props:{
  recommend:{
    type:Array,
    default(){
      return []
    }
  }
}
}
</script>
<style  scoped>
.recommed{
  display: flex;
  width:100%;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
}
.recommed-item{
  flex: 1;
  display: flex;
  justify-content: center;
  align-content: center;
}
.recommed-item img{
  width:70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>