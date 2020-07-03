<template>
  <div class="Profile">
    <ProfileResources
      :playlist="playlist"
      :allData="allData"
      :paidAlbums="paidAlbums"
      @ResourcesItemClick="ResourcesItemClick"
    ></ProfileResources>
    <ProfileMusic :ResourcesName="ResourcesName" @resourcesClick="resourcesClick">
      <ProfileMusicItem
        v-for="(item,index) in showResources"
        :key="index"
        :showResourcesItem="item"
        @ResourcesItemClick="ResourcesItemClick"
      ></ProfileMusicItem>
    </ProfileMusic>
  </div>
</template>

<script>
import ProfileResources from "./childComps/ProfileResources";
import ProfileMusic from "./childComps/ProfileMusic";
import ProfileMusicItem from "./childComps/ProfileMusicItem";
import { ResourcesItemClickMixin } from "@/common/mixin";

import {
  getPlaylist,
  getPersonal_fm,
  getRecord,
  getDigitalAlbum
} from "@/network/profile";

export default {
  name: "Profile",
  components: {
    ProfileResources,
    ProfileMusic,
    ProfileMusicItem
  },
  data() {
    return {
      playlist: [],
      allData: [],
      paidAlbums: [],
      ResourcesName: ["自建歌单", "收藏歌单"],
      showResources: []
    };
  },
  mixins: [ResourcesItemClickMixin],
  methods: {
    //网络请求封装
    getPlaylist() {
      getPlaylist(this.$store.state.userId).then(res => {
        // console.log(res);
        this.playlist = res.playlist;
        // console.log(this.playlist);
        this.resourcesClick(0);
      });
    },
    getPersonal_fm() {
      getPersonal_fm(this.$store.state.cookie).then(res => {
        // console.log(res);
      });
    },
    getRecord() {
      getRecord(this.$store.state.userId, 0).then(res => {
        console.log(res);
        this.allData = res.allData;
        // console.log(this.weekData);
      });
    },
    getDigitalAlbum() {
      getDigitalAlbum(this.$store.state.cookie, 10).then(res => {
        // console.log(res);
        this.paidAlbums = res.paidAlbums;
        // console.log(this.paidAlbums);
      });
    },

    //事件方法
    resourcesClick(currentIndex) {
      this.showResources = [];
      if (currentIndex === 0) {
        this.playlist.forEach((item, index) => {
          if (index !== 0 && item.userId == this.$store.state.userId) {
            this.showResources.push(item);
          }
        });
      } else {
        this.playlist.forEach((item, index) => {
          if (item.userId != this.$store.state.userId) {
            this.showResources.push(item);
          }
        });
      }
    }
  },
  created() {
    //网络请求调用
    if (this.$store.state.userId) {
      this.getPlaylist();
      this.getPersonal_fm();
      this.getRecord();
      this.getDigitalAlbum();
    }

    //事件方法调用
  }
};
</script>
<style scoped>
</style>