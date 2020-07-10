<template>
  <div class="NavBar">
    <div
      class="NavBar-item"
      v-for="(item,index) in titles"
      :key="index"
      :class="{active: currentIndex === index} "
      @click="itemClick(index)"
    >
      <router-link :to="'/Home' + path[index]" class="title">{{item}}</router-link>
    </div>
    <!-- <slot></slot> -->
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    },
    path: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      // currentIndex: this.path.indexOf(this.$route.path.slice(5))
    };
  },
  computed: {
    currentIndex() {
      return this.path.indexOf(this.$route.path.slice(5)); //读取属性时默认值为该值
      // return this.currentIndex;
      // console.log(index);
    }
  },
  methods: {
    itemClick(index) {
      // this.currentIndex = index;
      // console.log(this.currentIndex);

      // this.$router.replace(this.path[index]);
      this.$emit("itemClick", this.path[index], index);
    }
  }
};
</script>
<style scoped>
.NavBar {
  height: 3vh;
  display: flex;
  text-align: center;
  font-size: 4.5vw;
  color: #fff;
  padding: 0 12vw;
  margin-bottom: 6.5vh;
  margin-top: 1vh;
}
.NavBar div {
  flex: 1;
}
.NavBar .title {
  width: 100%;
  height: 100%;
  padding-bottom: 1.2vh;
  color: #fff;
  text-decoration: none;
}
.active .title {
  font-weight: 700;
  border-bottom: 2px solid #fff;
}
.NavBar-item {
  margin: 0 3vw;
}
</style>