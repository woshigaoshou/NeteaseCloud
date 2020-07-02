<template>
  <div class="musicItem" @click="ResourcesItemClick">
    <div class="musicItemImg">
      <img :src="showResourcesItem.coverImgUrl" />
    </div>
    <div class="content">
      <div>{{ showResourcesItem.name }}</div>
      <div>{{ showResourcesItem.trackCount + "首，0首已下载"}}</div>
    </div>
    <span class="icon icon-chevron-right"></span>
  </div>
</template>

<script>
export default {
  name: "ProfileMusicItem",
  props: {
    showResourcesItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    //处理传入数组 watch监听
    return {};
  },
  methods: {
    ResourcesItemClick() {
      this.$emit("ResourcesItemClick", 0, this.showResourcesItem.id);
    }
  },
  watch: {}
};
</script>
<style scoped>
.musicItem {
  position: relative;
  display: flex;
  margin: 2vh 0;
  height: 17vw;
}
.musicItemImg {
  width: 17vw;
  height: 17vw;
  border-radius: 2vw;
  overflow: hidden;
}
.musicItemImg img {
  width: 100%;
  height: 100%;
}
.content {
  /* display: flex; */
  height: 17vw;
  margin-left: 3vw;
  text-align: left;
}
.content :nth-child(1),
.content :nth-child(2) {
  height: 50%;
  line-height: 6.5vw;
  box-sizing: border-box;
}
.content :nth-child(1) {
  font-size: 3.5vw;
  padding-top: 2vw;
}
.content :nth-child(2) {
  font-size: 2vw;
  padding-bottom: 2vw;
  color: rgb(114, 110, 110);
}
.icon {
  position: absolute;
  right: 3vw;
  height: 17vw;
  display: flex;
  align-items: center;
  color: rgb(117, 114, 114);
}
</style>