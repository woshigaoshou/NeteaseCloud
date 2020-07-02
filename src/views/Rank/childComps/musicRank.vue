<template>
  <div>
    <h3>{{ title }}</h3>
    <div class="content">
      <slot class="contentItem"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "musicRank",
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
</script>
<style scoped>
h3 {
  font-size: 4.5vw;
  padding-left: 3vw;
  margin: 4vw 0 3vw;
  color: rgba(0, 0, 0, 0.712);
}
.content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0 2vw;
}
</style>