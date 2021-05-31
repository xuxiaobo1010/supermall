import {debounce} from './utils'
import BackTop from "components/content/backTop/BackTop";
export const itemListenerMixin ={
  mounted() {
    const  newrefresh = debounce(this.$refs.scroll.refresh, 100);
    this.itemImgListener = ()=>{
      newrefresh();
    }
   this.$bus.$on("itemImageLoad", this.itemImgListener)
  //  console.log('我是混入的内容');
  },
}
export const backTopMixin = {
  components:{
    BackTop
  },
  data: function () {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
      //回到顶部
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 1000);
        // this.$refs.refresh()
      },
  }
}