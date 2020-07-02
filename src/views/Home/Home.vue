<template>
  <div id="Home">
    <div class="bcColor" :class="{RecommendActive: isRecommendActive}">
      <TopBar class="TopBar">
        <div slot="left" class="icon-menu1"></div>
        <div slot="center">VueMusic</div>
        <div slot="right" class="icon-search2"></div>
      </TopBar>
      <NavBar
        :titles="titles"
        :path="['/Profile','/Recommend','/Rank','/Singer']"
        @itemClick="itemClick"
        class="NavBar"
      ></NavBar>
      <Scroll
        class="homeScroll"
        :probeType="3"
        :style="{'background-color': backColor}"
        ref="scroll"
      >
        <HomeSwiper class="swiper" :banners="banners" v-show="isRecommendActive"></HomeSwiper>
        <keep-alive exclude="Recommend,PlaylistDetail">
          <!-- <keep-alive> -->
          <router-view v-show="$store.state.cookie"></router-view>
        </keep-alive>
      </Scroll>
      <Menu :isShow="showMenu" @menuClick="menuClick" v-show="flag"></Menu>
      <Back
        :titles="['热门','华语','欧美','韩国','日本']"
        v-show="this.$store.state.userId &&  isSingerActive"
      ></Back>
    </div>
  </div>
</template>

<script>
import Home from "@/views/Home/Home";
import NavBar from "@/components/common/NavBar/NavBar";
import TopBar from "@/components/common/TopBar/TopBar";
import HomeSwiper from "./childComps/HomeSwiper";
import Menu from "../Menu/Menu";
import Scroll from "@/components/common/Scroll/Scroll";
import Back from "@/components/content/Back";

import { backColorMixin } from "@/common/mixin";

import { getBanner, getRecommendResource } from "@/network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    TopBar,
    HomeSwiper,
    Menu,
    Scroll,
    Back
  },
  data() {
    return {
      banners: [],
      showMenu: false,
      flag: false,
      isRecommendActive: true,
      titles: ["我的", "推荐", "排行", "歌手"],
      currentIndex: 1,
      // activeChildRoute: "/Recommend",
      scrollY: 0,
      isSingerActive: false
    };
  },
  mixins: [backColorMixin],
  created() {
    this.getBanner();
    this.isSingerActive = this.$route.path === "/Home/Singer" ? true : false;

    // console.log(this.$route);
    // console.log(this.$store.state.cookie);
  },
  mounted() {
    this.$bus.$on("leftClick", () => {
      this.showMenu = true;
      this.flag = true;
    });
    if (this.isRecommendActive) {
      this.$bus.$on("scroll", position => {
        this.transparency = -position.y / 50 < 1 ? -position.y / 50 : 1;
        this.scrollY = -position;
      });
    }
    this.$bus.$on("backClick", index => {
      // console.log(this.$refs.scroll);
      this.$refs.scroll.scrollTo(0, -this.$store.state.ThemeTopYs[index]);
    });
    this.isRecommendActive =
      this.$route.path === "/Home/Recommend" ? true : false;
  },
  methods: {
    //网络请求方法
    getBanner() {
      getBanner("2").then(res => {
        // console.log(res);
        this.banners = res.banners;
        // console.log(this.banners);
      });
    },
    //事件触发方法
    menuClick() {
      this.showMenu = false;
    },
    itemClick(path, index) {
      this.isRecommendActive = path === "/Recommend" ? true : false;
      this.isSingerActive = path === "/Singer" ? true : false;
      this.currentIndex = index;
      this.$bus.$emit("changeIndex", 0);
      this.$refs.scroll.scrollTo(0, 0, 10);

      // this.activeChildRoute = "/Home" + path;
      // console.log(this.activeChildRoute);
    }
  }
};
</script>
<style>
.bcColor {
  background-color: rgba(207, 68, 58, 0.911);
  height: 20vh;
  z-index: 10;
}
.icon-menu1 {
  padding: 1vh;
}
.icon-search2 {
  padding: 1vw;
}
.RecommendActive {
  height: 36vh !important;
}
.homeScroll {
  /* position: absolute; */
  height: calc(100vh - 20vh);
  overflow: hidden;
  /* background-color: #fff; */
  /* z-index: 999; */
}
</style>