<template>
  <div>
    <div class="title">{{ title }}</div>
    <div v-for="(item,index) in list" :key="index" class="listItem" @click="singerClick(item.id)">
      <div class="picUrl">
        <img :src="item.picUrl" alt />
      </div>
      <div class="itemName">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "singerItem",
  props: {
    title: {
      type: String,
      default: ""
    },
    list: {
      type: Array,
      default: []
    }
  },
  methods: {
    singerClick(id) {
      this.$emit("singerClick", id);
    }
  }
};
</script>
<style scoped>
.title {
  background-color: rgb(226, 224, 224);
  color: rgb(66, 66, 66);
  height: 4.2vh;
  line-height: 4.2vh;
  padding-left: 5vw;
}
.picUrl {
  width: 15vw;
  height: 15vw;
  border-radius: 50%;
  overflow: hidden;
}
.picUrl img {
  width: 100%;
  height: 100%;
}
.listItem {
  display: flex;
  align-items: center;
  margin: 3vw 4.5vw;
}
.itemName {
  margin-left: 6vw;
}
</style>