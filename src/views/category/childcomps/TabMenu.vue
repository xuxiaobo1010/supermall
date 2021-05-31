<template>
<scroll id="tab-menu">
<div class="menu-list">
   <div class="list-item" 
   v-for="(item,index) in categories" 
   :key="index"
   :class="{active:currentIndex===index}"
   @click="clickItem(index)">
     {{item.title}}
   </div>
</div>
</scroll>

</template>

<script>
import Scroll from '../../../components/common/scroll/Scroll'
export default {
name: 'TabMenu',
components:{
   Scroll
},
props:{
  categories:{
    type:Array,
    default(){
      return {}
    }
  }
},
data() {
  return {
    currentIndex:0
  }
},
methods: {
  clickItem(index){
    this.currentIndex = index;
     this.$emit('selectItem', index)
  }
},
}
</script>
<style  scoped>
#tab-menu{
  width: 100px;
  height: 100%;
  background-color: #f6f6f6;
  overflow: hidden;
}
.menu-list{
  display: flex;
  flex-direction: column;
}

.list-item{
  text-align: center;
  padding: 15px 0;
  font-size: 15px;
}
.active{
  background-color: #fff;
  color: var(--color-tint);
}
</style>