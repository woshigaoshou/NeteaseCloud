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
    // state.currentMusic = currentMusic;
    state.currentMusic.ar = currentMusic.ar;
    state.currentMusic.name = currentMusic.name;
    state.currentMusic.al = currentMusic.al;
    state.currentMusic.url = currentMusic.url;
    state.currentMusic.isPlay = currentMusic.isPlay;
    state.currentMusic.isShow = currentMusic.isShow;
    state.currentMusic.id = currentMusic.id;
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
  },
  changeDetail(state) {
    state.currentMusic.detailShow = !state.currentMusic.detailShow;
  },
  saveAudioThis(state, that) {
    state.this_audio = that;
  },
  saveDetailThis(state, that) {
    state.this_musicDetail = that;
  },
  changeType(state) {
    state.currentPlaylist.type = (state.currentPlaylist.type + 1) % 3;
  },
  changeId(state, id) {
    state.currentPlaylist.ids.forEach((item, index) => {
      if (item === id) {
        state.currentPlaylist.index = index;
        // console.log(index);
      }
    })
  },
  changeCount(state, count) {
    if (count) {
      state.currentPlaylist.count = 1;
    }
    else state.currentPlaylist.count++;
  },
  changeContinuePlay(state, value) {
    state.currentPlaylist.continuePlay = value;
  },
  changeIds(state) {
    state.currentPlaylist.ids = JSON.parse(sessionStorage.getItem('playlist_ids'));
  },
  changeIndex(state, value) {
    state.currentPlaylist.index += value;
  },
  changeIsPreMusic(state, value) {
    state.currentPlaylist.isPreMusic = value;
  },
  changeIsNextMusic(state, value) {
    state.currentPlaylist.isNextMusic = value;
  },
  clearUrl(state) {
    state.currentMusic.url = '';
  }
}
