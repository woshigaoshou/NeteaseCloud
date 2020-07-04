<template>
  <div class="playlist">
    <TopBar>
      <div slot="left">
        <span class="icon-play-circle-o" @click="playAll"></span>
      </div>
      <div slot="center" class="text">
        <p>播放全部</p>
        <p class="trackCount">{{ '(共' + trackCount +'首)' }}</p>
      </div>
    </TopBar>
    <slot></slot>
  </div>
</template>

<script>
import TopBar from "@/components/common/TopBar/TopBar";

export default {
  name: "playlist",
  components: {
    TopBar
  },
  props: {
    trackCount: {
      type: Number,
      default: 0
    }
  },
  methods: {
    playAll() {
      this.$emit("playAll");
    }
  }
};
</script>
<style scoped>
.playlist {
  background-color: #fff;
  border-top-left-radius: 4vw;
  border-top-right-radius: 4vw;
  overflow: hidden;
  margin-bottom: 1.5vh;
}
.icon-play-circle-o,
.text {
  font-size: 4vw;
  color: #000;
  height: 5.5vh;
}
.text {
  display: flex;
  margin-left: -3vw;
}
p {
  margin: 0;
  height: 5.5vh !important;
  line-height: 5.5vh !important;
}
.trackCount {
  font-size: 3vw;
  color: rgb(109, 109, 109);
  margin-left: 1.2vw;
}
.icon-play-circle-o {
  align-items: center;
  justify-content: center;
  font-size: 5.2vw;
  padding: 1vw 2vw;
}
</style>