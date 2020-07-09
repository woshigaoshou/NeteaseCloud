<template>
  <div class="audio" ref="bottomAudio" @touchmove="move" @click="entryDetail">
    <div class="picUrl">
      <img :src="$store.state.currentMusic.al.picUrl" alt />
    </div>
    <div class="musicInfo">
      <p>{{ $store.state.currentMusic.name }}</p>
      <p>-</p>
      <p>{{ $store.state.currentMusic.ar[0].name }}</p>
    </div>
    <div
      :class="{'icon-play-circle': !$store.state.currentMusic.isPlay,'icon-pause-circle': $store.state.currentMusic.isPlay}"
      @click.stop="changePlay"
    ></div>
    <div class="list" @click.stop="showList">
      <img src="@/assets/img/list.svg" alt />
    </div>
    <audio
      :src="$store.state.currentMusic.url"
      autoplay="autoplay"
      ref="audio"
      @timeupdate="updateProgress"
      @ended="endPlay"
    >
      <source type="audio/mpeg" />
    </audio>
    <div class="audioProgress">
      <div
        class="totalProgress"
        @click.stop="changeProgress"
        @touchstart.stop="start"
        @touchend.stop="end"
        ref="totalProgress"
      >
        <div class="progress" :style="{'width': currentProgress}"></div>
      </div>
      <div class="dot" :style="{'left': dotCurrentProgress}"></div>
    </div>
  </div>
</template>

<script>
import { getPlaylistDetail, getSongDetail } from "@/network/playlistDetail";
import { getSongUrl } from "@/network/home";

import {
  unablePlayMixin,
  musicPlayMethodsMixin,
  playAllMixin
} from "@/common/mixin";

export default {
  name: "bottomAudio",
  components: {},
  data() {
    return {
      isShowList: false
    };
  },
  mixins: [unablePlayMixin, musicPlayMethodsMixin, playAllMixin],
  methods: {
    entryDetail() {
      let id = this.$store.state.currentMusic.id;
      // console.log(this.$store.state);

      this.$router.push({ path: "/musicDetail", query: { id } });
    },
    changeProgress(e) {
      let this_audio = this.$store.state.this_audio; //musicDetail的this.$refs取不到audio标签，所以取bottomAudio组件的this
      let audio = this_audio.$refs.audio;
      // console.log(e);
      // console.log(this.$refs.totalProgress.offsetWidth);
      this.currentValue = e.offsetX / this.$refs.totalProgress.offsetWidth;
      // console.log(this.currentValue);
      audio.currentTime = audio.duration * this.currentValue;
      // e.path[7].view.innerWidth
    },
    start(e) {
      this.currentValue = e.changedTouches[0].pageX / this.$el.clientWidth;
      this.flag = true;
      console.log(e);
    },
    move(e) {
      if (this.flag) {
        this.currentValue = e.changedTouches[0].pageX / this.$el.clientWidth;
      }
      // console.log(e);
    },
    end() {
      let audio = this.$refs.audio;
      audio.currentTime = audio.duration * this.currentValue;
      this.flag = false;
    },
    showList() {
      this.$store.commit("isShowList", true);
    }
  },
  created() {
    // console.log(1);
    this.$store.commit("saveAudioThis", this);
  },
  mounted() {
    this.$bus.$on("musicPlay", id => {
      // console.log(!this.$store.dispatch("changeMusic", id));

      this.$store.dispatch("changeMusic", {
        id,
        that: this.$store.state.this_musicDetail
      });
    });
    this.$bus.$on("noCopyright", () => {
      // console.log("无版权");
    });
    this.$bus.$on("playAll", () => {
      // this.$store.commit("changeContinuePlay", true);
      this.$bus.$emit("musicPlay", this.$store.state.currentPlaylist.ids[0]);
    });
  }
};
</script>
<style scoped>
.audio {
  display: flex;
  position: fixed;
  bottom: 0;
  height: 8vh;
  width: 100%;
  z-index: 9999;
  border-top: 1px solid #eee;
  background-color: #fff;
}
.picUrl {
  margin-top: 1vh;
  margin-left: 4vw;
  width: 6vh;
  height: 6vh;
}
.picUrl img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.musicInfo {
  display: flex;
  width: 50vw;
  margin-left: 4vw;
  font-size: 3.2vw;
}
.musicInfo p:nth-child(2) {
  padding: 0 1vw;
}
.musicInfo p {
  margin: 0;
  line-height: 8vh;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.icon-play-circle,
.icon-pause-circle,
.list {
  position: absolute;
  top: 1.5vh;
  right: 20vw;
  width: 4vh;
  height: 4vh;
  font-size: 8vw;
  color: rgb(99, 97, 97);
}
.list {
  right: 7vw;
}
.list img {
  width: 100%;
  height: 100%;
}
.audioProgress {
  position: absolute;
  top: -0.5vh;
  height: 0.5vh;
  width: 100vw;
}
.totalProgress {
  position: absolute;
  top: -0.3vh;
  padding: 0.5vh 0;
  height: 0.6vw;
  width: 100%;
  z-index: 999999;
}
.progress {
  position: absolute;
  /* top: -0.3vh; */
  /* width: 100%; */
  height: 0.6vw;
  background-color: red;
}
.dot {
  position: absolute;
  top: -0.5vw;
  width: 2vw;
  height: 2vw;
  border-radius: 50%;
  background-color: red;
}
</style>