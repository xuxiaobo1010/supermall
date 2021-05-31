<template>
<div>
  <nav-bar>
    <div slot='left' class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div :class="{active:currentIndex===index}" 
      class="item"
       v-for="(item,index) in titles"
        :key="index"
        @click="titleClick(index)">
        {{item}}
      </div>
    </div>
  </nav-bar>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'


export default {
name: 'DetailNavBar',
components:{
  NavBar
},
data() {
  return {
    titles:['商品','参数','评论','推荐'],
    currentIndex:0
  }
},
methods: {
  titleClick(index){
    this.currentIndex=index;
    this.$emit('titleClick',index);
  },
  backClick(){
    this.$router.back()
  }
},
}
</script>
<style  scoped>
.title{
  display: flex;
  /* justify-content: space-between; */
  font-size: 13px;
}
.item{
 flex: 1;
}
.active{
  color: var(--color-high-text);
}
.back{
  
  box-sizing: border-box;
}
.back img{
  position: relative;
   top:8px;
}
</style>