<template>
  <div class="Back">
    <div
      v-for="(item,index) in titles"
      :key="index"
      class="backItem"
      :class="{ active: currentIndex===index }"
      @click="backClick(index)"
    >{{ item }}</div>
  </div>
</template>

<script>
export default {
  name: "Back",
  props: {
    titles: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    backClick(index) {
      this.currentIndex = index;
      this.$bus.$emit("backClick", this.currentIndex);
    }
  },
  mounted() {
    this.$bus.$on("changeIndex", index => {
      this.currentIndex = index;
    });
  }
};
</script>
<style scoped>
.Back {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  right: 3vw;
  display: flex;
  flex-direction: column;
}
.backItem {
  margin: 1vh 0;
  padding: 1vw;
}
.active {
  color: rgba(207, 68, 58, 0.911);
}
</style>