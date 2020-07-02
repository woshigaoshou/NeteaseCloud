import { request } from "./request"

export function getPlaylistDetail(id, cookie) {
  return request({
    url: "/playlist/detail",
    params: {
      id,
      cookie
    }
  })
}

export function getSongDetail(ids) {
  // let id = JSON.parse(sessionStorage.getItem('ids'));
  // console.log(ids[0]);

  // console.log(id[0]);

  // console.log(ids.join(","));

  return request({
    url: "/song/detail",
    params: {
      ids: ids.join(",")
    }
  })
}