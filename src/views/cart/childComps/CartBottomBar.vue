<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-botton
        class="check-button"
        ref="check"
        @checkBtnClick="checkBtnClick"
      />
      <span>全选</span>
    </div>
    <div class="price">合计:{{ totalPrice }}</div>
    <div class="calculate"
    @click="calcClick"
    >去计算: {{ checkedLength }}</div>
  </div>
</template>

<script>
import CheckBotton from "./CheckBotton";
import {
BUY_CART
} from '../../../store/mutation-types'
import {mapGetters} from 'vuex'
export default {
  name: "CartBottomBar",
  components: {
    CheckBotton
  },
  methods: {
    checkBtnClick() {
      if (this.$store.getters.cartList.length) {
        this.$refs.check.checked = !this.$refs.check.checked;
        this.$store.commit('changeAllcheck',this.$refs.check.checked)
        // this.$store.getters.cartList.forEach(
        //   v => (v.checked = this.$refs.check.checked)
        // );
      }
    },
    calcClick(){
      // console.log(this.cartList);
      // console.log(this.cartList.indexOf(item =>item.checked===true));
      // this.cartList.filter( item => item.checked===true).length===this.cartList.length
      // console.log(this.cartList.filter(item =>item.checked===true).length);
      if(this.cartList.filter(item =>item.checked===true).length===0){
        this.$toast.show('您还没有选择宝贝哦！')
      }else{
        this.$store.commit(BUY_CART);
         if(this.cartList.length===0){
            this.$refs.check.checked = !this.$refs.check.checked;
         }
          this.$toast.show('支付成功！')
      }
    }
  },
  computed: {
     ...mapGetters(['cartLength','cartList']),
    totalPrice() {
      return (
        "￥" +
        this.$store.getters.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return item.price * item.count + preValue;
          }, 0)
          .toFixed(2)
      );
    },
    checkedLength() {
      return this.$store.getters.cartList.filter(item => {
        return item.checked;
      }).length;
    }
  }
};
</script>
<style  scoped>
.bottom-bar {
  display: flex;
  position: relative;
  height: 40px;
  line-height: 40px;
  justify-content: space-between;
}
.check-content {
  display: flex;
  /* line-height: 40px; */
  align-items: center;
  margin-left: 5px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
}
.calculate {
  padding: 0 5px;
  background-color: red;
  color: #fff;
}
</style>