export default {
  getUserInfo(state, data) {
    state.avatarUrl = data.avatarUrl;
    state.nickName = data.nickname
    state.loginState = true;
    state.cookie = data.cookie;
    state.userId = data.userId;
    console.log(state);
  },
  setThemeTopYs(state, ThemeTopYs) {
    state.ThemeTopYs = ThemeTopYs;
  },
  changeMusic(state, currentMusic) {
    state.currentMusic = currentMusic;
    // console.log(state.currentMusic);
  },
  changePlay(state) {
    state.currentMusic.isPlay = !state.currentMusic.isPlay;
  },
  changeTipsShow(state) {
    state.tipsShow = !state.tipsShow;
  },
  changeShow(state) {
    state.currentMusic.isShow = !state.currentMusic.isShow;
  }
}
