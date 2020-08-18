<template>
  <div>
    <div ref="box" class="playlistScroll" :class="{'isPlay': $store.state.currentMusic.isShow}">
      <div class="content" ref="content">
        <playlist :trackCount="songs.length" ref="playlist2" @playAll="playAll">
          <searchListItem
            v-for="(item,index) in songs"
            :key="index"
            :songsItem="item"
            :index="index+1"
            @musicPlay="musicPlay"
            @noCopyright="noCopyright"
            @savePlaylist_ids="savePlaylist_ids"
          ></searchListItem>
        </playlist>
      </div>
    </div>
  </div>
</template>

<script>
import playlistTop from "../../PlaylistDetail/childComps/playlistTop";
import searchListItem from "./searchListItem";
import playlist from "../../PlaylistDetail/childComps/playlist";
import BScroll from "better-scroll";

import { musicPlayMixin, playAllMixin } from "@/common/mixin";

import { getPlaylistDetail, getSongDetail } from "@/network/playlistDetail";
import { getSongUrl } from "@/network/home";
import { getSingerPlaylist } from "@/network/singer";

export default {
  name: "searchList",
  components: {
    playlistTop,
    playlist,
    searchListItem
  },
  props: {
    songs: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      playlist: {},
      trackIds: [],
      transparency: 0,
      isFixed: false,
      offsetY: 0,
      flag: false,
      scroll: null,
      musicUrl: []
    };
  },
  methods: {},
  mixins: [musicPlayMixin, playAllMixin],
  created() {
    this.$nextTick(() => {
      this.offsetY = this.$refs.playlist2.$el.offsetTop;
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.flag = true;
      this.scroll = new BScroll(this.$refs.box, {
        probeType: 3,
        click: true
      });
    });
  },
  destroyed() {
    this.flag = false;
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
/* 解决手机浏览器底部工具栏问题 8vh*/

.playlistScroll {
  position: relative;
  height: 90.5vh;
  overflow: hidden;
  z-index: 1;
}
.content {
  padding-bottom: 8vh;
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