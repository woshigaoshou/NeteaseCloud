import { getIdentify, login, checkIdentify } from "@/network/user";

export const identifyMixin = {
  data() {
    return {
      isDisabled: false,
      content: "获取验证码"
    }
  },
  methods: {
    getIdentify() {
      // console.log("getIdentify");
      if (this.form.userID === "") {
        alert("请输入手机号码！");
      } else {
        getIdentify(this.form.userID);
        this.isDisabled = true;
        this.countDown();
        // console.log(this.isDisabled);
      }
    },
    countDown() {
      const time = 60;
      let time_count = time;
      let timer = setInterval(() => {
        if (time_count !== 0) {
          this.content = time_count + "s后重新获取";
          time_count--;
          // console.log(time_count);
        } else {
          this.content = "获取验证码";
          this.isDisabled = false;
          clearInterval(timer);
        }
      }, 1000);
    }
  }
}

export const returnHistoryMixin = {
  methods: {
    returnHistory() {
      history.go(-this.$store.state.currentPlaylist.count);
      this.$store.commit("changeCount", 1);
    }
  }
}

export const playCountFilter = {
  filters: {
    ShowPlaycount(playcount) {
      const unit = ["", "万", "亿"];
      let result = "";
      let count = 0;
      let tmp = playcount;
      // console.log(playcount);

      while (tmp > 1) {
        tmp /= 10;
        count++;
        // console.log(tmp);
      }
      if (count <= 4) {
        result = unit[0];
      } else if (count <= 8) {
        result = unit[1];
        playcount /= 10000;
      } else {
        result = unit[2];
        playcount /= 100000000;
      }
      // console.log(count);
      if (count <= 4) {
        return playcount + result;
      }
      return playcount.toFixed(2) + result;
    }
  }
}

export const backColorMixin = {
  data() {
    return {
      transparency: 0,
    }
  },
  computed: {
    backColor() {
      return "rgba(255, 255, 255 , " + this.transparency + ")";
      // return "#fff";
    }
  },
}

export const ResourcesItemClickMixin = {
  methods: {
    ResourcesItemClick(index, id) {
      // console.log(id);
      // this.$router.push("/playlistDetail/" + id);
      if (index === 0) {
        this.$router.push({ path: "/playlistDetail", query: { id } });
      }
      else if (index === 1) {
        this.$router.push({ path: "/recentPlay", query: { id } });
      }
    }
  }
}

export const musicPlayMixin = {
  methods: {
    musicPlay(id) {
      this.$bus.$emit("musicPlay", id);
    },
    noCopyright() {
      this.$bus.$emit("noCopyright");
    }
  }
}

export const unablePlayMixin = {
  data() {
    return {
      showFlag: true
    }
  },
  methods: {
    unablePlay() {
      if (this.showFlag) {
        this.showFlag = false;
        this.$store.commit("changeTipsShow");
        let timer = setTimeout(() => {
          this.$store.commit("changeTipsShow");
          this.showFlag = true;
          clearTimeout(timer);
        }, 2000);
      }
    }
  }
}

export const playAllMixin = {
  methods: {
    playAll() {
      this.savePlaylist_ids();
      this.$bus.$emit('playAll');
    },
    savePlaylist_ids() {
      let musicId = [];
      // console.log(this.songs);
      this.songs.forEach(item => {
        musicId.push(item.id);
      })
      sessionStorage.setItem("playlist_ids", JSON.stringify(musicId));
      this.$store.commit('changeIds');
      this.$bus.$emit('updateList');
    }
  }
}

export const musicPlayMethodsMixin = {
  data() {
    return {
      flag: false,
      currentValue: 0
    }
  },
  methods: {
    changePlay() {
      let this_audio = this.$store.state.this_audio;   //musicDetail的this.$refs取不到audio标签，所以取bottomAudio组件的this

      this.$store.commit("changePlay");
      let audio = this_audio.$refs.audio;
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    },
    updateProgress() {
      let this_audio = this.$store.state.this_audio;   //musicDetail的this.$refs取不到audio标签，所以取bottomAudio组件的this
      let this_musicDetail;
      if (this.$store.state.this_musicDetail) {
        this_musicDetail = this.$store.state.this_musicDetail;
      }
      let audio = this_audio.$refs.audio;
      // console.log(audio);

      // console.log(this.$refs.audio.currentTime);
      // console.log(this.$refs.audio.duration);
      // console.log(audio.currentTime);

      if (!this.flag && (!this_musicDetail || !this_musicDetail.flag)) {

        this_audio.currentValue = audio.currentTime / audio.duration;
        if (this.$store.state.this_musicDetail) {
          this.$store.state.this_musicDetail.currentValue = audio.currentTime / audio.duration;
        }
      }
    },
    async endPlay() {
      console.log('调用了endPlay');

      let this_audio = this.$store.state.this_audio;
      let this_musicDetail;
      if (this.$store.state.this_musicDetail) {
        this_musicDetail = this.$store.state.this_musicDetail;
        this_musicDetail.currentValue = 0;
      }


      this.currentValue = 0;
      this.$store.state.currentMusic.isPlay = false;    //需要优化
      // this.$store.commit('changePlay')

      let type = this.$store.state.currentPlaylist.type;
      let index = this.$store.state.currentPlaylist.index;
      let ids = this.$store.state.currentPlaylist.ids;
      if (type === 0) {
        if (index >= ids.length - 1) {
          this.$store.commit("changeContinuePlay", false);
          await this.$store.dispatch("changeMusic", { id: ids[0], that: this_musicDetail });
          this.nextPlay(ids, 0, this_musicDetail);
        }
        else {
          this.$store.commit("changeContinuePlay", false);
          await this.$store.dispatch("changeMusic", { id: ids[index + 1], that: this_musicDetail });
          this.nextPlay(ids, index + 1, this_musicDetail);
        }
      }
      else if (type === 1) {
        this_audio.$store.commit('clearUrl');
        this.$bus.$emit("musicPlay", ids[index]);
      }
      else if (type === 2) {
        let index = parseInt(Math.random() * 10000 % ids.length);
        this.$store.commit("changeContinuePlay", false);
        await this.$store.dispatch("changeMusic", { id: ids[index], that: this_musicDetail });
        this.nextPlay(ids, index, this_musicDetail);
      }
    },
    nextPlay(ids, next_index, this_musicDetail) {
      console.log(this.$store.state.currentPlaylist.continuePlay);

      if (this.$store.state.currentPlaylist.continuePlay && this.$route.path === '/musicDetail') {
        let id = ids[next_index];
        this_musicDetail.$router.push({ path: "/musicDetail", query: { id } });
        this_musicDetail.getSongDetail(id);
        this.$store.commit("changeCount");
      }
    },
  },
  computed: {
    currentProgress() {
      return (this.currentValue * 100) + "%";
    },
    dotCurrentProgress() {
      return (this.currentValue * 100 - 1.5) + "%";    //比实际小2% 这样不会直接溢出进度条
    }
  }
}

export const singerClickMixin = {
  methods: {
    singerClick(id) {
      this.$router.push({ path: "/singerPlaylist", query: { id } });
    }
  }
}

export const playTimeFilter = {
  filters: {
    showPlayTime(time = 0) {
      let minute = parseInt(time / 60);
      let second = parseInt(time % 60);
      if (minute < 10) minute = '0' + minute;
      if (second < 10) second = '0' + second;
      return minute + ':' + second;
    }
  }
}

export const routerSelectMixin = {
  methods: {
    routerSelect(keywords) {
      let routeObj = {
        path: "/search",
        query: { keywords }
      }
      if (typeof this.$route.query.keywords === 'undefined') {
        this.$router.push(routeObj);
      } else {
        this.$router.replace(routeObj);
      }
    }
  }
}

/* export const testF = {
  beforeCreate() {
    console.log('父组件beforeCreate');
  },
  created() {
    console.log('父组件Create');
  },
  beforeMount() {
    console.log('父组件beforeMount');
  },
  mounted() {
    console.log('父组件Mounted');

  },
  beforeUpdate() {
    console.log('父组件beforeUpdate');
  },
  updated() {
    console.log('父组件updated');
  },
  beforeDestroy() {
    console.log('父组件beforeDestroy');
  },
  destroyed() {
    console.log('父组件destroyed');
  }
}

export const testC = {
  beforeCreate() {
    console.log('子组件beforeCreate');
  },
  created() {
    console.log('子组件Create');
  },
  beforeMount() {
    console.log('子组件beforeMount');
  },
  mounted() {
    console.log('子组件Mounted');

  },
  beforeUpdate() {
    console.log('子组件beforeUpdate');
  },
  updated() {
    console.log('子组件updated');

  },
  beforeDestroy() {
    console.log('子组件beforeDestroy');
  },
  destroyed() {
    console.log('子组件destroyed');
  }
} */