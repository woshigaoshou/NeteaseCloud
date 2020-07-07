<template>
  <div class="mvItem" @click.stop="mvClick">
    <div class="pic">
      <span class="icon-play">{{ MvItem.playCount | ShowPlaycount }}</span>
      <img :src="MvItem.picUrl" />
      <!-- <video :src="mvUrl" class="vdo" controls="controls"></video> -->
    </div>
    <div class="text">{{ MvItem.copywriter }}</div>
    <span class="art">{{ MvItem.name }} —— {{ MvItem.artistName }}</span>
  </div>
</template>

<script>
import { playCountFilter } from "@/common/mixin.js";

export default {
  name: "RecommendMVItem",
  data() {
    return {
      flag: true
    };
  },
  props: {
    MvItem: {
      type: Object,
      default() {
        return {};
      }
    },
    mvUrl: {
      type: String,
      default: ""
    }
  },
  mixins: [playCountFilter],
  methods: {
    mvClick() {
      if (this.flag) {
        this.flag = false;
        this.$emit("mvClick", this.MvItem.id);
        let timer = setTimeout(() => {
          this.flag = true;
          clearTimeout(timer);
        }, 1000);
      }
    }
  }
};
</script>
<style scoped>
.mvItem {
  width: 95vw;
  margin-bottom: 1vh;
  flex: 1;
}
.pic {
  position: relative;
  width: 95vw;
  border-radius: 3vw;
  overflow: hidden;
  margin: 0 auto;
  /* display: flex;
  justify-content: center; */

  /* margin: 6px auto 4px !important; */
  margin: 1vh auto !important;
}
.pic img {
  width: 100%;
  height: 100%;
  /* flex: 1; */
}
.vdo {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
}
.text,
.art {
  margin: 1vh 3vw !important;
  /* padding-top: 8px !important; */
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.art {
  color: rgb(122, 121, 121);
  font-size: 3.2vw;
}
.pic .icon-play {
  color: #fff;
  position: absolute;
  right: 4vw;
  top: 1.5vh;
}
</style>