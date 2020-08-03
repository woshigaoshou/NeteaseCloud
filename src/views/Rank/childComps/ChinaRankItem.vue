<template>
  <div class="chinaRankItem" @click="rankClick">
    <div class="coverImg">
      <img :src="Rank.coverImgUrl" />
      <p class="frequency">{{ Rank.updateFrequency }}</p>
    </div>
    <div class="content">
      <p
        class="ranktext"
        v-for="(item,index) in Rank.tracks"
        :key="index"
      >{{ item | showRank(index)}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChinaRankItem",
  props: {
    Rank: {
      type: Object,
      default: {}
    }
  },
  filters: {
    showRank(item, index) {
      index++;
      return index + ". " + item.first + " - " + item.second;
    }
  },
  created() {
    this.$nextTick(() => {
      // console.log(this.Rank);
    });
  },
  methods: {
    rankClick() {
      this.$emit("rankClick", this.Rank.id);
    }
  }
};
</script>
<style scoped>
.chinaRankItem {
  display: flex;
  padding: 2vw 2.5vw;
}
.coverImg {
  position: relative;
  width: 22vw;
  height: 22vw;
  border-radius: 3vw;
  overflow: hidden;
}
.coverImg img {
  width: 100%;
  height: 100%;
}
.coverImg p {
  position: absolute;
  bottom: 1.2vw;
  left: 1.5vw;
  white-space: nowrap;
  color: #fff;
  font-size: 3vw;
}
.frequency {
  margin: 0 !important;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 70vw;
  margin-left: 3vw;
  font-size: 3.2vw;
}
.ranktext {
  margin: 0 !important;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>