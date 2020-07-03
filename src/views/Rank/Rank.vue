<template>
  <div class="rank">
    <h3>官方榜</h3>
    <ChinaRankItem
      v-for="(item,index) in chinaRank"
      :key="index"
      :Rank="item"
      @rankClick="rankClick"
    ></ChinaRankItem>
    <musicRank title="推荐榜">
      <musicRankItem
        v-for="(item,index) in recommendRank"
        :key="index"
        :Rank="item"
        @rankClick="rankClick"
      ></musicRankItem>
    </musicRank>
    <musicRank title="更多榜单">
      <musicRankItem
        v-for="(item,index) in regionRank"
        :key="index"
        :Rank="item"
        @rankClick="rankClick"
      ></musicRankItem>
    </musicRank>
  </div>
</template>

<script>
import { getRankData, getRankDetail } from "@/network/rank";
import { ResourcesItemClickMixin } from "@/common/mixin";

import ChinaRankItem from "./childComps/ChinaRankItem";
import musicRank from "./childComps/musicRank";
import musicRankItem from "./childComps/musicRankItem";

export default {
  name: "Rank",
  components: {
    ChinaRankItem,
    musicRank,
    musicRankItem
  },
  data() {
    return {
      chinaRank: [],
      regionRank: [],
      recommendRank: []
    };
  },
  mixins: [ResourcesItemClickMixin],
  methods: {
    getRankData() {
      getRankData().then(res => {
        // console.log(res);
        res.list.forEach((item, index) => {
          if (index <= 3) {
            this.chinaRank.push(item);
          } else if (index <= 7 && index >= 5) {
            this.recommendRank.push(item);
          } else {
            this.regionRank.push(item);
          }
        });
        let supply = 3 - (this.regionRank.length % 3);
        if (supply !== 0) {
          for (let i = 1; i <= supply; i++) {
            this.regionRank.push({});
          }
        }
      });
    },
    getRankDetail(id) {
      getRankDetail(id)
        .then(res => {
          console.log(res);
          return id;
        })
        .then(res => {
          // console.log(res);
          this.ResourcesItemClick(0, res);
        });
    },
    rankClick(id) {
      this.getRankDetail(id);
    }
  },
  created() {
    if (this.$store.state.userId) {
      this.getRankData();
    }
  }
};
</script>
<style scoped>
.rank h3 {
  font-size: 4.5vw;
  padding-top: 5vw;
  padding-left: 3vw;
  margin: 0 0 3vw;
  color: rgba(0, 0, 0, 0.712);
}
</style>