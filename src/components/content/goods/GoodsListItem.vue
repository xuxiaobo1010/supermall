<template>
<div class="goods-item" @click="itemClick">
  <!-- <a :href="goodsItem.link"> -->
  <img  
    v-lazy="showImage" alt="" @load="imageLoad">
  <!-- <img v-else src="~assets/img/leimu.jpg" alt=""> -->
  <div class="goods-info">
    <p>{{goodsItem.title}}</p>
    <span class="price">{{goods_price}}</span>
    <span class="collect">{{goodsItem.cfav}}</span>
  </div>
  <!-- </a> -->
</div>
</template>

<script>
export default {
name: 'GoodsListItem',
props:{
  goodsItem:{
    type:Object,
    default(){
      return []
    }
  }
},
methods: {
  imageLoad(){

     this.$bus.$emit('itemImageLoad');
    // if(this.$route.path.indexOf('/home')===0){
    //   this.$bus.$emit('homeitemImageLoad');
    // }else if(this.$route.path.indexOf('/detail')===0){
    //    this.$bus.$emit('detailitemImageLoad');
    // }
    
  },
  itemClick(){
    console.log('点击');
    this.$router.push('/detail/'+this.showIid)
  }
},
computed:{
  goods_price(){
    return "￥"+this.goodsItem.price;
  },
  showImage(){
    return this.goodsItem.image || this.goodsItem.img || this.goodsItem.show.img 
  },
  showIid(){
    return this.goodsItem.iid || this.goodsItem.item_id
  }
}
}
</script>
<style  scoped>
.goods-item{
  width: 48%;
padding-bottom:40px;
position: relative;

}
.goods-item img{
  width: 100%;
  border-radius: 5px;
}
.goods-info{
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  /* overflow: hidden; */
  text-align: center;
}
.goods-info p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price{
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect{
position: relative;
}
.goods-info .collect::before{
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>