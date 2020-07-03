<template>
  <div class="audio" ref="bottomAudio" @touchmove="move">
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
      @click="changePlay"
    ></div>
    <audio
      :src="$store.state.currentMusic.url"
      autoplay="autoplay"
      ref="audio"
      @timeupdate="updateProgress"
      @ended="endPlay"
    >
      <source type="audio/mpeg" />
    </audio>
    <div class="totalProgress" @click="changeProgress" @touchstart="start" @touchend="end">
      <div class="progress" :style="{'width': currentProgress}"></div>
    </div>
    <div class="dot" :style="{'left': currentProgress}"></div>
  </div>
</template>

<script>
import { getPlaylistDetail, getSongDetail } from "@/network/playlistDetail";
import { getSongUrl } from "@/network/home";

import { unablePlayMixin } from "@/common/mixin";

export default {
  name: "bottomAudio",
  data() {
    return {
      // isPlay:
      currentValue: 0,
      flag: false
    };
  },
  methods: {
    changePlay() {
      this.$store.commit("changePlay");
      let audio = this.$refs.audio;
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    },
    updateProgress() {
      let audio = this.$refs.audio;
      // console.log(this.$refs.audio.currentTime);
      // console.log(this.$refs.audio.duration);
      if (!this.flag) {
        this.currentValue = audio.currentTime / audio.duration;
      }
    },
    endPlay() {
      this.currentValue = 0;
      this.$store.state.currentMusic.isPlay = false;
    },
    changeProgress(e) {
      let audio = this.$refs.audio;
      this.currentValue = e.offsetX / this.$el.clientWidth;
      audio.currentTime = audio.duration * this.currentValue;
      // e.path[7].view.innerWidth
    },
    start(e) {
      this.currentValue = e.changedTouches[0].pageX / this.$el.clientWidth;
      this.flag = true;
      // console.log(e);
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
    }
  },
  computed: {
    currentProgress() {
      return this.currentValue * 100 + "%";
    }
  },
  created() {
    // console.log(1);
  },
  mounted() {
    this.$bus.$on("musicPlay", id => {
      let currentSong = {};
      this.$axios.all([getSongDetail(id), getSongUrl(id)]).then(
        this.$axios.spread((res1, res2) => {
          // console.log(res1);
          // console.log(res2);
          if (res2.data[0].code === 200) {
            currentSong.ar = res1.songs[0].ar;
            currentSong.name = res1.songs[0].name;
            currentSong.al = res1.songs[0].al;
            currentSong.url = res2.data[0].url;
            currentSong.isPlay = true;
            currentSong.isShow = true;
            this.$store.commit("changeMusic", currentSong);
          } else {
            this.unablePlay();
          }
        })
      );
    });
    this.$bus.$on("noCopyright", () => {
      console.log("无版权");
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
  z-index: 9999999;
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
.icon-pause-circle {
  position: absolute;
  top: 1.5vh;
  right: 20vw;
  width: 4vh;
  height: 4vh;
  font-size: 8vw;
  color: rgb(99, 97, 97);
}
.totalProgress {
  position: absolute;
  top: 0;
  height: 2.2vw;
  width: 100%;
}
.progress {
  position: absolute;
  top: 0;
  /* width: 100%; */
  height: 0.6vw;
  background-color: red;
}
.dot {
  position: absolute;
  top: -0.7vw;
  /* left: 0; */
  width: 2vw;
  height: 2vw;
  border-radius: 50%;
  background-color: red;
}
</style>