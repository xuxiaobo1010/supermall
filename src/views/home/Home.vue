<template>
  <!-- 创建要控制的区域 -->
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      @tabClick="tabClick"
      ref="toptabControl"
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      v-show="istabControlShow"
    ></tab-control>
    <scroll
      :probe-type="3"
      :pull-up-load="true"
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <div class="all">
        <swiper @swiperimageLoad="swiperimageLoad" :banners="banners"></swiper>
      </div>
      <recommend-view :recommend="recommend" />
      <!-- <floor-view :floormessage="floormessage" /> -->
      <feature-view />
      <tab-control
        @tabClick="tabClick"
        ref="tabControl"
        :titles="['流行', '新款', '精选']"></tab-control>
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import {
  getHomeswiperdata,
  getHomefloordata,
  getHomeGoods
} from "network/home";
import { debounce } from "@/common/utils";

import NavBar from "components/common/navbar/NavBar";
import { Swiper } from "../../components/common/swiper";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import RecommendView from "./childComps/RecommendView";
import FloorView from "./childComps/FloorView";
import FeatureView from "./childComps/FeatureView";

export default {
  name: "Home",
  components: {
    NavBar,
    Swiper,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    RecommendView,
    FloorView,
    FeatureView
  },
  data() {
    return {
      // swiperdata: [], //轮播图
      // catitems:[], //导航菜单
      banners: [],
      recommend: [],
      floormessage: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      scroll: null,
      isShowBackTop: false,
      tabOffsetTop: 0,
      istabControlShow: false, //tabControl
      ItemImgListener: null,
      saveY: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  //活跃状态
  activated() {
    // console.log("actived");
    this.$refs.scroll.scrollTo(0, this.saveY);
    this.$refs.scroll.refresh();
  },

  created() {
    //1.获取轮播图数据
    this.getHomeswiperdata();
    //2.获取楼层数据
    this.getHomefloordata();
    //3.获取商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //监听item图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    this.ItemImgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.ItemImgListener);
  },
  deactivated() {
    // console.log('deactived');
    this.saveY = this.$refs.scroll.scroll.y;
    this.$bus.$off("itemImageLoad", this.ItemImgListener);
  },
  methods: {
    /**
     * 事件监听相关的方法
     */

    tabClick(index) {
     // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop"
          break
        case 1:
          this.currentType = "new"
          break
        case 2:
          this.currentType = "sell"
          break
      }
     this.$refs.toptabControl.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
    },
    //回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000);
      // this.$refs.refresh()
    },
    //backTop图片的显示和隐藏
    contentScroll(position) {
      //1.判断我们的backTop是否显示
      this.isShowBackTop = -position.y > 1000;
      //2.决定我们的tabControl是否吸顶(position=fixed)
      this.istabControlShow = -position.y > this.tabOffsetTop;
      // position.y>1355
    },
    //加载更多图片
    loadMore() {
      this.getHomeGoods(this.currentType); //加载数据
      // this.getHomeGoods(this.currentType)
    },

    //监听图片加载
    swiperimageLoad() {
      // console.log(this.$refs.tabControl2.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },
    /**
     * 网络请求相关的方法
     */
    //轮播图数据
    getHomeswiperdata() {
      getHomeswiperdata().then(res => {
        this.banners = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },
    //楼层数据
    getHomefloordata() {
      getHomefloordata().then(res => {
        this.floormessage = res.message;
      });
    },
    //商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, 1).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        //完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>
<style  scoped>
#home {
  /* padding-top: 44px; */

  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
  /* z-index: 10; */
  /* position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
   */
}
/* .all {
  width: 100%;
  margin-top: 44px;
} */
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 10;
}
/* .content{
  height:calc(100% - 49px);
  overflow: hidden;
} */

/* 在原生的scroll中可实现吸顶效果 */
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 10;
} */
</style>