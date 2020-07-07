<template>
  <div>
    <RecommendResources text="懂你的精选歌单">
      <RecommendResourceItem
        v-for="(item,index) in RecommendResource"
        :key="index"
        :RecommendItem="item"
        @ResourcesItemClick="ResourcesItemClick"
      ></RecommendResourceItem>
    </RecommendResources>
    <RecommendResources text="打开你的音乐假日">
      <RecommendSongsItem v-for="(item,index) in RecommendSongs" :key="index" :SongsItem="item"></RecommendSongsItem>
    </RecommendResources>
    <RecommendResources text="MV精选（可左右滑动）" class="MV">
      <div ref="box" class="box">
        <div class="content" ref="content">
          <!-- <scroll class="mvScroll" :scrollX="true"> -->
          <RecommendMVItem
            v-for="(item,index) in RecommendMV"
            :key="index"
            :MvItem="item"
            class="mvItem"
            @mvClick="mvClick"
            :mvUrl="mvUrls[index]"
          ></RecommendMVItem>
        </div>
      </div>
      <!-- </scroll> -->
    </RecommendResources>
    <RecommendResources text="电台推荐（暂不可用）">
      <RecommendResourceItem
        v-for="(item,index) in RecommendDjprogram"
        :key="index"
        :RecommendItem="item"
        :isShowPlayCount="false"
      ></RecommendResourceItem>
    </RecommendResources>
  </div>
</template>

<script>
import RecommendResources from "./childComps/RecommendResources";
import RecommendResourceItem from "./childComps/RecommendResourceItem";
import RecommendSongsItem from "./childComps/RecommendSongsItem";
import RecommendMVItem from "./childComps/RecommendMVItem";
import BScroll from "better-scroll";
// import Scroll from "@/components/common/Scroll/Scroll";

import { getHomeData } from "@/network/home";
import { getMvData } from "@/network/recommend";
import { ResourcesItemClickMixin, musicPlayMixin } from "@/common/mixin";

import {
  getRecommendResource,
  getRecommendSongs,
  getRecommendMV,
  getRecommendDjprogram
} from "@/network/recommend";

export default {
  name: "Recommend",
  components: {
    RecommendResources,
    RecommendResourceItem,
    RecommendSongsItem,
    RecommendMVItem
    // Scroll
  },
  data() {
    return {
      banners: [],
      flag: false,
      RecommendResource: [],
      RecommendSongs: [],
      RecommendMV: [],
      scroll: {},
      RecommendDjprogram: [],
      mvUrls: []
    };
  },
  mixins: [ResourcesItemClickMixin, musicPlayMixin],
  methods: {
    //获取数据
    getRecommendResource() {
      getRecommendResource().then(res => {
        // console.log(res);
        this.RecommendResource = res.recommend;
        let length = this.RecommendResource.length;
        this.RecommendResource.splice(3, length - 3); //只展示3个数据
      });
    },
    getRecommendSongs() {
      getRecommendSongs().then(res => {
        // console.log(res);
        res.data.dailySongs.forEach(item => {
          let tmp = {};
          tmp.blurPicUrl = item.al.picUrl;
          tmp.name = item.name;
          tmp.reason = item.reason;
          tmp.artist = item.al.name;
          tmp.id = item.id;
          this.RecommendSongs.push(tmp);
        });
        let length = this.RecommendSongs.length;
        this.RecommendSongs.splice(3, length - 3); //只展示3个数据
        // console.log(this.RecommendSongs);
      });
    },
    getRecommendMV() {
      getRecommendMV().then(res => {
        // console.log(res);
        this.RecommendMV = res.result;
        let width = this.RecommendMV.length * 100;
        this.$refs.content.style.width = width + "vw";
        this.$axios
          .all([
            getMvData(this.RecommendMV[0].id),
            getMvData(this.RecommendMV[1].id),
            getMvData(this.RecommendMV[2].id),
            getMvData(this.RecommendMV[3].id)
          ])
          .then(
            this.$axios.spread((res1, res2, res3, res4) => {
              this.mvUrls.push(res1.data.url);
              this.mvUrls.push(res2.data.url);
              this.mvUrls.push(res3.data.url);
              this.mvUrls.push(res4.data.url);
            })
          );
      });
    },
    getRecommendDjprogram() {
      getRecommendDjprogram().then(res => {
        // console.log(res);
        this.RecommendDjprogram = res.result;
      });
    },
    getMvData(id) {
      getMvData(id).then(res => {
        console.log(res);
      });
    },

    //事件方法
    mvClick(id) {
      this.getMvData(id);
    }
  },

  created() {
    if (this.$store.state.userId) {
      this.getRecommendResource();
      this.getRecommendSongs();
      this.getRecommendMV();
      this.getRecommendDjprogram();
    }
  },
  mounted() {
    this.$nextTick(() => {
      // console.log(this.$refs.content.style.width);
      this.scroll = new BScroll(this.$refs.box, {
        probeType: this.probeType,
        click: true,
        // startX: 0,
        scrollX: true,
        scrollY: false
      });
      // console.log(this.scroll);
    });
  }
};
</script>
<style scoped>
.MV {
  position: relative;
  margin-top: 5vh;
}
/* .mvScroll {
  width: 100vw;
} */
.box {
  position: relative;
  width: 100vw;
}
.content {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  /* width: 400vw; */
}
</style>