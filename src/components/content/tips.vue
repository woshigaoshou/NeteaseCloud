<template>
  <div class="tips" v-show="$store.state.tipsShow">暂无权限播放哦~</div>
</template>

<script>
export default {};
</script>
<style scoped>
.tips {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40vw;
  height: 10vh;
  line-height: 10vh;
  text-align: center;
  border-radius: 3vw;
  background-color: rgba(241, 237, 237, 0.8);
  margin: 0;
  z-index: 999999;
  animation-name: show;
  animation-duration: 2.5s;
}
@keyframes show {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>