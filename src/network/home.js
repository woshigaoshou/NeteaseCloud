import { request } from "./request"

export function getBanner(type) {
  return request({
    url: "banner",
    data: {
      type
    },
    method: 'post'
  })
}

export function getSongUrl(ids) {
  if (!Array.isArray(ids)) {
    return request({
      url: "/song/url",
      params: {
        id: ids
      }
    })
  }
  else {
    return request({
      url: "/song/url",
      params: {
        id: ids.join(",")
      }
    })
  }
}

export function checkMusic(id) {
  return request({
    url: "/check/music",
    params: {
      id
    }
  })
}
