<template>
  <div class="SongsItem" @click="musicPlay">
    <div class="itemImg">
      <img :src="SongsItem.blurPicUrl" alt />
    </div>
    <div class="text">
      <div class="song">
        <span>{{SongsItem.name}}</span>
        <span>-</span>
        <span>{{SongsItem.artist}}</span>
      </div>
      <div class="reason">{{SongsItem.reason}}</div>
    </div>
  </div>
</template>

<script>
import { checkMusic } from "@/network/home";

export default {
  name: "RecommendSongsItem",
  props: {
    SongsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    musicPlay() {
      checkMusic(this.SongsItem.id).then(res => {
        if (res.success === true) {
          this.$bus.$emit("musicPlay", this.SongsItem.id);
        } else {
          this.$emit("noCopyright");
        }
      });
    }
  }
};
</script>
<style scoped>
.SongsItem {
  width: 100vw;
  height: 9vh;
  margin: 1vh 3vw;
  padding-left: 3vw;
  display: flex;
}
.itemImg {
  width: 9vh;
  height: 100%;
  border-radius: 2vw;
  overflow: hidden;
  margin-right: 4vw;
}
.itemImg img {
  width: 100%;
  height: 100%;
}
.text {
  height: 10vh;
  line-height: 5vh;
}
.song,
.reason {
  height: 50%;
  width: 67vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.song {
  margin-top: 0.5vh;
  width: 67vw;
}
.reason {
  margin-top: -1vh;
  color: rgb(223, 49, 78);
  font-size: 3.1vw;
}
.song span:nth-child(2),
.song span:nth-child(3) {
  color: rgb(145, 143, 143);
  font-size: 3vw;
  margin-left: 1vw;
  vertical-align: top;
}
</style>