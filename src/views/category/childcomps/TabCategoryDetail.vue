<template>
<div class="category-detail">
 <GoodsList :goods="categorydetail">
   <!-- <GoodsListItem v-for="(item,index) in goods" :goodsItem="item" :key="index" /> -->
 </GoodsList>
</div>
</template>

<script>
import GoodsList  from '../../../components/content/goods/GoodsList'
import GoodsListItem  from '../../../components/content/goods/GoodsListItem'
export default {
name: 'TabCategoryDetail',
components:{
  GoodsList,
  GoodsListItem
},
props:{
  categorydetail:{
      type:Array,
      default(){
        return []
      }
  }
}
}
</script>
<style  scoped>
</style>