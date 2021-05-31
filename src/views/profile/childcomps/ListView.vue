<template>
<div class="list">
<div class="list-item" 
v-for="(item,index) in list"
:key="index"
>
<div class="item-img"><i :class="item.img"></i></div>
<div class="item-content">{{item.info}}</div>
</div>

</div>

</template>

<script>
export default {
name: 'ListView',
props:{
  list:{
    type:Array,
    default(){
      return []
    }
  }
}
}
</script>
<style  scoped>
.list{
  display: flex;
  flex-direction: column;
    margin-top: 15px;
}
.list-item{
  background-color: #fff;
  height: 50px;
  margin-bottom: 1px;
  display: flex;

}
.list-item .item-img{
  width: 50px;
  line-height: 50px;
  padding-left: 10px;
}
.item-img i{
 font-size: 20px;
 color: pink ;
}
.item-content{
  line-height: 50px;
  margin-left: -5px;
}
</style>