<template>
  <div class="listItem" @click="musicPlay" >
    <span class="active" v-show="$store.state.currentMusic.id === song.id">
      <img src="@/assets/img/active.svg" alt />
    </span>
    <p>{{ song.name }}</p>
    <p>-</p>
    <p>{{ song.ar[0].name }}</p>
    <span class="close" @click.stop="deleteItem">
      <img src="@/assets/img/close.svg" alt />
    </span>
  </div>
</template>

<script>
export default {
  name: "listItem",
  props: {
    song: {
      type: Object,
      default: {
        name,
        ar: [
          {
            name
          }
        ]
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  methods: {
    musicPlay() {
      this.$bus.$emit("musicPlay", this.song.id);
    },
    deleteItem() {
      this.$store.commit("deleteId", this.song.id);
      this.$emit("deleteItem",this.index);
    }
  }
};
</script>
<style scoped>
.listItem {
  position: relative;
  display: flex;
  align-items: center;
  height: 5vh;
  /* line-height: 5vh; */
  padding: 1vw 4vw;
}
.listItem p {
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.listItem p:nth-child(2) {
  padding: 0 1.5vw;
}
.listItem p:nth-child(1),
.listItem p:nth-child(3) {
  max-width: 30vw;
}
.listItem p:nth-child(3) {
  font-size: 3vw;
  color: rgb(128, 125, 125);
}
.close {
  position: absolute;
  right: 6vw;
  top: 2.5vw;
  width: 4vw;
  height: 4vw;
}
.close img,
.active img {
  width: 100%;
  height: 100%;
}
.active {
  width: 4vw;
  height: 4vw;
  margin: 0 1.5vw;
}
</style>