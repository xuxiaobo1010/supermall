<template>
  <div id="shop-item">
    <div class="item-selector">
      <check-button
        @checkBtnClick="checkedChange"
        :is-checked="itemInfo.checked"
       ></check-button>
       <!-- v-model="itemInfo.checked" -->
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ itemInfo.title }}</div>
      <div class="item-desc">商品描述: {{ itemInfo.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{ itemInfo.price }}</div>
        <div class="item-count right">
          <button class="item-btn" @click="decreament(itemInfo.iid)" >-</button>
          {{ itemInfo.count }}
          <button class="item-btn"  @click="increament(itemInfo.iid)" >+</button></div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ADD_COUNTER,
  REDUCE_COUNTER
} from '../../../store/mutation-types'
import CheckButton from './CheckBotton'
export default {
name: 'CartListItem',
props:{
  itemInfo:{
    type:Object,
    default(){
      return {}
    }
  }
},
components:{
  CheckButton
},
 methods: {
      checkedChange() {
        this.itemInfo.checked = !this.itemInfo.checked;
        this.$store.commit('changecheck',{iid:this.itemInfo.iid,checked:this.itemInfo.checked})
        this.$emit("checkAll")
      },
      //减少数量
      decreament(iid){
          let product =  this.$store.state.CartList.find(item =>item.iid===iid)
          if(product.count>1)
          this.$store.commit(REDUCE_COUNTER,product)
      },
      //增加数量
      increament(iid){

         let product =  this.$store.state.CartList.find(item =>item.iid===iid)
         this.$store.commit(ADD_COUNTER,product)
      }
 }
}
</script>
<style  scoped>
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
  /*border: 1px solid #ccc;*/
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: orangered;
}
.item-count .item-btn{
  padding: 1px 6px;
  margin: 0 3px;
  touch-action: none;
  background-color: #fff;
  border: 1px solid #ccc;
}
</style>