<template>
  <div class="playlistItem" @click="autoPlay">
    <div class="index">{{ index }}</div>
    <div class="content">
      <div class="textTop">{{ songsItem.name }}</div>
      <div class="textBottom">
        <span>{{ ar.name }}</span>
        <p>-</p>
        <span>{{ al.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "playlistItem",
  data() {
    return {
      al: {},
      ar: {}
    };
  },
  methods: {
    autoPlay() {
      // console.log(this.index);
      // console.log(this.songsItem);

      this.$emit("autoPlay", this.songsItem.id);
    }
  },
  props: {
    index: {
      type: Number,
      default: 0
    },
    songsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  watch: {
    index(newValue, oldValue) {
      this.index = newValue;
    },
    songsItem: {
      handler(newValue, oldValue) {
        this.al = newValue.al;
        this.ar = newValue.ar[0];
      },
      immediate: true,
      deep: true
    }
  }
};
</script>
<style scoped>
.playlistItem {
  display: flex;
  height: 5vh;
  margin: 2vh 0;
}
.textBottom {
  display: flex;
  height: 2vh;
  color: rgb(134, 134, 134);
  font-size: 3vw;
  margin-top: 0.8vh;
}
.textBottom span:nth-child(3) {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.index {
  line-height: 5vh;
  width: 3vw;
  color: rgb(134, 134, 134);
  padding: 0 5vw;
}
p {
  margin: 0 1vw;
}
.textTop {
  width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.content {
  width: 77vw;
}
</style>