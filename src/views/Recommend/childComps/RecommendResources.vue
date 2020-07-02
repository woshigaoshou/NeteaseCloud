<template>
  <div class="Recommend">
    <div class="text">
      <h3>{{text}}</h3>
    </div>
    <div class="item">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendResources",
  props: {
    text: {
      type: String,
      default() {
        return "";
      }
    }
  }
};
</script>
<style scoped>
.text {
  margin-top: 3vh;
  padding-left: 2.5vh;
  color: rgb(56, 58, 58);
}
.text h3 {
  margin-top: 4.3vh !important;
  margin-bottom: 2vh !important;
  font-size: 4.4vw;
}
.item {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: -2.3vh;
}
</style>