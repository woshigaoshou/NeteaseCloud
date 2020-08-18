<template>
  <div>
    <h4 class="title">{{title}}</h4>
    <div v-for="(item,index) in hotRank" :key="index" class="item" @click="hotRankClick(item)">
      <span :class="{'index':index<3}">{{index+1}}</span>
      <div>
        <h4>{{item.searchWord}}</h4>
        <p>{{item.content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hotRank",
  props: {
    title: {
      type: String,
      default: ""
    },
    hotRank: {
      type: Array,
      default: []
    }
  },
  methods: {
    hotRankClick(item) {
      this.$emit("hotRankClick", item.searchWord);
    }
  }
};
</script>
<style scoped>
.title {
  padding-left: 4vw;
}
.item {
  display: flex;
  margin: 1.5vh 0;
}

.item span {
  padding: 2vh 6vw;
}
p,
h4 {
  margin: 0;
}
p {
  padding: 1.5vw 0;
  font-size: 3vw;
  color: rgb(158, 157, 157);
}
.index {
  color: rgba(207, 68, 58, 0.911);
}
</style>