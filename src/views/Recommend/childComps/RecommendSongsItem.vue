<template>
  <div class="SongsItem">
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
export default {
  name: "RecommendSongsItem",
  props: {
    SongsItem: {
      type: Object,
      default() {
        return {};
      }
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
}
.song {
  margin-top: 0.5vh;
}
.reason {
  margin-top: -1vh;
  color: rgb(223, 49, 78);
  font-size: 3.1vw;
}
.song :nth-child(2),
.song :nth-child(3) {
  color: rgb(145, 143, 143);
  font-size: 3vw;
  margin-left: 1vw;
  vertical-align: top;
}
</style>