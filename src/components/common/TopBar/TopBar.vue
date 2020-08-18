<template>
  <div class="TopBar">
    <div class="left" @click="leftClick">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopBar",
  methods: {
    leftClick() {
      this.$bus.$emit("leftClick");
    }
  }
};
</script>
<style scoped>
.TopBar {
  display: flex;
  height: 5.5vh;
  width: 100vw;
  font-size: 5vw;
  text-align: center;
  color: #fff;
  line-height: 5.5vh;
  padding-bottom: 2vh;
  padding-top: 2vh;
}
.TopBar .left {
  width: 19vw;
  font-size: 7vw;
}
.TopBar .center {
  position: relative;
  flex: 1;
  padding: 0;
  width: 0;
}
.TopBar .right {
  width: 19vw;
  font-size: 9vw;
}
</style>