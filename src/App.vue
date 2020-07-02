<template>
  <div id="app">
    <router-view></router-view>
    <div class="audio">
      <audio :src="$store.state.currentMusic" autoplay="autoplay">
        <source type="audio/mpeg" />
      </audio>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>
<style>
@import url("./assets/css/base.css");
@import url("./assets/icon/style.css");
.swiper-pagination-bullet-active {
  background: #fff !important;
}
.icon-arrow-left {
  padding: 2.4vh 0 0 2.4vh;
  font-size: 8vw;
  color: #fff;
}
.audio {
  position: fixed;
  bottom: 0;
  height: 8vh;
  width: 100%;
  z-index: 9999999;
  background-color: red;
}
/* .mvScroll .content {
  display: flex;
  flex-flow: nowrap !important;
  width: 400vw;
} */
</style>