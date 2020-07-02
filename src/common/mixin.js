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
      history.back(1);
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
    }
  }
}