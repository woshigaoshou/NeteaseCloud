<template>
  <div class="loginPage">
    <div class="returnHistory icon-arrow-left" @click="returnHistory"></div>

    <img src="@/assets/img/logo.png" alt />
    <div class="message" :class="{isPhoneNum_message:isPhoneNum}">
      <input class="userID" placeholder="邮箱/手机号" v-model="form.userID" />
      <input
        class="userPsw"
        placeholder="密码"
        v-model="form.userPsw"
        key="userPsw"
        :class="{isPhoneNum_psw:!isPhoneNum}"
        type="password"
      />
      <input
        class="identify"
        placeholder="验证码"
        v-model="form.identify"
        v-show="isPhoneNum"
        key="identify"
      />
      <div
        class="getIdentify"
        @click="getIdentify"
        v-show="isPhoneNum"
        v-if="!isDisabled"
      >{{ content }}</div>
      <div class="getIdentify" v-show="isPhoneNum" v-else-if="isDisabled">{{ content }}</div>
      <div class="switchName" @click="switchNameClick">{{ switchName }}</div>
    </div>
    <div class="btn">
      <div class="login" @click="login">登录</div>
      <div class="register" @click="register">注册</div>
    </div>
  </div>
</template>

<script>
import { getIdentify, login, checkIdentify } from "@/network/user";
import { identifyMixin, returnHistoryMixin } from "@/common/mixin";

export default {
  name: "Login",
  data() {
    return {
      form: {
        userID: "",
        userPsw: "",
        identify: ""
      },
      isPhoneNum: true,
      switchName: "切换为邮箱登录"
    };
  },
  mixins: [identifyMixin, returnHistoryMixin],
  methods: {
    login() {
      if (this.form.userID === "") {
        alert("请输入手机号码！");
      } else {
        checkIdentify(this.form.userID, this.form.identify)
          .then(
            res => {
              // console.log(res);
              return res;
            },
            rej => {
              alert("验证码错误或已经失效！");
            }
          )
          .then(res => {
            if (res.code === 200) {
              login(this.form.userID, this.form.userPsw).then(
                res => {
                  // console.log(this.form.userID);
                  // console.log(this.form.userPsw);

                  // console.log(res);

                  if (res.code === 502) {
                    alert(res.msg);
                  } else {
                    let data = res.profile;
                    console.log(document.cookie);

                    document.cookie = res.cookie;
                    window.sessionStorage.setItem("avatarUrl", data.avatarUrl);
                    window.sessionStorage.setItem("nickName", data.nickname);
                    window.sessionStorage.setItem("userId", data.userId);
                    // data.cookie = sessionStorage.getItem("cookie");

                    this.$store.commit("getUserInfo", data);
                    this.$router.replace("/home");
                    let timer = setTimeout(() => {
                      window.location.reload();
                    }, 300);
                    clearTimeout(timer);
                  }
                },
                rej => {
                  alert("账号或密码错误！");
                }
              );
            }
          });
      }
    },
    register() {
      this.$router.push("/register");
    },
    switchNameClick() {
      if (this.isPhoneNum) {
        this.switchName = "切换为手机号码登录";
      } else {
        this.switchName = "切换为邮箱登录";
      }
      this.isPhoneNum = !this.isPhoneNum;
      let form = this.form;
      for (let key in form) {
        form[key] = "";
      }
    }
  }
};
</script>
<style scoped>
.loginPage {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: rgba(207, 68, 58, 0.911);
  font-size: 3vw;
}
.message {
  position: absolute;
  width: 100%;
  bottom: 43%;
  left: 50%;
  transform: translate(-50%);
  padding-bottom: 2.1vh;
  height: 15vh;
}
.message input,
.message .getIdentify,
.switchName {
  height: 5.4vh;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  margin: 0.7vh 0;
  line-height: 5.4vh;
  border-radius: 6vw/50%;
  background-color: #fff;
  border: 0;
  outline: none;
  z-index: 9;
}
.userPsw {
  bottom: 40%;
}
.identify,
.getIdentify,
.switchName {
  bottom: 10%;
}
.message .getIdentify,
.switchName {
  width: 20vw;
  left: 61% !important;
  color: rgba(49, 49, 235, 0.842);
  font-size: 2.8vw !important;
  line-height: 5.1vh;
}
.message .getIdentify {
  background: none;
}
.switchName {
  width: 30vw;
  bottom: -17% !important;
  left: 61% !important;
  background-color: rgba(253, 9, 1, 0);
  z-index: 1;
  text-decoration: underline;
}

.userID,
.userPsw,
.identify {
  padding-left: 8vw;
  width: 40%;
}
.btn {
  position: absolute;
  bottom: 25%;
  left: 50%;
  width: 60%;
  height: 60px;
  transform: translate(-50%);
}
.login,
.register {
  position: absolute;
  background-color: #fff;
  color: rgb(253, 35, 1);
  width: 35%;
  height: 5.5vh;
  border-radius: 6vw/50%;
  text-align: center;
  line-height: 5.5vh;
  left: 50%;
  transform: translate(-50%);
}
.login {
  left: 30%;
}
.register {
  left: 70%;
}
.loginPage img {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: 75%;
  width: 22vw;
  height: 22vw;
}
.isPhoneNum_psw {
  bottom: 15%;
}
.isPhoneNum_message {
  height: 22vh;
}
</style>