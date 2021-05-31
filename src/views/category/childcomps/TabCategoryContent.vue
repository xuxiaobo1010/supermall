<template>
<div class="tab-content">
    <div class="content-item"
    v-for="(item,index) in subcategories.list"
    :key="index">
     <a :href="item.link">
       <img :src="item.image" alt="" @load="imgLoad">
       <div class="item-title">{{item.title}}</div>
       </a>
    </div>
</div>
</template>

<script>
export default {
name: 'TabCategoryContent',
props:{
  subcategories:{
    type:Object,
    default(){
      return {}
    }
  }
},
methods: {
  imgLoad(){
    this.$emit('imgLoad')
  }
},
}
</script>
<style  scoped>
.tab-content{
  display: flex;
  flex-wrap: wrap;
  
}
.content-item{
  width: 31%;
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  margin-top: 1px;

}
.content-item img{
  width: 80%;
  margin-left: 5px;
}

.item-title{
  font-size: 12px;
  text-align: center;
}
</style>