<template>
  <div class="bottomBar" :class="{'isPlay_bottomBar': $store.state.currentMusic.isShow}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "bottomBar"
};
</script>
<style scoped>
.bottomBar {
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 1.4vh 2vw;
  text-align: center;
  border-top: 1px solid #eee;
  box-sizing: border-box;
  z-index: 9999;
  background-color: #fff;
}
/* .isPlay_bottomBar {
  bottom: 8vh;
} */
</style>