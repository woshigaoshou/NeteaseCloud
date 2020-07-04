<template>
  <div class="RecommendItem" :class="{changeHeight:!isShowPlayCount}">
    <div class="playcount" v-if="isShowPlayCount">
      <span class="icon-play"></span>
      <span>{{RecommendItem.playcount | ShowPlaycount}}</span>
    </div>
    <div class="Img" @click="ResourcesItemClick">
      <img :src="RecommendItem.picUrl" alt />
    </div>
    <span class="recommendName">{{RecommendItem.name}}</span>
    <!-- <span class="recommendName" v-else>{{ RecommendItem.program.description }}</span> -->
  </div>
</template>

<script>
import { playCountFilter } from "@/common/mixin";

export default {
  name: "RecommendResourceItem",
  props: {
    RecommendItem: {
      type: Object,
      default() {
        return {};
      }
    },
    isShowPlayCount: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  mixins: [playCountFilter],
  methods: {
    ResourcesItemClick() {
      this.$emit("ResourcesItemClick", 0, this.RecommendItem.id);
    }
  }
};
</script>
<style scoped>
.RecommendItem {
  position: relative;
  width: 28vw;
  height: 24vh;
  margin: 1vh 2vw;
  overflow: hidden;
}

.Img {
  width: 28vw;
  height: 28vw;
}
img {
  width: 100%;
  height: 100%;
  border-radius: 1.5vw;
}
.playcount {
  position: absolute;
  top: 0.6vh;
  right: 1.4vw;
  color: #fff;
  height: 3vh;
  line-height: 3vh;
  font-size: 3.3vw;
}
.recommendName {
  position: absolute;
  width: 100%;
  /* height: 5vh; */
  font-size: 3.1vw;
  top: 30vw;
  overflow: hidden;
  text-overflow: ellipsis;
  display: box;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.icon-play {
  font-size: 3vw;
}
.changeHeight {
  height: 23vh;
}
</style>