<template>
  <div class="info">
    <div class="artInfo">{{ artist.name}}</div>
  </div>
</template>

<script>
export default {
  name: "SingerInfo",
  props: {
    artist: {
      type: Object,
      default: {
        briefDesc: ""
      }
    }
  }
};
</script>
<style scoped>
.info {
  position: relative;
  height: 28vh;
  color: #fff;
}
.artInfo {
  position: absolute;
  left: 5vw;
  bottom: 3vh;
  width: 30vw;
  font-size: 4vw;
}
</style>