<template>
  <div id="app">
    <router-view></router-view>
    <tips></tips>
    <bottomAudio
      v-show="$store.state.currentMusic.isShow"
      :class="{isDetail: $route.path==='/musicDetail' || $route.path==='/login' || $route.path==='/register'}"
    ></bottomAudio>
    <List v-show="$store.state.isShowList"></List>
    <!-- <List></List> -->
    <div>test分支</div>
  </div>
</template>

<script>
import bottomAudio from "@/components/content/bottomAudio";
import tips from "@/components/content/tips";
import List from "@/components/content/List";

export default {
  name: "app",
  components: {
    bottomAudio,
    tips,
    List
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
.isDetail {
  opacity: 0;
  height: 0 !important;
}
/* .mvScroll .content {
  display: flex;
  flex-flow: nowrap !important;
  width: 400vw;
} */
</style>