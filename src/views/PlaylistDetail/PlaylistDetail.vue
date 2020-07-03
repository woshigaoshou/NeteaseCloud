<template>
  <div class="playlistDetail">
    <TopBar class="topBar" :style="{'background-color': backColor}" ref="playlistTopBar">
      <div slot="left" class="icon-arrow-left" @click="returnHistory"></div>
      <p slot="center" :class="{listName : (transparency>0.6)}">{{ listName }}</p>
      <div slot="center" class="icon-search2"></div>
      <div slot="right" class="right">
        <div class="icon-more-vertical"></div>
      </div>
    </TopBar>
    <playlist :trackCount="playlist.trackCount" ref="playlist1" class="playlist1" v-show="isFixed"></playlist>
    <!-- <Scroll class="playlistScroll" :probeType="3" ref="scroll"> -->
    <div ref="box" class="playlistScroll" :class="{'isPlay': $store.state.currentMusic.isShow}">
      <div class="content" ref="content">
        <playlistTop :playlist="playlist"></playlistTop>
        <playlist :trackCount="playlist.trackCount" ref="playlist2">
          <playlistItem
            v-for="(item,index) in songs"
            :key="index"
            :songsItem="item"
            :index="index+1"
            @musicPlay="musicPlay"
            @noCopyright="noCopyright"
          ></playlistItem>
        </playlist>
      </div>
    </div>
    <!-- </Scroll> -->
    <div class="TopColor">
      <div></div>
      <img :src="playlist.coverImgUrl" alt />
    </div>
    <div class="baColor"></div>
  </div>
</template>

<script>
import TopBar from "@/components/common/TopBar/TopBar";
import playlistTop from "./childComps/playlistTop";
import playlistItem from "./childComps/playlistItem";
import playlist from "./childComps/playlist";
// import Scroll from "@/components/common/Scroll/Scroll";
import BScroll from "better-scroll";

import { returnHistoryMixin, musicPlayMixin } from "@/common/mixin";

import { getPlaylistDetail, getSongDetail } from "@/network/playlistDetail";
import { getSongUrl } from "@/network/home";
import { getSingerPlaylist } from "@/network/singer";

export default {
  name: "PlaylistDetail",
  components: {
    TopBar,
    playlistTop,
    playlist,
    playlistItem
    // Scroll
  },
  data() {
    return {
      playlist: {},
      trackIds: [],
      songs: [],
      listName: "歌单",
      transparency: 0,
      isFixed: false,
      offsetY: 0,
      flag: false,
      scroll: null,
      musicUrl: []
    };
  },
  computed: {
    backColor() {
      return "rgba(207, 68, 58 , " + this.transparency + ")";
    }
  },
  methods: {
    async getPlaylistDetail(id, cookie) {
      let ids = [];
      await getPlaylistDetail(id, cookie).then((res, reject) => {
        console.log(res);
        this.playlist = res.playlist;
        this.playlist.trackIds.forEach((item, index) => {
          ids.push(item.id);
        });
      });
      return new Promise((resolve, reject) => {
        resolve(ids);
      });
    },
    async getSongDetail() {
      this.trackIds = await this.getPlaylistDetail(
        this.$route.query.id,
        this.$store.state.cookie
      );
      // console.log(this.trackIds);
      getSongDetail(this.trackIds).then(res => {
        // console.log(res);
        this.songs = res.songs;
        // console.log(this.songs);
      });
      getSongUrl(this.trackIds).then(res => {
        // console.log(res);
        this.musicUrl = res.data;
      });
    }
  },
  mixins: [returnHistoryMixin, musicPlayMixin],
  created() {
    // this.getPlaylistDetail(this.$route.query.id, this.$store.state.cookie);
    this.getSongDetail();

    this.$nextTick(() => {
      // this.offsetY =
      //   this.$refs.playlist2.$el.offsetTop -
      //   this.$refs.playlistTopBar.$el.clientHeight;
      this.offsetY = this.$refs.playlist2.$el.offsetTop;
    });
    // console.log(this.$route);

    // console.log(this.$route.params.id);
  },
  mounted() {
    this.$nextTick(() => {
      this.flag = true;
      // console.log(this.$refs.content.style.width);
      this.scroll = new BScroll(this.$refs.box, {
        probeType: 3,
        click: true
      });
      this.scroll.on("scroll", position => {
        // console.log(position);
        if (this.flag) {
          this.transparency = -position.y / 130 > 1 ? 1 : -position.y / 130;
          this.scrollY = -position;

          //设置固定
          if (this.songs.length > 10) {
            this.isFixed = -position.y > this.offsetY;
          }
          // console.log(this.isFixed);
          // console.log(this.offsetY);
          // console.log(this.$refs.playlist2.$el.offsetTop);
          // console.log(this.$refs.playlistTopBar.$el.clientHeight);

          //设置显示歌单名比例
          if (this.transparency > 0.6) {
            this.listName = this.playlist.name;
          } else {
            this.listName = "歌单";
          }
        }
      });
    });
  },
  destroyed() {
    // location.reload();
    this.flag = false;
    // console.log("离开了");
  }
};
</script>
<style scoped>
.playlistDetail {
  position: relative;
}
.topBar {
  position: relative;
  z-index: 999;
}
.icon-arrow-left {
  display: flex;
  padding: 0;
  padding-left: 3vw;
  font-size: 6.5vw;
  line-height: 5.5vh;
}
p {
  margin: 0 0 0 -7vw;
  padding-left: 1vw;
  font-size: 4.2vw;
  text-align: left;
}
.right {
  line-height: 5.5vh;
  text-align: right;
}
.icon-more-vertical {
  font-size: 7vw;
  margin-top: 1.3vh;
  margin-right: 3vw;
}
.icon-search2 {
  position: absolute;
  right: -4vw;
  top: 0.7vh;
  font-size: 8vw;
}
.playlistScroll {
  position: relative;
  height: 90.5vh;
  overflow: hidden;
  z-index: 1;
}
.isPlay {
  height: calc(90.5vh - 8vh);
}
.playlist1 {
  position: fixed;
  top: 9.5vh;
  width: 100%;
  z-index: 9999;
}
.baColor {
  position: fixed;
  bottom: 0;
  height: 50vh;
  width: 100%;
  background-color: #fff;
}
.TopColor {
  position: fixed;
  top: 0;
  height: 50vh;
  width: 100%;
}
.TopColor img {
  margin-top: -50vh;
  width: 150%;
  -webkit-filter: blur(40px);
  -moz-filter: blur(40px);
  -o-filter: blur(40px);
  -ms-filter: blur(40px);
  filter: blur(40px);
}
.TopColor div:nth-child(1) {
  background-color: rgba(148, 132, 132, 0.5);
  width: 100%;
  height: 100%;
  z-index: 1;
}
.listName {
  /* margin: 0 !important; */
  width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>