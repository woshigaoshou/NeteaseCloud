<template>
  <div class="MenuItem" @click="itemClick">
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
  name: "MenuItem",
  props: {},
  methods: {
    itemClick() {
      this.$emit("itemClick");
    }
  }
};
</script>
<style scoped>
.MenuItem {
  font-size: 4vw;
  display: flex;
  vertical-align: middle;
  padding: 1.3vh 6vw;
  /* border-bottom: 1px solid #eee;
  border-top: 1px solid #eee; */
}
.item-text {
  padding-left: 3vw;
}
</style>