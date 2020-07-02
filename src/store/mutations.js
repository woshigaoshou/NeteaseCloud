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
  }
}
