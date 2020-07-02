<template>
  <div class="ProfileMusic">
    <div class="title">
      <div
        v-for="(item,index) in ResourcesName"
        :key="index"
        class="titleItem"
        :class="{active: currentIndex === index}"
        @click="resourcesClick(index)"
      >{{ item }}</div>
      <div class="btn">
        <span class="icon-plus"></span>
        <span class="icon-list"></span>
      </div>
    </div>
    <div class="resourcesItem">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileMusic",
  props: {
    ResourcesName: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    resourcesClick(index) {
      this.currentIndex = index;
      this.$emit("resourcesClick", index);
    }
  }
};
</script>
<style scoped>
.ProfileMusic {
  background-color: rgba(0, 0, 0, 0.03);
}
.title {
  position: relative;
  display: flex;
  background-color: #fff;
  height: 3vh;
  line-height: 3vh;
  margin: 0 1vw;
  padding: 2vh 0 2vh 4vw;
  border-radius: 3vw;
}
.title .btn {
  position: absolute;
  right: 4vw;
}
.titleItem {
  margin: 0 1.8vw;
}
.btn span {
  margin: 0 2.2vw;
  color: rgb(114, 110, 110);
}
.btn span:nth-child(1) {
  font-size: 2.5vw;
  padding: 0.8vw;
  border-radius: 2vw;
  border: 0.5px solid rgb(102, 98, 98);
  vertical-align: middle;
}
.btn span:nth-child(2) {
  font-size: 4.1vw;
  vertical-align: middle;
}
.active {
  font-weight: 700;
  font-size: 4.13vw;
  margin-top: -0.1vh;
}
.resourcesItem {
  background-color: #fff !important;
  margin: 2vh 1vw 0;
  border-radius: 2vw;
  padding: 2vw;
}
</style>