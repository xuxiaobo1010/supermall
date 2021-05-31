<template>
<div class="toast" v-show="isShow" >
  <div >{{message}}</div>
</div>
</template>

<script>
export default {
name: 'Toast',
// props:{
//   message:{
//     type:String,
//     default:''
//   },
//   show:{
//     type:Boolean,
//     default:false
//   }
// },
data() {
  return {
  message:'',
  isShow:false
  }
},
methods: {
  show(message,duration=1200){
    console.log('1');
     this.isShow = true
     this.message = message
     setTimeout(() => {
       this.isShow = false
     this.message = ''
     }, duration);
  }
},
}
</script>
<style  scoped>
.toast{
  position: fixed;
   top: 80%;
   left: 50%;
   font-size: 10px;
   color:#111111 ;
   border: 1px solid #ccc;
   padding: 8px 10px;
   transform: translate(-50%,-50%);
   background-color: rgba(247, 242, 242, 0.1);
   z-index: 999;
   border-radius: 20px;
}
</style>