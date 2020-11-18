import axios from "axios"
import { getSongUrl } from "@/network/home";
import { getSongDetail } from "@/network/playlistDetail";


export default {
  async changeMusic(context, data) {
    console.log(context);
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
          context.commit("changeIsNextMusic", false);
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
          console.log((data));

          if (context.state.currentPlaylist.isPreMusic) {
            data.that.preMusic()
          }
          else if (context.state.currentPlaylist.isNextMusic) {
            data.that.nextMusic()
          }
          else {
            context.commit("changeIndex", +1);
            console.log(context.state.currentPlaylist.index);


            data.that.endPlay();
          }
        }
      })
    );
    // console.log(returnValue);

    // return returnValue;
  }

}