<template>
  <div class="ProfileResources">
    <div class="userInfo">
      <div class="avatarUrl">
        <img :src="$store.state.avatarUrl" alt />
      </div>
      <span class="nickName">{{ $store.state.nickName }}</span>
    </div>
    <div class="Resources">
      <div
        class="ResourcesItem"
        v-for="(item,index) in ProfileResources"
        :key="index"
        @click="ResourcesItemClick(index)"
      >
        <div :class="item.className" class="icon"></div>
        <div class="itemName">{{ item.name }}</div>
        <div class="count">{{ item.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileResources",
  data() {
    return {
      ProfileResources: [
        {
          name: "喜欢",
          className: "icon-heart-o",
          // count: this.playlist[0].trackCount
          count: 0,
          id: ""
        },
        {
          name: "最近",
          className: "icon-clock1",
          count: 0
          // count: this.weekData.length
        },
        {
          name: "本地歌曲",
          className: "icon-arrow-circle-down",
          count: 0
        },
        {
          name: "已购",
          className: "icon-check-square",
          count: 0
          // count: this.paidAlbums.length
        }
      ]
    };
  },
  props: {
    playlist: {
      type: Array,
      default() {
        return [];
      }
    },
    allData: {
      type: Array,
      default() {
        return [];
      }
    },
    paidAlbums: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    ResourcesItemClick(index) {
      if (index === 0) {
        this.$emit("ResourcesItemClick", index, this.ProfileResources[0].id);
      } else if (index === 1) {
        this.$emit("ResourcesItemClick", index, this.$store.state.userId);
      }
    }
  },
  watch: {
    playlist(newValue, oldValue) {
      this.ProfileResources[0].count = newValue[0].trackCount;
      this.ProfileResources[0].id = newValue[0].id;
      // console.log(newValue[0].id);
    },
    allData(newValue, oldValue) {
      this.ProfileResources[1].count = newValue.length;
      // console.log(newValue);
    },
    paidAlbums(newValue, oldValue) {
      this.ProfileResources[3].count = newValue.length;
    }
  }
};
</script>
<style scoped>
.ProfileResources {
  padding-top: 2vh;
  background-color: rgba(0, 0, 0, 0.03);
}
.Resources {
  display: flex;
  text-align: center;
  padding: 2vh 8vw 0;
  font-size: 3.6vw;
  padding-bottom: 3vh;
}
.ResourcesItem {
  flex: 1;
}
.icon {
  color: red;
  font-size: 4.5vw;
  margin: 1vh;
}
.userInfo {
  display: flex;
  align-items: center;
  /* margin-top: 2vh; */
  padding: 2vh 0 2vh 7vw;
  margin: 0 1vw;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.007);
  border-radius: 3vw;
}
.itemName {
  height: 4vw;
  line-height: 4vw;
}
.avatarUrl {
  width: 11vw;
  height: 11vw;
  border-radius: 50%;
  overflow: hidden;
}
.avatarUrl img {
  width: 100%;
  height: 100%;
}
.nickName {
  padding-left: 3vw;
}
.count {
  margin-top: 1vh;
  font-size: 2vw;
}
</style>