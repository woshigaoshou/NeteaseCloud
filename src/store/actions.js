import axios from "axios"
import { getSongUrl } from "@/network/home";
import { getSongDetail } from "@/network/playlistDetail";


export default {
  async changeMusic(context, data) {
    // console.log(id);
    let currentSong = {};
    // console.log(data.that);
    await axios.all([getSongDetail(data.id), getSongUrl(data.id)]).then(
      axios.spread((res1, res2) => {
        // console.log(res1);
        // console.log(res2);
        if (res2.data[0].code === 200) {
          context.commit("changeContinuePlay", true);
          context.commit("changeIsPreMusic", false);
          currentSong.ar = res1.songs[0].ar;
          currentSong.name = res1.songs[0].name;
          currentSong.al = res1.songs[0].al;
          currentSong.url = res2.data[0].url;
          currentSong.isPlay = true;
          currentSong.isShow = true;
          currentSong.id = data.id;
          context.commit("changeMusic", currentSong);
          context.commit("changeId", currentSong.id);
        }
        else if (res2.data[0].code === -110) {
          console.log(data.that);
          if (context.state.currentPlaylist.isPreMusic) {
            data.that.preMusic()
          }
          else if (context.state.currentPlaylist.isNextMusic) {
            data.that.nextMusic()
          }
          else {
            this.$store.commit("changeIndex", +1);
            data.that.endPlay();
          }
        }
      })
    );
    // console.log(returnValue);

    // return returnValue;
  }

}