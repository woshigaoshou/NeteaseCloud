import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex)

const state = {
  // avatarUrl: 'https://p3.music.126.net/oLs9DLbGqzcvz2kVMMBLdA==/3427177759345558.jpg',   //头像  data.profile.avatarUrl
  // nickName: 'Gzzz_',    //昵称  data.profile.nickname
  avatarUrl: sessionStorage.getItem('avatarUrl') ? sessionStorage.getItem('avatarUrl') : '',
  nickName: sessionStorage.getItem('nickName') ? sessionStorage.getItem('nickName') : '',
  loginState: sessionStorage.getItem('cookie') ? true : false,
  cookie: sessionStorage.getItem('cookie') ? sessionStorage.getItem('cookie') : '',
  userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : '',
  ThemeTopYs: [],
  // id: '',
  currentMusic: {
    url: "",
    al: { name: "", picUrl: "" },
    ar: [{ name: "" }],
    isPlay: false,
    isShow: false,
    name: "",
    id: 0
  },
  tipsShow: false,
  this_audio: {},
  this_musicDetail: null,
  currentPlaylist: {
    ids: sessionStorage.getItem('playlist_ids') ? JSON.parse(sessionStorage.getItem('playlist_ids')) : [],
    type: 0,
    index: 0,
    count: 1,
    continuePlay: false,
    isPreMusic: false,
    isNextMusic: false
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
  }
})
