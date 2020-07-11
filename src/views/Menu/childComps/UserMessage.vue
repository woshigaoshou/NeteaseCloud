<template>
  <div class="userMessage">
    <div class="login" @click="login" v-show="!$store.state.loginState">立即登录</div>
    <div v-show="$store.state.loginState" class="loginState">
      <div class="avatarUrl">
        <img :src="$store.state.avatarUrl" alt />
      </div>
      <span class="nickName">{{ $store.state.nickName }}</span>
      <div class="signIn" @click="signIn">签到</div>
      <div class="userInfoItem" v-for="(item,index) in items" :key="index">
        <div :class="item.icon"></div>
        <div>{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { daily_signin } from "@/network/menu";

export default {
  name: "UserMessage",
  data() {
    return {
      items: [
        {
          icon: "icon-envelope",
          title: "我的消息"
        },
        {
          icon: "icon-users",
          title: "我的好友"
        },
        {
          icon: "icon-home",
          title: "个人主页"
        },
        {
          icon: "icon-t-shirt",
          title: "个性装扮"
        }
      ]
    };
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    signIn() {
      daily_signin().then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style scoped>
.userMessage {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.02);
  display: flex;
  height: 23vh;
  text-align: center;
  align-items: center;
  margin-bottom: 1.4vh;
}
.login {
  width: 28vw !important;
  height: 6vh;
  line-height: 6vh;
  border-radius: 7vw/50%;
  background-color: rgba(207, 68, 58, 0.911);
  color: #fff;
  margin: 0 auto;
}
.avatarUrl {
  position: absolute;
  top: 3vh;
  left: 5vw;
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
  position: absolute;
  top: 5.2vh;
  left: 19vw;
}
.signIn {
  width: 18vw;
  height: 4.2vh;
  position: absolute;
  right: 6vw;
  top: 4.2vh;
  border-radius: 5vw/50%;
  background-color: rgba(238, 60, 48, 0.993);
  text-align: center;
  line-height: 4.2vh;
  color: #fff;
  font-size: 3.1vw;
}
.loginState {
  display: flex;
  width: 100%;
}
.userInfoItem {
  padding-top: 10vh;
  font-size: 3vw;
  width: 15vw;
  flex: 1;
}
.icon-envelope,
.icon-users,
.icon-home,
.icon-t-shirt {
  font-size: 6vw;
  color: rgba(226, 58, 46, 0.993);
  margin-bottom: 0.6vh;
}
</style>