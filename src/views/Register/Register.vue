<template>
  <div class="RegisterPage">
    <div class="returnHistory icon-arrow-left" @click="returnHistory"></div>
    <img src="@/assets/img/logo.png" alt />
    <div class="message">
      <input class="userID" placeholder="邮箱/手机号" v-model="form.userID" />
      <input class="userPsw" placeholder="密码" v-model="form.userPsw" key="userPsw" type="password" />
      <input class="userName" placeholder="用户名" v-model="form.userName" key="userName" />
      <input class="identify" placeholder="验证码" v-model="form.identify" key="identify" />
      <div class="getIdentify" @click="getIdentify" v-if="!isDisabled">{{ content }}</div>
      <div class="getIdentify" v-else-if="isDisabled">{{ content }}</div>
    </div>
    <div class="btn">
      <div class="register" @click="register">注册</div>
    </div>
  </div>
</template>

<script>
import { register, getIdentify, checkPhoneNum } from "@/network/user";
import { identifyMixin, returnHistoryMixin } from "../../common/mixin.js";

export default {
  name: "Login",
  data() {
    return {
      form: {
        userID: "",
        userPsw: "",
        identify: "",
        userName: ""
      },
      exist: -1
    };
  },
  mixins: [identifyMixin, returnHistoryMixin],
  methods: {
    register() {
      checkPhoneNum(this.form.userID)
        .then(res => {
          console.log(res);
          this.exist = res.exist;
          if (this.exist === 1) {
            alert("该手机号码已被注册！");
          }
          return this.exist;
        })
        .then(res => {
          if (res === -1) {
            console.log("1");
            register({
              phone: this.form.userID,
              password: this.form.userPsw,
              captcha: this.form.identify,
              nickname: this.form.userName
            }).then(res => {
              this.$router.replace("/login");
            });
          }
        });
    }
  }
};
</script>
<style scoped>
.RegisterPage {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: rgba(253, 9, 1, 0.822);
}
.message {
  position: absolute;
  width: 60%;
  bottom: 44%;
  left: 50%;
  transform: translate(-50%);
  height: 23.8vh;
  padding-bottom: 1.8vh;
}
.message input,
.message .getIdentify,
.switchName,
.userName {
  height: 6vh;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  margin: 0.9vh 0;
  line-height: 6vh;
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
.switchName,
.userName {
  bottom: -18%;
}
.message .getIdentify,
.switchName {
  width: 20vw;
  left: 69% !important;
  color: rgba(49, 49, 235, 0.842);
  font-size: 10px;
}
.switchName {
  width: 30vw;
  bottom: -20% !important;
  left: 78% !important;
  background-color: rgba(253, 9, 1, 0);
  z-index: 1;
  text-decoration: underline;
}
.userID,
.userPsw,
.identify,
.userName {
  padding-left: 8vw;
}
.userName {
  bottom: 10% !important;
}
.btn {
  position: absolute;
  bottom: 25%;
  left: 50%;
  width: 60%;
  height: 12vh;
  transform: translate(-50%);
}
.register {
  position: absolute;
  background-color: #fff;
  color: rgb(253, 35, 1);
  width: 60%;
  height: 6vh;
  border-radius: 20px/50%;
  text-align: center;
  line-height: 6vh;
  left: 50%;
  transform: translate(-50%);
}
.RegisterPage img {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: 75%;
  width: 22vw;
  height: 22vw;
}
</style>