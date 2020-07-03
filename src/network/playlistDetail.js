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
  // console.log(typeof ids === Object);
  // console.log(1);

  if (!Array.isArray(ids)) {
    return request({
      url: "/song/detail",
      params: {
        ids
      }
    })
  }
  else {
    return request({
      url: "/song/detail",
      params: {
        ids: ids.join(",")
      }
    })
  }
}