<template>
  <div class="musicDetail" @touchmove="move">
    <TopBar class="topBar" ref="playlistTopBar">
      <div slot="left" class="icon-arrow-left" @click="returnHistory"></div>
      <p slot="center">{{ music.name }}</p>
      <p slot="center" @click="singerClick(music.ar[0].id)">{{ music.ar[0].name }} ></p>
    </TopBar>
    <div class="picUrl">
      <img :src="music.al.picUrl" :class="{imgAnimation : $store.state.currentMusic.isPlay}" />
      <!-- 添加波浪动画效果 -->
      <div :class="{'divergence1': !isActive && $store.state.currentMusic.isPlay}"></div>
      <div :class="{'divergence2':!isActive && $store.state.currentMusic.isPlay}"></div>
      <div :class="{'divergence1_fast': isActive && $store.state.currentMusic.isPlay}"></div>
      <div :class="{'divergence2_fast': isActive && $store.state.currentMusic.isPlay}"></div>
    </div>
    <div class="detailBottom">
      <span class="currentTime">{{ $store.state.this_audio.$refs.audio.currentTime | showPlayTime }}</span>
      <span class="duration">{{ $store.state.this_audio.$refs.audio.duration | showPlayTime}}</span>
      <div class="playProgress" @touchstart="start" @touchend="end" @click="changeProgress">
        <div class="totalProgress" ref="totalProgress">
          <div class="progress" :style="{'width': currentProgress}"></div>
        </div>
        <div class="dot" :style="{'left': dotCurrentProgress}"></div>
      </div>
      <div class="btn">
        <span @click="changePlayMode" class="playWay">
          <img src="@/assets/img/random.svg" v-show="$store.state.currentPlaylist.type === 2" />
          <img src="@/assets/img/loop.svg" v-show="$store.state.currentPlaylist.type === 1" />
          <img src="@/assets/img/next.svg" v-show="$store.state.currentPlaylist.type === 0" />
        </span>
        <!-- <span
          :class="{
          'icon-shuffle': $store.state.currentPlaylist.type ===2,
          'icon-cw': $store.state.currentPlaylist.type ===1,
          'icon-retweet': $store.state.currentPlaylist.type ===0}"
        ></span>-->
        <span class="icon-skip-back" @click="preMusic"></span>
        <span
          :class="{'icon-play-circle': !$store.state.currentMusic.isPlay,'icon-pause-circle': $store.state.currentMusic.isPlay}"
          @click.stop="changePlay"
        ></span>
        <span class="icon-skip-forward" @click="nextMusic"></span>
        <span class="icon-menu1" @click.stop="showList"></span>
      </div>
    </div>

    <div class="background">
      <div class="mask"></div>
      <!-- <div :style="{background: 'url(' + music.al.picUrl + ') no-repeat 13%'}" class="coverImg"></div> -->
      <img :src="music.al.picUrl" alt />
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/common/TopBar/TopBar";

import { getSongDetail } from "@/network/playlistDetail";

import {
  returnHistoryMixin,
  musicPlayMethodsMixin,
  singerClickMixin,
  playTimeFilter
} from "@/common/mixin";

export default {
  name: "MusicDetail",
  components: {
    TopBar
  },
  data() {
    return {
      music: {
        al: {
          picUrl: ""
        },
        ar: [
          {
            name: "",
            id: 0
          }
        ],
        name: ""
      },
      isActive: false,
      count: 0
    };
  },
  mixins: [
    returnHistoryMixin,
    musicPlayMethodsMixin,
    singerClickMixin,
    playTimeFilter
  ],
  methods: {
    getSongDetail(id) {
      getSongDetail(id).then(res => {
        console.log(res);
        this.music = res.songs[0];
      });
    },
    start(e) {
      // console.log(this.$refs);

      this.currentValue =
        (e.changedTouches[0].pageX -
          this.$refs.totalProgress.offsetParent.offsetLeft) /
        this.$refs.totalProgress.offsetWidth;
      this.flag = true;
      // console.log(
      //   e.changedTouches[0].pageX -
      //     this.$refs.totalProgress.offsetParent.offsetLeft
      // );
      // console.log(this.$refs.totalProgress.offsetWidth);

      // console.log(this.currentValue);
    },
    move(e) {
      if (this.flag) {
        if (
          e.changedTouches[0].pageX <=
          this.$refs.totalProgress.offsetParent.offsetLeft
        ) {
          this.currentValue = 0;
        } else if (
          e.changedTouches[0].pageX >=
          this.$refs.totalProgress.offsetWidth +
            this.$refs.totalProgress.offsetParent.offsetLeft
        ) {
          this.currentValue = 1;
        } else {
          this.currentValue =
            (e.changedTouches[0].pageX -
              this.$refs.totalProgress.offsetParent.offsetLeft) /
            this.$refs.totalProgress.offsetWidth;
        }
      }
    },
    end() {
      let this_audio = this.$store.state.this_audio; //musicDetail的this.$refs取不到audio标签，所以取bottomAudio组件的this
      let audio = this_audio.$refs.audio;
      audio.currentTime = audio.duration * this.currentValue;
      this.flag = false;
    },
    changePlayMode() {
      this.$store.commit("changeType");
    },
    preMusic() {
      let this_musicDetail;
      if (this.$store.state.this_musicDetail) {
        this_musicDetail = this.$store.state.this_musicDetail;
      }
      let index = this.$store.state.currentPlaylist.index;
      let ids = this.$store.state.currentPlaylist.ids;
      let id = ids[index - 1];

      // 直接改变state的状态值，这样避免两次播放同一个无法播放的歌曲，否则会在endPlay时再index-1，再次判断无法播放的歌曲
      this.$store.commit("changeIndex", -1);

      //修改isPreMusic  再到action 失败的时候判断是否是true  是的话index-1  成功将isPreMusic改为false
      this.$store.commit("changeIsPreMusic", true);

      this_musicDetail.$router.push({ path: "/musicDetail", query: { id } });
      this_musicDetail.getSongDetail(id);
      this.$bus.$emit("musicPlay", ids[index - 1]);
      this.$store.commit("changeCount");
    },
    nextMusic() {
      let this_musicDetail;
      if (this.$store.state.this_musicDetail) {
        this_musicDetail = this.$store.state.this_musicDetail;
      }
      let index = this.$store.state.currentPlaylist.index;
      let ids = this.$store.state.currentPlaylist.ids;
      let id = ids[index + 1];
      // 直接改变state的状态值，这样避免两次播放同一个无法播放的歌曲，否则会在endPlay时再index-1，再次判断无法播放的歌曲
      this.$store.commit("changeIndex", +1);

      //修改isNextMusic  再到action 失败的时候判断是否是true  是的话index+1  成功将isNextMusic改为false
      this.$store.commit("changeIsNextMusic", true);

      this_musicDetail.$router.push({ path: "/musicDetail", query: { id } });
      this_musicDetail.getSongDetail(id);
      this.$bus.$emit("musicPlay", ids[index + 1]);
      this.$store.commit("changeCount");
    },
    changeProgress(e) {
      // 添加点击事件之后出发touchstart更流畅
    },
    showList() {
      this.$store.commit("isShowList", true);
    }
  },
  created() {
    this.$store.commit("saveDetailThis", this);
    if (!this.$store.state.currentMusic.url) {
      this.$bus.$emit("musicPlay", this.$route.query.id);
    }
    this.getSongDetail(this.$route.query.id);
    setInterval(() => {
      this.count++;
      if (this.count === 5) this.isActive = true;
      else if (this.count === 8) {
        this.isActive = false;
        this.count = 0;
      }
    }, 1000);
  },
  mounted() {}
};
</script>
<style scoped>
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes divergence {
  0% {
    width: 60vw;
    height: 60vw;
  }
  70% {
    width: 75vw;
    height: 75vw;
    opacity: 1;
  }
  100% {
    width: 85vw;
    height: 85vw;
    opacity: 0;
  }
}
.musicDetail {
  width: 100vw;
  height: 100vh;
  /* position: absolute; */
  /* top: 0; */
  /* background-color: #000; */
  overflow: hidden;
  z-index: 9999999;
}
.topBar {
  position: relative;
  z-index: 999;
}
.topBar div p:nth-child(2) {
  font-size: 2.5vw;
  margin-top: -2.5vh;
  color: rgb(224, 220, 220);
}
.icon-arrow-left {
  display: flex;
  padding: 0;
  padding-left: 3vw;
  font-size: 6.5vw;
  line-height: 5.5vh;
}
p {
  margin: -2vw 0 0 -7vw;
  padding-left: 1vw;
  font-size: 4.2vw;
  text-align: left;
}
.picUrl {
  width: 60vw;
  height: 60vw;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* overflow: hidden; */
}
.imgAnimation {
  animation: rotate 25s infinite linear;
}
.picUrl div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60vw;
  height: 60vw;
  border: 1px solid #fff;
  border-radius: 50%;
  z-index: 9;
  box-sizing: border-box;
}
.divergence1 {
  animation: divergence 2.5s infinite linear;
}
.divergence2 {
  animation: divergence 2.5s 1.25s infinite linear;
}
.divergence1_fast {
  animation: divergence 1.2s infinite linear;
}
.divergence2_fast {
  animation: divergence 1.2s 0.6s infinite linear;
}
/* .divergence3 {
  animation: divergence 2s 1.2s infinite linear;
} */

.picUrl img {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.background {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  opacity: 0.7;
  overflow: hidden;
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0.8;
  background-color: rgba(10, 10, 10, 0.356);
}
.background img {
  position: absolute;
  top: -10vh;
  left: -13%;
  width: 300vw;
  z-index: -1;
  opacity: 0.6;
  filter: blur(12px);
}
/* .coverImg {
  width: 100vw;
  height: 100vh;
  background-size: 300vw !important;
  opacity: 0.9;
} */
.detailBottom {
  position: absolute;
  bottom: 0;
  height: 18vh;
  width: 100vw;
}
.playProgress {
  position: absolute;
  width: 70%;
  top: 0;
  left: 15%;
  /* padding: 1vh 0 1vh 1vh; */
}
.totalProgress {
  position: absolute;
  top: 1vh;
  /* left: 15%; */
  /* margin-left: 15vw; */
  height: 0.6vw;
  width: 100%;
  background-color: rgb(223, 223, 223);
}
.progress {
  position: absolute;
  /* width: 100%; */
  height: 0.6vw;
  background-color: red;
}
.dot {
  position: absolute;
  top: 0.65vh;
  width: 2vw;
  height: 2vw;
  /* margin-left: 15vw; */
  border-radius: 50%;
  background-color: rgb(255, 255, 255);
}
.currentTime {
  position: absolute;
  width: 8vw;
  height: 2vh;
  left: 3vw;
  color: #fff;
}
.duration {
  position: absolute;
  width: 8vw;
  height: 2vh;
  color: #fff;
  right: 5vw;
}
.btn {
  display: flex;
  width: 76vw;
  position: absolute;
  top: 30%;
  padding: 0 12vw;
  font-size: 6vw;
  color: #fff;
}
.btn span:nth-child(3) {
  font-size: 12vw;
  padding: 0 3.5vw;
}
.btn span {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.playWay {
  height: 12vw;
}
.playWay img:nth-child(2),
.playWay img:nth-child(3) {
  width: 65%;
  height: 65%;
}
.playWay img:nth-child(1) {
  width: 75%;
  height: 75%;
}
</style>