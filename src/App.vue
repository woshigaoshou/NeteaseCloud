<template>
  <div id="app">
    <router-view></router-view>
    <tips></tips>
    <bottomAudio v-show="$store.state.currentMusic.isShow"></bottomAudio>
  </div>
</template>

<script>
import bottomAudio from "@/components/content/bottomAudio";
import tips from "@/components/content/tips";

export default {
  name: "app",
  components: {
    bottomAudio,
    tips
  }
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
/* .mvScroll .content {
  display: flex;
  flex-flow: nowrap !important;
  width: 400vw;
} */
</style>