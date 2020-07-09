<template>
  <div>
    <div class="menu" :class="{showMenu:isShow}">
      <Scroll class="scroll" :probeType="2" ref="scroll" >
        <UserMessage></UserMessage>
        <MenuItem v-for="(item,index) in MenuItem" :key="index" class="menuItem">
          <div slot="item-icon" :class="item.MenuIcon"></div>
          <div slot="item-text">{{item.MenuText}}</div>
        </MenuItem>
      </Scroll>
      <bottomBar>
        <bottomBarItem>
          <span slot="item-icon" class="icon-contrast"></span>
          <div slot="item-text">夜间模式</div>
        </bottomBarItem>
        <bottomBarItem>
          <div slot="item-icon" class="icon-cog"></div>
          <div slot="item-text">设置</div>
        </bottomBarItem>
        <bottomBarItem operation="logout">
          <div slot="item-icon" class="icon-switch"></div>
          <div slot="item-text">退出</div>
        </bottomBarItem>
      </bottomBar>
    </div>
    <div class="mask" v-show="isShow" @click="menuClick"></div>
  </div>
</template>

<script>
import bottomBar from "./childComps/bottomBar";
import bottomBarItem from "./childComps/bottomBarItem";
import MenuItem from "./childComps/MenuItem";
import UserMessage from "./childComps/UserMessage";
import Scroll from "@/components/common/Scroll/Scroll";

export default {
  name: "Menu",
  components: {
    bottomBar,
    bottomBarItem,
    MenuItem,
    UserMessage,
    Scroll
  },
  props: {
    isShow: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  methods: {
    menuClick() {
      this.$emit("menuClick");
      this.$refs.scroll.scrollTo(0, 0, 0);
    },
    logout() {
      window.sessionStorage.removeItem("cookie");
      window.sessionStorage.removeItem("avatarUrl");
      window.sessionStorage.removeItem("nickName");
      this.$router.replace("/home");
      window.location.reload();
    }
  },
  data() {
    return {
      MenuItem: [
        {
          MenuText: "创作者中心",
          MenuIcon: "icon-light-bulb"
        },
        {
          MenuText: "听歌识曲",
          MenuIcon: "icon-mic"
        },
        {
          MenuText: "演出",
          MenuIcon: "icon-coin-yen"
        },
        {
          MenuText: "商城",
          MenuIcon: "icon-cart"
        },
        {
          MenuText: "附件的人",
          MenuIcon: "icon-location"
        },
        {
          MenuText: "游戏推荐",
          MenuIcon: "icon-game-controller"
        },
        {
          MenuText: "口袋彩铃",
          MenuIcon: "icon-alarm1"
        },
        {
          MenuText: "我的订单",
          MenuIcon: "icon-file-text2"
        },
        {
          MenuText: "定时停止播放",
          MenuIcon: "icon-alarm"
        },
        {
          MenuText: "扫一扫",
          MenuIcon: "icon-search2"
        },
        {
          MenuText: "音乐闹钟",
          MenuIcon: "icon-alarm"
        },
        {
          MenuText: "音乐云盘",
          MenuIcon: "icon-cloud"
        },
        {
          MenuText: "在线听歌免流量",
          MenuIcon: "icon-radio"
        },
        {
          MenuText: "优惠券",
          MenuIcon: "icon-ticket"
        },
        {
          MenuText: "青少年模式",
          MenuIcon: "icon-shield"
        }
      ]
    };
  },
  mounted() {
    this.$bus.$on("bottomItemClick", operation => {
      if (operation === "logout") {
        this.logout();
      }
    });
  }
};
</script>
<style scoped>
@keyframes menuMove {
  0% {
    transform: translate(-900px, 0);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
}
@keyframes menuBack {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-900px, 0);
  }
}
@keyframes mask {
  0% {
    background-color: rgba(0, 0, 0, 0);
  }
  100% {
    background-color: rgba(0, 0, 0, 0.5);
  }
}
.menu {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 85%;
  background-color: #fff;
  z-index: 99999999;
  transform: translate(-900px);
  animation-name: menuBack;
  animation-duration: 0.8s;
  overflow: hidden;
}
.showMenu {
  transform: translate(0) !important;
  animation-name: menuMove;
  animation-duration: 0.2s;
}
.mask {
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: 15vw;
  animation-name: mask;
  background-color: rgba(0, 0, 0, 0.5);
  animation-duration: 1.2s;
  z-index: 99999999;
}
.scroll {
  /* margin-bottom: 8vh; */
  overflow:hidden;
  height: calc(100vh - 42px);
}
.icon-search2 {
  font-size: 6.2vw;
  margin: -1vh -2vw -1vh;
}
.logout {
  z-index: 99999;
}
/* .isPlay_menuScroll {
  height: calc(100vh - 42px - 8vh);
} */
</style>