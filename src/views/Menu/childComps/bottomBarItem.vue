<template>
  <div class="bottomBarItem" @click="bottomItemClick">
    <div class="item-icon">
      <slot name="item-icon"></slot>
    </div>
    <div class="item-text">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    bottomItemClick() {
      this.$bus.$emit("bottomItemClick", this.operation);
    }
  },
  props: {
    operation: {
      type: String,
      default: ""
    }
  }
};
</script>
<style scoped>
.bottomBarItem {
  flex: 1;
  height: 3.5vh;
  margin-top: 1vh;
}
.item-icon,
.item-text {
  display: inline-block;
  vertical-align: middle;
}
.item-icon {
  width: 7.5vw;
}
</style>