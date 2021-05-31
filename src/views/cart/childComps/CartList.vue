<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :item-info="item"
        :key="index"
        @checkAll="checkAll"
      />
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

import CartListItem from "./CartListItem";

import { mapGetters } from "vuex";
export default {
  name: "CartList",
  components: {
    CartListItem,
    Scroll
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  methods: {
    checkAll(){
       this.$emit('checkAllCart');
    }
    
  },
  activated() {
    this.$refs.scroll.refresh()
  },
};
</script>
<style  scoped>
.cart-list {
  height: calc(100% - 49px - 44px - 40px);
}
.content{
  height: 100%;
  overflow: hidden;
}
</style>