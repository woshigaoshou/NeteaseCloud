<template>
  <div class="musicList">
    <div class="listContent" :class="{showContent: isShow}">
      <div class="listHead">
        <span @click="changePlayMode" class="playWay">
          <img src="@/assets/img/random_black.svg" v-show="$store.state.currentPlaylist.type === 2" />
          <img src="@/assets/img/loop_black.svg" v-show="$store.state.currentPlaylist.type === 1" />
          <img src="@/assets/img/next_black.svg" v-show="$store.state.currentPlaylist.type === 0" />
        </span>
        <p>{{ modeName }}</p>
      </div>
      <div ref="box" class="listScroll">
        <div class="content" ref="content">
          <listItem v-for="(item,index) in songs" :key="index" :song="item" :index="index" @deleteItem="deleteItem"></listItem>
        </div>
      </div>
      <div class="listBottom" @click="showList">关闭</div>
    </div>
    <div class="mask" @click="showList" v-show="isShow"></div>
  </div>
</template>

<script>
import listItem from "./listItem";
import { getSongDetail } from "@/network/playlistDetail";
import BScroll from "better-scroll";

export default {
  name: "List",
  components: {
    listItem
  },
  data() {
    return {
      songs: [],
      modeName:
        "顺序播放(" + this.$store.state.currentPlaylist.ids.length + "首)",
      isShow: true,
    };
  },
  methods: {
    changePlayMode() {
      this.$store.commit("changeType");
      this.updataModeName();
    },
    showList() {
      this.isShow = false;
      let timer = setTimeout(() => {
        this.$store.commit("isShowList", false);
        this.isShow = true;
      }, 120);
    },
    updataModeName() {
      switch (this.$store.state.currentPlaylist.type) {
        case 0:
          this.modeName =
            "顺序播放(" + this.$store.state.currentPlaylist.ids.length + "首)";
          break;
        case 1:
          this.modeName = "单曲循环";
          break;
        default:
          this.modeName =
            "随机播放(" + this.$store.state.currentPlaylist.ids.length + "首)";
          break;
      }
    },
    deleteItem(index) {
        this.songs.splice(index, 1);
        this.updataModeName();
    }
  },
  computed: {
    text() {}
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.box, {
        probeType: 3,
        click: true
      });
    });
    this.$bus.$on("updateList", () => {
      getSongDetail(this.$store.state.currentPlaylist.ids).then(res => {
        console.log(res);
        this.songs = res.songs;
      });
    });
  }
};
</script>
<style scoped>
@keyframes listMove {
  0% {
    transform: translate(0, 60vh);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
}
@keyframes listBack {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, 60vh);
  }
}
@keyframes mask {
  0% {
    background-color: rgba(0, 0, 0, 0);
  }
  100% {
    background-color: rgba(0, 0, 0, 0.35);
  }
}
.musicList {
  position: absolute;
  bottom: 0;
  height: 60vh;
  width: 100vw;
  /* background-color: #fff; */
  z-index: 999999;
}
.listContent {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #fff;
  transform: translate(0, 60vh);
  animation: listBack 0.8s;
}
.showContent {
  transform: translate(0, 0) !important;
  animation: listMove 0.12s;
}
.listBottom {
  position: absolute;
  bottom: 0;
  height: 8vh;
  width: 100vw;
  line-height: 8vh;
  text-align: center;
  border-top: #eee 1px solid;
  background-color: #fff;
}
.mask {
  position: absolute;
  bottom: 60vh;
  height: 40vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.35);
  z-index: -1;
  animation: mask 0.5s;
}
.listHead {
  display: flex;
  align-items: center;
  height: 6vh;
  padding: 3vw 0 2vw 4vw;
  z-index: 1;
  background-color: #fff;
}
.playWay {
  height: 3.2vh;
  width: 3.2vh;
}
.playWay img {
  height: 100%;
  width: 100%;
}
.listHead p {
  margin: 0 0 0 3vw;
  color: rgb(80, 79, 79);
  font-size: 4vw;
}
.listScroll {
  position: relative;
  height: 46vh;
  overflow: hidden;
}
</style>