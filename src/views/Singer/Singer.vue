<template>
  <div class="singer">
    <singerItem :list="hotSinger" title="热门" ref="hotSinger" @singerClick="singerClick"></singerItem>
    <singerItem :list="C_Singers" title="华语" ref="C_Singers" @singerClick="singerClick"></singerItem>
    <singerItem :list="EA_Singers" title="欧美" ref="EA_Singers" @singerClick="singerClick"></singerItem>
    <singerItem :list="SK_Singers" title="韩国" ref="SK_Singers" @singerClick="singerClick"></singerItem>
    <singerItem :list="JP_Singers" title="日本" ref="JP_Singers" @singerClick="singerClick"></singerItem>
  </div>
</template>

<script>
import singerItem from "./childComps/singerItem";

import { gethotSinger, getRegionSinger } from "@/network/singer";

import { ResourcesItemClickMixin } from "@/common/mixin";

export default {
  name: "Singer",
  components: {
    singerItem
  },
  data() {
    return {
      hotSinger: [],
      C_Singers: [],
      EA_Singers: [],
      SK_Singers: [],
      JP_Singers: [],
      getThemeTopYs: [],
      currentIndex: 0,
      changeIndex: 0
    };
  },
  mixins: [ResourcesItemClickMixin],
  methods: {
    gethotSinger(offset, limit) {
      gethotSinger(offset, limit).then(res => {
        // console.log(res);
        this.hotSinger = res.artists;
        // console.log(this.hotSinger);
      });
    },
    getRegionSinger() {
      this.$axios
        .all([
          getRegionSinger(1),
          getRegionSinger(2),
          getRegionSinger(3),
          getRegionSinger(4)
        ])
        .then(
          this.$axios.spread(
            (C_Singers, EA_Singers, SK_Singers, JP_Singers) => {
              this.C_Singers = C_Singers.list.artists.slice(0, 20);
              this.EA_Singers = EA_Singers.list.artists.slice(0, 20);
              this.SK_Singers = SK_Singers.list.artists.slice(0, 20);
              this.JP_Singers = JP_Singers.list.artists.slice(0, 20);
              // console.log(this.C_Singers);
              // console.log(this.EA_Singers);
              // console.log(this.SK_Singers);
              // console.log(this.JP_Singers);
            }
          )
        );
    },

    //事件方法
    singerClick(id) {
      this.$router.push({ path: "/singerPlaylist", query: { id } });
    }
  },
  created() {
    if (this.$store.state.userId) {
      this.gethotSinger(0, 20);
      this.getRegionSinger();
    }
  },
  mounted() {
    this.$nextTick(() => {
      // let timer = setTimeout(() => {
      this.getThemeTopYs = [];
      this.getThemeTopYs[0] = 0;
      this.getThemeTopYs.push(this.$refs.C_Singers.$el.offsetTop);
      this.getThemeTopYs.push(this.$refs.EA_Singers.$el.offsetTop);
      this.getThemeTopYs.push(this.$refs.SK_Singers.$el.offsetTop);
      this.getThemeTopYs.push(this.$refs.JP_Singers.$el.offsetTop);
      // console.log(this.$refs.C_Singers.$el.offsetTop);
      // console.log(this.$refs.EA_Singers.$el.offsetTop);
      // console.log(this.$refs.SK_Singers.$el.offsetTop);
      // console.log(this.$refs.JP_Singers.$el.offsetTop);
      this.$store.commit("setThemeTopYs", this.getThemeTopYs);
      // clearTimeout(timer);
      // }, 1000);
    });

    this.$nextTick(() => {
      this.$bus.$on("scroll", position => {
        // console.log(-position.y);
        // console.log(this.getThemeTopYs);
        // console.log(this.$refs.C_Singers);

        if (
          this.$refs.C_Singers &&
          this.$refs.C_Singers.$el.offsetTop !== this.getThemeTopYs[1]
        ) {
          this.getThemeTopYs = [];
          this.getThemeTopYs[0] = 0;
          this.getThemeTopYs.push(this.$refs.C_Singers.$el.offsetTop);
          this.getThemeTopYs.push(this.$refs.EA_Singers.$el.offsetTop);
          this.getThemeTopYs.push(this.$refs.SK_Singers.$el.offsetTop);
          this.getThemeTopYs.push(this.$refs.JP_Singers.$el.offsetTop);
          this.$store.commit("setThemeTopYs", this.getThemeTopYs);
        }

        let scrollY = -position.y;
        if (scrollY < this.getThemeTopYs[1]) {
          this.changeIndex = 0;
        } else if (scrollY < this.getThemeTopYs[2]) {
          this.changeIndex = 1;
        } else if (scrollY < this.getThemeTopYs[3]) {
          this.changeIndex = 2;
        } else if (scrollY < this.getThemeTopYs[4]) {
          this.changeIndex = 3;
        } else {
          this.changeIndex = 4;
        }
        if (this.currentIndex !== this.changeIndex) {
          // console.log(this.changeIndex);
          this.currentIndex = this.changeIndex;
          this.$bus.$emit("changeIndex", this.currentIndex);
        }
      });
    });
  }
};
</script>
<style scoped>
</style>