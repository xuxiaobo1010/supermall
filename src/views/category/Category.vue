<template>
  <div id="category">
   <nav-bar class="category-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories"
      @selectItem="selectItem">
      </tab-menu>
      <scroll id="tab-cate-detail" ref="scroll">
          <div>
            <tab-category-content
            :subcategories="showSubcategory"
            @imgLoad="imgLoad"></tab-category-content>

            <tab-control :titles="['流行', '新品', '销量']"
            @tabClick="tabClick"></tab-control>
            <tab-category-detail :categorydetail="ShowCategoryDetail"></tab-category-detail>
          </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar  from '../../components/common/navbar/NavBar'
import TabControl  from '../../components/content/tabControl/TabControl'

import TabMenu from './childcomps/TabMenu'
import TabCategoryContent  from './childcomps/TabCategoryContent'
import TabCategoryDetail  from './childcomps/TabCategoryDetail'

import Scroll  from '../../components/common/scroll/Scroll'
import {getCategory,getSubcategory,getCategoryDetail}  from '../../network/category.js'
import {debounce} from '../../common/utils'
export default {
  name: "Category",
  components:{
    NavBar,
    TabControl,
    TabMenu,
    TabCategoryContent,
    TabCategoryDetail,
    Scroll,
  },
  data() {
    return {
      categories:[],
      categoryData: {},
      currentIndex:-1,
      currentType:'pop',
      ItemImgListener:null,
    }
  },
  mixins:[],
  created() {
    this._getCategory();

  },
  mounted() {
     const refresh = debounce(this.$refs.scroll.refresh, 500);
    this.ItemImgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.ItemImgListener);
  },
  deactivated() {
     this.$bus.$off("itemImageLoad", this.ItemImgListener);
  },
  computed:{
     showSubcategory() {
		    if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      ShowCategoryDetail(){
        if(this.currentIndex===-1) return []
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
  },
  methods: {
    //点击左边导航事件
    selectItem(index){
     this._getSubcategories(index)
    },
    imgLoad(){
      this.$refs.scroll.refresh()
    },
    tabClick(index){
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
    },

    _getCategory(){
      getCategory().then(res =>{
      console.log(res);
         // 1.获取分类数据
		      this.categories = res.data.category.list
            // 2.初始化每个类别的子数据
           for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
           // 3.请求第一个分类的数据
          this._getSubcategories(0)
    })
    },
    _getSubcategories(index){
      this.currentIndex = index
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then(res =>{
        console.log(res);
        this.categoryData[index].subcategories = res.data
        this.categoryData = {...this.categoryData}
        this._getCategoryDetail('pop')
        this._getCategoryDetail('new')
        this._getCategoryDetail('sell')

      })
    },
     _getCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
  },
  // mounted() {
  // this.scroll =  new BScroll(this.$refs.aaa,{
  //   click:true,
  //     probeType:3,
  //     pullUpLoad:true

  //   })
  //   this.scroll.on('scroll',(position)=>{

  //   })
  //   this.scroll.on('pullingUp',()=>{
  //     console.log('加载成功！');

  //     this.scroll.finishPullUp()
  //   })
  // },
};
</script>
<style  scoped>
#category{
 height: 100vh;
}
.category-bar{
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 600;
  position: relative;
}
.content{
  position: relative;
  height: calc(100% - 49px - 44px);
  display: flex;
  overflow: hidden;
}
#tab-cate-detail{
  flex:1;
  height: 100%;

}
</style>