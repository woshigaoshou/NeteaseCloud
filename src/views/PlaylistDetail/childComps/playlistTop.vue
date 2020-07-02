<template>
  <div class="info">
    <div class="coverImg">
      <span class="icon-play">{{ playlist.playCount | ShowPlaycount}}</span>
      <img :src="playlist.coverImgUrl" alt />
    </div>
    <div class="playlistinfo">
      <p>{{ playlist.name }}</p>
      <div class="creator">
        <div class="avatar">
          <img :src="creator.avatarUrl" alt />
        </div>
        <span class="nickname">{{ creator.nickname }}</span>
        <span class="icon-chevron-right"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { playCountFilter } from "@/common/mixin";

export default {
  name: "playlistTop",
  data() {
    return {
      creator: {}
    };
  },
  mixins: [playCountFilter],
  props: {
    playlist: {
      type: Object,
      default: {}
    }
  },
  watch: {
    playlist(newValue, oldValue) {
      this.creator = newValue.creator;
    }
  }
};
</script>
<style scoped>
.info {
  display: flex;
  margin-bottom: 8vh;
}
.coverImg {
  position: relative;
  width: 28vw;
  height: 28vw;
  border-radius: 2vw;
  overflow: hidden;
  margin: 0 5vw;
}
.coverImg img {
  width: 100%;
  height: 100%;
}
.coverImg span {
  position: absolute;
  top: 0.8vh;
  right: 2vw;
  color: #fff;
  font-size: 3vw;
}
.playlistinfo {
  width: 50vw;
  color: #fff;
}
.playlistinfo p {
  margin: 0;
  line-height: 3vh;
}
.creator {
  display: flex;
  margin-top: 1.2vh;
}
.avatar {
  width: 6vw;
  height: 6vw;
  border-radius: 50%;
  overflow: hidden;
}
.avatar img {
  width: 100%;
  height: 100%;
}
.nickname {
  padding: 1vh 0 0 1.8vw;
  font-size: 3vw;
}
.icon-chevron-right {
  display: flex;
  align-items: center;
  padding-left: 1vw;
  color: rgb(216, 215, 215);
}
</style>