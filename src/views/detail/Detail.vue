<template>
  <div id="detail">
    <!-- 导航 -->
    <detail-nav-bar ref="detailnav" class="detail-nav" @titleClick="titleClick" />
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info
        :detail-info="detailInfo"
        @detailImageLoad="detailImageLoad"
      />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
     <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart" />
    <!-- <toast :message="message" :show="show" /> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar  from './childComps/DetailBottomBar'


import Scroll from "components/common/scroll/Scroll";
import GoodsList from "../../components/content/goods/GoodsList";

import { debounce } from "common/utils";
import { itemListenerMixin ,backTopMixin} from "common/mixin";
import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam
} from "network/detail.js";


// import Toast from 'components/common/toast/Toast'
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,

  },
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
      iid: null,
      topImages: null,
      goods: {}, //商品详情里的商品信息
      shop: {}, //店铺的信息
      detailInfo: {}, //展示信息
      paramInfo: {}, //参数信息
      commentInfo: {}, //评论信息
      recommends: [],
      itemImgListener: null, //监听刷新
      themeTopYs: [], //主题的Y坐标
      currentIndex: 0, //当前激活的导航
      // message:'',
      // show:false
       
    };
  },
  created() {
    //1-获取iid
    this.iid = this.$route.params.iid;
    //2-请求详情数据
    getDetail(this.iid).then(res => {
      // onsole.log(res);
      const data = res.result;
      //1.获取顶部图片的轮播图
      this.topImages = res.result.itemInfo.topImages;
      //2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //3.创建店铺信息
      this.shop = new Shop(data.shopInfo);
      //4.保存商品的详情数据
      this.detailInfo = data.detailInfo;
      //5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    //3.请求推荐数据
    getRecommend().then(res => {
      console.log(res);
      this.recommends = res.data.list;
    });
    // this.$nextTick(() => {

    // });
  },
  mounted() {},
  updated() {},
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    addToCart(){
      //获取购物车需要展示的信息
    
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      // product.price = this.goods.newPrice
      product.iid = this.iid;
      product.price = this.goods.nowPrice;
      // product.checked = false
      // this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product).then(res =>{
      //     this.show= true
      //  this.message=res
      //  setTimeout(() => {
      //    this.show = false
      //    this.message = ''
      //  }, 1500);
         this.$toast.show(res,1500)
      })
    },
    
    detailImageLoad() {
      // console.log('detailImage');
      this.$refs.scroll.refresh();
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs);
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500);
    },
    contentScroll(position) {
     
      //1.获取y值
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      for (let i = 0; i < length-1; i++) {
        // if(positionY>this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])
        //方法一
        if(this.currentIndex!==i &&(positionY>this.themeTopYs[i] && positionY<this.themeTopYs[i+1])){
          this.currentIndex = i;
          this.$refs.detailnav.currentIndex = this.currentIndex
        }


        // 方法二:
        // if (
        //   this.currentIndex !== i &&(
        //   ( i < length - 1 &&
        //       positionY >= this.themeTopYs[i] &&
        //       positionY < this.themeTopYs[i + 1]) ||
        //   (i === length - 1 && positionY > this.themeTopYs[i])
        // )) {
        //   this.currentIndex = i;
        //   // console.log(this.currentIndex);
        //   this.$refs.detailnav.currentIndex = this.currentIndex
        // }
      }
        //2.判断我们的backTop是否显示
      this.isShowBackTop = -position.y > 1000;
    }
  }
};
</script>
<style  scoped>
#detail {
  position: relative;
  background-color: #fff;
  height: 100vh;
  z-index: 9;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>