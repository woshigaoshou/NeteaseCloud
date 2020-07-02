<template>
  <div class="item">
    <div class="coverImg">
      <img :src="Rank.coverImgUrl" />
      <p class="updateFrequency">{{ Rank.updateFrequency }}</p>
    </div>
    <p class="rankName">{{ Rank.name }}</p>
  </div>
</template>

<script>
export default {
  name: "musicRankItem",
  props: {
    Rank: {
      type: Object,
      default: {}
    }
  }
};
</script>
<style scoped>
.item {
  flex: 1;
  margin: 2vw 0;
}
.coverImg {
  position: relative;
  width: 28vw;
  height: 28vw;
  margin: 0 auto;
  border-radius: 1vw;
  overflow: hidden;
  border: none !important;
}
.coverImg img {
  width: 100%;
  height: 100%;
  border: none !important;
}
img[src=""],
img:not([src]) {
  opacity: 0;
  border: none;
  visibility: hidden;
  max-width: none;
}
.rankName {
  font-size: 3vw;
  margin: 1.5vw 0;
  padding-left: 3.5vw;
  padding-right: 2vw;
}
.updateFrequency {
  position: absolute;
  bottom: 1.5vw;
  left: 1.5vw;
  margin: 0;
  color: #fff;
  font-size: 3vw;
}
</style>